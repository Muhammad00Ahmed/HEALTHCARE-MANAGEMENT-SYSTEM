const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');
const { authenticate, authorize } = require('../middleware/auth');
const { validatePatient } = require('../middleware/validation');

const router = express.Router();

// Get all patients with pagination and search
router.get('/', authenticate, authorize(['doctor', 'nurse', 'admin']), async (req, res) => {
  try {
    const { page = 1, limit = 20, search, status } = req.query;
    
    const query = {};
    
    // Search by name, email, or phone
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    const patients = await Patient.find(query)
      .select('-medicalHistory.notes') // Exclude sensitive notes from list
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();
    
    const count = await Patient.countDocuments(query);
    
    res.json({
      success: true,
      data: patients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patients'
    });
  }
});

// Get single patient by ID
router.get('/:id', authenticate, authorize(['doctor', 'nurse', 'admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('assignedDoctor', 'firstName lastName specialization')
      .populate('appointments')
      .exec();
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    // Log access for HIPAA compliance
    await logPatientAccess(req.user.id, patient._id, 'view');
    
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patient'
    });
  }
});

// Create new patient
router.post('/', authenticate, authorize(['doctor', 'nurse', 'admin']), validatePatient, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      emergencyContact,
      insurance,
      bloodType,
      allergies,
      chronicConditions
    } = req.body;
    
    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient with this email already exists'
      });
    }
    
    // Generate unique patient ID
    const patientId = await generatePatientId();
    
    const patient = await Patient.create({
      patientId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      emergencyContact,
      insurance,
      medicalHistory: {
        bloodType,
        allergies: allergies || [],
        chronicConditions: chronicConditions || []
      },
      assignedDoctor: req.user.role === 'doctor' ? req.user.id : null,
      createdBy: req.user.id
    });
    
    // Log patient creation
    await logPatientAccess(req.user.id, patient._id, 'create');
    
    res.status(201).json({
      success: true,
      data: patient,
      message: 'Patient created successfully'
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating patient'
    });
  }
});

// Update patient
router.put('/:id', authenticate, authorize(['doctor', 'nurse', 'admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    // Update allowed fields
    const allowedUpdates = [
      'firstName', 'lastName', 'email', 'phone', 'address',
      'emergencyContact', 'insurance', 'status'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        patient[field] = req.body[field];
      }
    });
    
    patient.updatedBy = req.user.id;
    await patient.save();
    
    // Log patient update
    await logPatientAccess(req.user.id, patient._id, 'update');
    
    res.json({
      success: true,
      data: patient,
      message: 'Patient updated successfully'
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating patient'
    });
  }
});

// Get patient medical records
router.get('/:id/records', authenticate, authorize(['doctor', 'nurse', 'admin']), async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    
    const query = { patient: req.params.id };
    
    if (type) {
      query.type = type;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const records = await MedicalRecord.find(query)
      .populate('createdBy', 'firstName lastName')
      .sort({ date: -1 })
      .exec();
    
    // Log access
    await logPatientAccess(req.user.id, req.params.id, 'view_records');
    
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medical records'
    });
  }
});

// Add medical record
router.post('/:id/records', authenticate, authorize(['doctor']), async (req, res) => {
  try {
    const { type, diagnosis, treatment, medications, notes, attachments } = req.body;
    
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    const record = await MedicalRecord.create({
      patient: patient._id,
      type,
      date: new Date(),
      diagnosis,
      treatment,
      medications: medications || [],
      notes,
      attachments: attachments || [],
      createdBy: req.user.id
    });
    
    // Update patient's medical history
    if (diagnosis) {
      patient.medicalHistory.diagnoses.push({
        condition: diagnosis,
        diagnosedDate: new Date(),
        diagnosedBy: req.user.id
      });
    }
    
    await patient.save();
    
    // Log record creation
    await logPatientAccess(req.user.id, patient._id, 'add_record');
    
    res.status(201).json({
      success: true,
      data: record,
      message: 'Medical record added successfully'
    });
  } catch (error) {
    console.error('Error adding medical record:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding medical record'
    });
  }
});

// Delete patient (soft delete)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    patient.status = 'inactive';
    patient.deletedAt = new Date();
    patient.deletedBy = req.user.id;
    await patient.save();
    
    // Log deletion
    await logPatientAccess(req.user.id, patient._id, 'delete');
    
    res.json({
      success: true,
      message: 'Patient deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting patient'
    });
  }
});

// Helper function to generate unique patient ID
async function generatePatientId() {
  const prefix = 'PT';
  const year = new Date().getFullYear().toString().slice(-2);
  
  const lastPatient = await Patient.findOne()
    .sort({ createdAt: -1 })
    .select('patientId')
    .exec();
  
  let sequence = 1;
  if (lastPatient && lastPatient.patientId) {
    const lastSequence = parseInt(lastPatient.patientId.slice(-6));
    sequence = lastSequence + 1;
  }
  
  return `${prefix}${year}${sequence.toString().padStart(6, '0')}`;
}

// Helper function to log patient access (HIPAA compliance)
async function logPatientAccess(userId, patientId, action) {
  const AuditLog = require('../models/AuditLog');
  
  await AuditLog.create({
    user: userId,
    patient: patientId,
    action,
    timestamp: new Date(),
    ipAddress: req.ip,
    userAgent: req.get('user-agent')
  });
}

module.exports = router;