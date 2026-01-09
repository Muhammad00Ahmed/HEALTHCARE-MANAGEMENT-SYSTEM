# Healthcare Management System

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Advanced healthcare management system with patient records, telemedicine, and medical billing**

[Documentation](#) · [Quick Start](#) · [HIPAA Compliance](#) · [Contributing](#)

</div>

---

## 🎯 Overview

A comprehensive, HIPAA-compliant healthcare management system designed for hospitals, clinics, and healthcare providers. Features include electronic health records (EHR), appointment scheduling, telemedicine consultations, prescription management, medical billing, insurance claims, and patient portals. Built with security, privacy, and scalability as top priorities.

### Key Features

- 📋 **Electronic Health Records (EHR)**: Complete patient medical history
- 📅 **Appointment Scheduling**: Smart scheduling with reminders
- 💊 **Prescription Management**: E-prescribing and medication tracking
- 🎥 **Telemedicine**: Video consultations with patients
- 💰 **Medical Billing**: Insurance claims and payment processing
- 🔐 **HIPAA Compliance**: Secure, encrypted data handling
- 📊 **Analytics Dashboard**: Healthcare insights and reporting
- 🏥 **Multi-Facility Support**: Manage multiple locations
- 📱 **Patient Portal**: Mobile app for patients
- 🔔 **Notifications**: SMS, email, and push notifications

---

## ✨ Features

### Patient Management

**Patient Records**
- Demographics and contact info
- Medical history
- Allergies and conditions
- Medications
- Immunization records
- Lab results
- Imaging reports
- Family history
- Social history

**Patient Portal**
- View medical records
- Book appointments
- Request prescriptions
- Message providers
- Pay bills
- Download reports
- Health tracking
- Medication reminders

### Appointment Management

**Scheduling**
- Calendar view
- Multi-provider scheduling
- Recurring appointments
- Waitlist management
- Online booking
- Appointment types
- Time slot management
- Resource allocation

**Reminders & Notifications**
- SMS reminders
- Email reminders
- Push notifications
- Appointment confirmations
- Cancellation notifications
- Follow-up reminders

### Electronic Health Records (EHR)

**Clinical Documentation**
- SOAP notes
- Progress notes
- Consultation notes
- Discharge summaries
- Operative reports
- Templates and forms
- Voice dictation
- Digital signatures

**Medical History**
- Past medical history
- Surgical history
- Medication history
- Allergy tracking
- Problem list
- Vital signs tracking
- Growth charts
- Immunization records

**Lab & Imaging**
- Lab orders
- Lab results
- Imaging orders
- Radiology reports
- DICOM viewer
- Result notifications
- Trend analysis

### Telemedicine

**Video Consultations**
- HD video calls
- Screen sharing
- Chat messaging
- File sharing
- Recording (with consent)
- Waiting room
- Multi-party calls

**Virtual Care**
- Remote monitoring
- E-visits
- Follow-up consultations
- Mental health sessions
- Specialist consultations
- Second opinions

### Prescription Management

**E-Prescribing**
- Electronic prescriptions
- Drug database integration
- Dosage calculator
- Drug interaction checking
- Allergy alerts
- Pharmacy integration
- Refill requests
- Prescription history

**Medication Management**
- Medication list
- Adherence tracking
- Side effect monitoring
- Medication reconciliation
- Controlled substances
- Prior authorization

### Medical Billing

**Billing & Invoicing**
- Patient billing
- Insurance billing
- Payment processing
- Payment plans
- Co-pay collection
- Balance tracking
- Statements
- Receipt generation

**Insurance Claims**
- Claims submission
- Claims tracking
- Eligibility verification
- Prior authorization
- Claim denials
- Appeals management
- ERA/EOB processing

**Revenue Cycle**
- Charge capture
- Coding (ICD-10, CPT)
- Claims scrubbing
- Payment posting
- Accounts receivable
- Collections
- Financial reports

### Inventory Management

**Medical Supplies**
- Stock tracking
- Reorder alerts
- Supplier management
- Purchase orders
- Expiry tracking
- Usage reports

**Pharmacy Inventory**
- Medication stock
- Batch tracking
- Expiry management
- Controlled substances
- Dispensing records

### Reporting & Analytics

**Clinical Reports**
- Patient demographics
- Disease prevalence
- Treatment outcomes
- Quality metrics
- Clinical indicators
- Population health

**Financial Reports**
- Revenue reports
- Collection reports
- Aging reports
- Payer mix
- Procedure analysis
- Provider productivity

**Operational Reports**
- Appointment statistics
- No-show rates
- Wait times
- Resource utilization
- Staff productivity

---

## 🛠️ Tech Stack

### Backend

- **Node.js 20** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **MongoDB** - Document storage
- **Redis** - Caching
- **Bull** - Job queue
- **Socket.io** - Real-time

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material-UI** - Components
- **WebRTC** - Video calls
- **Chart.js** - Analytics

### Security & Compliance

- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **AES-256** - Data encryption
- **SSL/TLS** - Transport security
- **Audit logging** - HIPAA compliance

### Infrastructure

- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **AWS** - Cloud hosting
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL certificates

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Applications                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile App  │  │   Tablet     │      │
│  │  (Providers) │  │  (Patients)  │  │   (Staff)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Express)                     │
│                  Authentication & Authorization              │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Patient    │    │ Appointment  │    │   Billing    │
│   Service    │    │   Service    │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │   MongoDB    │  │    Redis     │      │
│  │    (EHR)     │  │  (Documents) │  │   (Cache)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- PostgreSQL >= 14
- MongoDB >= 6.0.0
- Redis >= 7.0.0
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Muhammad00Ahmed/HEALTHCARE-MANAGEMENT-SYSTEM.git
cd HEALTHCARE-MANAGEMENT-SYSTEM
```

2. **Install dependencies**
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. **Environment Configuration**

Backend `.env`:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare
MONGODB_URI=mongodb://localhost:27017/healthcare
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Encryption
ENCRYPTION_KEY=your_encryption_key

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Email)
SENDGRID_API_KEY=your_sendgrid_key

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# AWS S3 (File Storage)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your-bucket
```

