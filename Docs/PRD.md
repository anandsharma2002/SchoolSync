# School Sync - Product Requirements Document (PRD)

## 1. Executive Summary

**Product Name:** School Sync  
**Version:** 1.0  
**Document Version:** 1.0  
**Date:** September 2025  
**Author:** System Analysis  

School Sync is a comprehensive School Management System (SMS) designed to streamline educational institution operations through digital transformation. The system provides a centralized platform for managing schools, students, teachers, classes, attendance, and announcements with role-based access control and multi-tenant architecture.

## 2. Product Overview

### 2.1 Vision Statement
To revolutionize school management by providing an integrated, user-friendly platform that enhances educational administration efficiency and improves communication between all stakeholders.

### 2.2 Mission Statement
Empower educational institutions with modern technology solutions that simplify administrative tasks, improve student tracking, and foster better parent-teacher communication.

### 2.3 Product Goals
- **Primary Goal:** Digitize and streamline school management operations
- **Secondary Goals:** 
  - Improve attendance tracking accuracy
  - Enhance communication through announcements
  - Provide real-time dashboard analytics
  - Ensure data security and role-based access

## 3. Target Audience

### 3.1 Primary Users
- **School Administrators:** Manage school information, users, and system settings
- **Principals:** Oversee school operations and view comprehensive reports
- **School Incharges:** Handle day-to-day administrative tasks
- **Teachers:** Manage classes, track attendance, and create announcements
- **Students:** View their information and attendance records
- **Parents:** Monitor their children's academic progress and attendance

### 3.2 Secondary Users
- **System Administrators:** Manage the overall platform and multiple schools
- **IT Support Staff:** Maintain system infrastructure and provide technical support

## 4. Core Features and Functionality

### 4.1 Authentication & Authorization System
**Feature Description:** Secure user authentication with role-based access control

**Key Components:**
- JWT-based authentication with cookie support
- Role-based authorization (Admin, Principal, SchoolIncharge, Teacher, Student)
- Multi-tenant architecture with school-specific data isolation
- Secure password management through ASP.NET Identity

**API Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user information

**Business Rules:**
- Users must be associated with a school
- Role assignment during registration
- Token expiration after 3 hours
- Secure cookie-based session management

### 4.2 School Management
**Feature Description:** Comprehensive school information management

**Key Components:**
- School registration and profile management
- School search and discovery
- Subscription management
- Soft delete functionality

**API Endpoints:**
- `GET /api/school` - Get all schools
- `GET /api/school/search?schoolName={name}` - Search schools by name
- `GET /api/school/getbyId/{schoolId}` - Get school by ID
- `POST /api/school/CreateSchoolAsync` - Create new school
- `PUT /api/school/UpdateSchool/{schoolId}` - Update school information
- `DELETE /api/school/{schoolId}` - Delete school

**Data Model:**
```csharp
School {
    Id: Guid
    RegistrationNumber: string
    Name: string
    Email: string
    Phone: string
    Address: string
    City: string
    State: string
    PinCode: int
    Subscription: int
    SubscriptionDate: DateOnly?
    IsSoftDeleted: bool
    Users: ICollection<ApplicationUser>
}
```

**Business Rules:**
- Unique school identification by name, email, and pin code
- Subscription tracking for premium features
- Soft delete to maintain data integrity
- One-to-many relationship with users

### 4.3 Student Management
**Feature Description:** Complete student lifecycle management

**Key Components:**
- Student registration and profile management
- Class assignment and management
- Parent information tracking
- Student search and filtering

**API Endpoints:**
- `GET /api/student` - Get all students (school-specific)
- `GET /api/student/{id}` - Get student by ID
- `GET /api/student/GetStudentByClassIdAsync/{classId}` - Get students by class
- `POST /api/student` - Create new student
- `PUT /api/student/{id}` - Update student information
- `DELETE /api/student/{id}` - Delete student

**Data Model:**
```csharp
Student {
    Id: Guid
    SRNumber: string
    RollNumber: int
    Email: string
    FirstName: string
    LastName: string
    DOB: DateOnly
    Gender: Gender (enum)
    ClassId: Guid
    Class: SchoolClass
    UserId: Guid?
    User: ApplicationUser
}
```

**Business Rules:**
- Students must be assigned to a class
- Optional user account linking
- Gender tracking for demographic purposes
- School-specific data isolation

### 4.4 Teacher Management
**Feature Description:** Teacher information and assignment management

**Key Components:**
- Teacher registration and profile management
- Subject assignment through TeacherSubject relationship
- Class teacher assignment
- Teacher search and filtering

**API Endpoints:**
- `GET /api/teacher` - Get all teachers (role-restricted)
- `GET /api/teacher/{id}` - Get teacher by ID
- `POST /api/teacher` - Create new teacher
- `PUT /api/teacher/{id}` - Update teacher information
- `DELETE /api/teacher/{id}` - Delete teacher

**Data Model:**
```csharp
Teacher {
    Id: Guid
    Name: string
    Email: string
    JoiningDate: DateOnly
    Phone: string
    Gender: Gender (enum)
    Address: string
    SchoolId: Guid
    School: School
    UserId: Guid?
    User: ApplicationUser
}
```

**Business Rules:**
- Teachers must be associated with a school
- Optional user account linking
- Role-based access control for teacher management
- Subject assignment through separate entity

### 4.5 Class Management
**Feature Description:** School class organization and management

**Key Components:**
- Class creation and management
- Section-based organization
- Class teacher assignment
- Student-class relationships

**API Endpoints:**
- `GET /api/class` - Get all classes (role-restricted)
- `GET /api/class/{id}` - Get class by ID
- `POST /api/class` - Create new class
- `PUT /api/class/{id}` - Update class information
- `DELETE /api/class/{id}` - Delete class

**Data Model:**
```csharp
SchoolClass {
    Id: Guid
    Name: string
    Section: string
    ClassTeacherId: Guid?
    ClassTeacher: Teacher
    SchoolId: Guid
    School: School
}
```

**Business Rules:**
- Classes must be associated with a school
- Optional class teacher assignment
- Role-based access control (Admin, Principal, SchoolIncharge)
- Section-based organization for better management

### 4.6 Attendance Management
**Feature Description:** Student and teacher attendance tracking

**Key Components:**
- Daily attendance recording
- Multiple attendance statuses (Present, Absent, Late, Leave)
- Attendance history and reporting
- User-based attendance tracking

**API Endpoints:**
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/{id}` - Get attendance by ID
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/{id}` - Update attendance record
- `DELETE /api/attendance/{id}` - Delete attendance record

**Data Model:**
```csharp
Attendance {
    Id: Guid
    Date: DateOnly
    Status: AttendanceStatus (enum)
    UserId: Guid?
    User: ApplicationUser
}
```

**Business Rules:**
- Attendance linked to user accounts
- Multiple status options for flexibility
- Date-based tracking
- Separate teacher attendance system

### 4.7 Announcement System
**Feature Description:** School-wide communication and announcements

**Key Components:**
- Announcement creation and management
- School-specific announcements
- Date-based announcement tracking
- Author tracking

**API Endpoints:**
- `GET /api/announcement` - Get all announcements (school-specific)
- `GET /api/announcement/GetAnnouncementByIdAsync/{id}` - Get announcement by ID
- `POST /api/announcement/CreateAnnouncement` - Create new announcement
- `PUT /api/announcement/{id}` - Update announcement
- `DELETE /api/announcement/{id}` - Delete announcement

**Data Model:**
```csharp
Announcement {
    Id: Guid
    Title: string
    Detail: string
    Date: DateOnly
    AnnouncedBy: string
    SchoolId: Guid
    School: School
}
```

**Business Rules:**
- School-specific announcement isolation
- Author tracking for accountability
- Date-based announcement management
- Title and detail content management

### 4.8 Dashboard and Analytics
**Feature Description:** Comprehensive dashboard with key metrics

**Key Components:**
- Home dashboard with aggregated statistics
- School-specific dashboard
- Real-time data presentation
- Combined metrics display

**API Endpoints:**
- `GET /api/combine` - Get home combined details
- `GET /api/combine/{schoolId}` - Get school-specific dashboard