4. **Database Setup**
```bash
cd backend
npm run migrate
npm run seed
```

5. **Start services**

Using Docker:
```bash
docker-compose up -d
```

Or manually:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

---

## 📚 API Documentation

### Authentication

```http
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
GET    /api/auth/me              # Get current user
```

### Patients

```http
GET    /api/patients             # Get all patients
POST   /api/patients             # Create patient
GET    /api/patients/:id         # Get patient
PUT    /api/patients/:id         # Update patient
DELETE /api/patients/:id         # Delete patient
GET    /api/patients/:id/records # Get medical records
```

### Appointments

```http
GET    /api/appointments         # Get appointments
POST   /api/appointments         # Create appointment
GET    /api/appointments/:id     # Get appointment
PUT    /api/appointments/:id     # Update appointment
DELETE /api/appointments/:id     # Cancel appointment
```

### Prescriptions

```http
GET    /api/prescriptions        # Get prescriptions
POST   /api/prescriptions        # Create prescription
GET    /api/prescriptions/:id    # Get prescription
PUT    /api/prescriptions/:id    # Update prescription
```

---

## 🔒 HIPAA Compliance

- **Data Encryption**: AES-256 encryption at rest, TLS 1.3 in transit
- **Access Control**: Role-based access control (RBAC)
- **Audit Logging**: Complete audit trail of all data access
- **Data Backup**: Automated daily backups with encryption
- **Disaster Recovery**: Multi-region backup and failover
- **Business Associate Agreement**: BAA templates included
- **Security Risk Assessment**: Regular security audits
- **Employee Training**: HIPAA training materials

---

## 📊 Performance

- Supports 100,000+ patients
- Handles 10,000+ appointments/day
- < 200ms API response time
- 99.9% uptime SLA
- Real-time updates
- Scalable architecture

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

## 👨‍💻 Author

**Muhammad Ahmed**
- GitHub: [@Muhammad00Ahmed](https://github.com/Muhammad00Ahmed)
- Email: mahmedrangila@gmail.com

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Muhammad Ahmed

</div>