**Data Model:**
```csharp
HomeCombinedDetails {
    TotalSchools: int
    TotalStudents: int
    TotalTeachers: int
    TotalClasses: int
    PresentStudents: int
    PresentTeachers: int
}
```

**Business Rules:**
- Real-time data aggregation
- School-specific metrics
- Present vs. total counts
- Comprehensive overview statistics

## 5. Technical Architecture

### 5.1 Technology Stack
- **Backend Framework:** ASP.NET Core 8.0
- **Database:** PostgreSQL
- **ORM:** Entity Framework Core
- **Authentication:** ASP.NET Identity with JWT
- **API Documentation:** Swagger/OpenAPI
- **Architecture Pattern:** Clean Architecture (Repository + Service Pattern)
- **Mapping:** AutoMapper
- **CORS:** Cross-Origin Resource Sharing enabled

### 5.2 System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React/Vue)   │◄──►│   (ASP.NET)     │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Authentication│
                       │   (JWT + Identity)│
                       └─────────────────┘
```

### 5.3 Project Structure
```
Backend/
├── SMSPrototype1/          # Main API Project
│   ├── Controllers/        # API Controllers
│   ├── Program.cs         # Application startup
│   └── appsettings.json   # Configuration
├── SMSDataContext/        # Data Access Layer
│   ├── Data/             # DbContext and Factory
│   ├── Migrations/       # Database migrations
│   └── Helpers/          # Data seeding
├── SMSDataModel/         # Domain Models
│   ├── Models/           # Entity models
│   ├── RequestDtos/      # Request DTOs
│   ├── ResponseDtos/     # Response DTOs
│   └── AutoMapper/       # Mapping profiles
├── SMSRepository/        # Repository Layer
│   ├── Repository/       # Repository implementations
│   └── RepositoryInterfaces/ # Repository contracts
└── SMSServices/          # Business Logic Layer
    ├── Services/         # Service implementations
    └── ServicesInterfaces/ # Service contracts
```

### 5.4 Database Design
**Primary Entities:**
- Schools (Multi-tenant root)
- ApplicationUsers (Identity + School association)
- Students (School + Class association)
- Teachers (School association)
- SchoolClasses (School + Teacher association)
- Attendance (User association)
- Announcements (School association)
- Parents (Student association)
- Subjects (Reference data)
- TeacherSubjects (Many-to-many relationship)

**Key Relationships:**
- School → Users (One-to-Many)
- School → Students (One-to-Many through Classes)
- School → Teachers (One-to-Many)
- School → Classes (One-to-Many)
- Class → Students (One-to-Many)
- Teacher → Class (One-to-Many as ClassTeacher)
- User → Attendance (One-to-Many)

## 6. Security Requirements

### 6.1 Authentication Security
- JWT token-based authentication
- Secure cookie storage for frontend integration
- Token expiration (3 hours)
- Role-based access control
- Password hashing through ASP.NET Identity

### 6.2 Authorization Security
- Role-based permissions:
  - **Admin:** Full system access
  - **Principal:** School-wide access
  - **SchoolIncharge:** Administrative access
  - **Teacher:** Class and student access
  - **Student:** Personal data access
- School-specific data isolation
- API endpoint protection

### 6.3 Data Security
- Multi-tenant data isolation
- Soft delete for data integrity
- Input validation and sanitization
- SQL injection prevention through EF Core
- CORS configuration for frontend security

## 7. Performance Requirements

### 7.1 Response Time
- API response time: < 500ms for standard operations
- Database queries: < 200ms for single entity operations
- Dashboard loading: < 1 second for aggregated data

### 7.2 Scalability
- Support for multiple schools (multi-tenant)
- Horizontal scaling capability
- Database connection pooling
- Efficient query optimization through EF Core

### 7.3 Availability
- 99.9% uptime target
- Graceful error handling
- Comprehensive logging
- Health check endpoints

## 8. Integration Requirements

### 8.1 Frontend Integration
- RESTful API design
- CORS enabled for cross-origin requests
- JSON data format
- Swagger documentation for API exploration

### 8.2 Database Integration
- PostgreSQL database
- Entity Framework Core migrations
- Connection string configuration
- Database seeding for initial data

### 8.3 External Integrations
- Email service integration (future)
- SMS service integration (future)
- Payment gateway integration (future)
- Third-party authentication (future)

## 9. Data Management

### 9.1 Data Models
The system manages the following core entities:
- **Schools:** Institution information and settings
- **Users:** Authentication and authorization
- **Students:** Student profiles and academic information
- **Teachers:** Teacher profiles and assignments
- **Classes:** Class organization and structure
- **Attendance:** Daily attendance tracking
- **Announcements:** Communication and notifications
- **Parents:** Parent/guardian information
- **Subjects:** Academic subject management

### 9.2 Data Validation
- Model validation through Data Annotations
- Business rule validation in service layer
- Database constraint validation
- Input sanitization and validation

### 9.3 Data Migration
- Entity Framework Core migrations
- Database schema versioning
- Data seeding for initial setup
- Migration rollback capability

## 10. User Experience Requirements

### 10.1 API Design
- RESTful API design principles
- Consistent response format using ApiResult<T>
- Comprehensive error handling
- Swagger documentation for easy integration

### 10.2 Response Format
```json
{
  "content": "Response data",
  "isSuccess": true,
  "statusCode": 200,
  "errorMessage": null
}
```

### 10.3 Error Handling
- Standardized error responses
- HTTP status code compliance
- Detailed error messages for debugging
- Graceful degradation for failures

## 11. Deployment and Infrastructure

### 11.1 Development Environment
- Local development with PostgreSQL
- Hot reload for development
- Swagger UI for API testing
- CORS configuration for frontend development

### 11.2 Production Considerations
- Environment-specific configuration
- Database connection string management
- JWT secret key management
- CORS policy configuration
- HTTPS enforcement

### 11.3 Configuration Management
- appsettings.json for configuration
- Environment variable support
- Connection string management
- JWT configuration settings

## 12. Future Enhancements

### 12.1 Phase 2 Features
- Parent portal integration
- Mobile application support
- Advanced reporting and analytics
- Email notification system
- SMS integration for alerts

### 12.2 Phase 3 Features
- Grade management system
- Exam scheduling and management
- Fee management system
- Library management
- Transportation management

### 12.3 Long-term Vision
- AI-powered attendance prediction
- Advanced analytics and insights
- Integration with learning management systems
- Multi-language support
- Advanced security features

## 13. Success Metrics

### 13.1 Technical Metrics
- API response time < 500ms
- System uptime > 99.9%
- Zero critical security vulnerabilities
- Database query performance optimization

### 13.2 Business Metrics
- User adoption rate
- Feature utilization
- System reliability
- User satisfaction scores

### 13.3 Operational Metrics
- Deployment frequency
- Mean time to recovery
- Error rate monitoring
- Performance monitoring

## 14. Risk Assessment

### 14.1 Technical Risks
- Database performance with large datasets
- JWT token security
- Multi-tenant data isolation
- API rate limiting

### 14.2 Business Risks
- User adoption challenges
- Data migration complexity
- Integration with existing systems
- Scalability concerns

### 14.3 Mitigation Strategies
- Performance testing and optimization
- Security audits and penetration testing
- Comprehensive backup and recovery procedures
- Gradual rollout and user training

## 15. Conclusion

School Sync represents a comprehensive solution for modern school management needs. The system's architecture provides scalability, security, and maintainability while addressing the core requirements of educational institutions. The multi-tenant design ensures data isolation while the role-based access control provides appropriate security measures.

The system is designed to grow with the institution's needs, providing a solid foundation for future enhancements and integrations. The clean architecture pattern ensures maintainability and testability, while the modern technology stack provides performance and reliability.

This PRD serves as a comprehensive guide for development, testing, and deployment of the School Sync system, ensuring all stakeholders have a clear understanding of the system's capabilities, requirements, and future direction.

---

**Document Control:**
- **Version:** 1.0
- **Last Updated:** September 2025
- **Next Review:** December 2025
- **Approved By:** System Analysis Team
