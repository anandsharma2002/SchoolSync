# Backend Modification Order (School Sync)

This is a pragmatic, ordered plan to implement your requested improvements safely and consistently across the backend (.NET 8, ASP.NET Web API + EF Core + PostgreSQL). Each step contains concrete actions, exact code areas to change, and migration sequencing to avoid runtime errors and foreign key issues.

Referenced projects/folders:
- API Host: `Backend/SMSPrototype1`
- EF Core & Identity: `Backend/SMSDataContext`
- Domain/DTOs/Mapping: `Backend/SMSDataModel`
- Repositories: `Backend/SMSRepository`
- Services: `Backend/SMSServices`

Conventions used below:
- Use Scoped lifetime for services/repositories depending on `DataContext`.
- Pass `CancellationToken` across controllers → services → repositories.
- Use DTOs for API responses; avoid exposing EF entities.
- Prefer `IEntityTypeConfiguration<T>` over inline model configuration.

## Phase 0 — Pre-flight and Safety Nets
1) Create a working branch: `git checkout -b refactor/backend-architecture`
2) Ensure EF tools are available: `dotnet tool update --global dotnet-ef`
3) Verify DB connectivity using `appsettings.json` in `SMSPrototype1`.
4) Enable verbose logging temporarily to catch regressions (add Serilog in Phase 5).
5) Run solution to have a green baseline (Swagger loads; basic endpoints functional).

## Phase 1 — Authorization and Policies (Controllers)
Goal: Enforce `[Authorize]` on all controllers and standardize role/policy checks.

Actions:
- Add `[Authorize]` to all controllers in `Backend/SMSPrototype1/Controllers/*.cs`. Where anonymous access is required (e.g., `AuthController` register/login), use `[AllowAnonymous]` per-action.
- Introduce role-based access on sensitive endpoints. Example: `[Authorize(Roles = "Admin,Principal")]` for write operations; `[Authorize(Roles = "Admin,Principal,Teacher")]` for read operations where appropriate.
- In `Program.cs`:
  - Add named authorization policies for future-proofing (e.g., `RequireSchoolContext`, `RequireAdminRole`).
  - Register policies with `builder.Services.AddAuthorization(options => { ... })`.
  - Keep Swagger security definition as-is; ensure it references Bearer scheme.

Deliverables:
- Controllers updated with `[Authorize]` and role arrays.
- `Program.cs` updated with policies (without breaking current role attributes).

## Phase 2 — DI Lifetimes, Middleware, and Consistency
Goal: Stabilize runtime behavior and error handling.

Actions:
- DI lifetimes: Change all service and repository registrations to Scoped in `Program.cs`.
  - Replace `AddTransient<...>` with `AddScoped<...>` for all repositories/services that depend on `DataContext`.
- Global exception handling middleware:
  - Add a custom middleware or `app.UseExceptionHandler()` returning RFC 7807 ProblemDetails.
  - Remove per-action try/catch blocks; controllers should return `ActionResult<T>`.
- Model validation:
  - Add FluentValidation; register validators for each request DTO.
  - Enable automatic model validation and return ProblemDetails when invalid.

Deliverables:
- Consistent Scoped lifetimes.
- Centralized error handling and consistent problem responses.
- FluentValidation integrated.

## Phase 3 — Data Model Hardening to Avoid FK Conflicts
Goal: Prevent accidental deletes causing FK conflicts; make aggregates independently manageable.

Actions:
- Adopt soft-delete and restrict deletes:
  - Add `IsActive` or `IsDeleted` boolean on high-link entities: `Teacher`, `Student`, `SchoolClass`, `Subject`.
  - Update repositories/services to deactivate instead of hard-delete when links exist.
- Configure referential actions explicitly via EF:
  - Convert inline configuration in `DataContext` to per-entity configurations (create folder `Backend/SMSDataContext/Data/Configurations`).
  - For critical relationships, prefer `OnDelete(DeleteBehavior.Restrict)` to avoid cascade deletes where business rules require manual cleanup.
  - Keep unique indices already defined; add missing ones for new keys.
- Business rules before delete:
  - For "teacher is class teacher" scenario, add guard in service: check no active assignments (`TeacherSubject`, `SchoolClass.ClassTeacherId`, etc.). If exists, return domain error.
- Migrations:
  - Add columns and relationship changes with a single migration.
  - Backfill defaults (`IsActive = true`) in `Up`.

Deliverables:
- New flags on entities, updated EF configurations, updated delete flows to soft-delete or guarded delete.

## Phase 4 — Subject Modeling (Verify and Consolidate)
Goal: Ensure Subjects are first-class with correct relations to Classes and Teachers.

Current code notes:
- `DataContext` has `DbSet<Subject>` and `DbSet<TeacherSubject>` with composite uniqueness (TeacherId, SubjectId, SchoolClassId) already configured.

Actions:
- Create `IEntityTypeConfiguration<Subject>` including unique constraints (e.g., Name + SchoolId) and required `SchoolId`.
- Ensure `TeacherSubject` config uses typed navigations and indices.
- Add seed data (optional) per school.
- Expose Subject endpoints (CRUD) with role policies.

Deliverables:
- Strongly configured Subject aggregate with class/teacher junctions and tested CRUD.

## Phase 5 — Attendance Modeling (Verify and Consolidate)
Goal: Ensure attendance is properly tied to teachers and students.

Current code notes:
- `DbSet<Attendance>` exists; `Status` uses string conversion. Repositories for `Attendance` and `TeacherAttendance` also exist.

Actions:
- Create `IEntityTypeConfiguration<Attendance>`:
  - Keys: `(Date, StudentId, SchoolId)` unique.
  - Relations: `Student (required, Restrict)`, `MarkedByTeacher (optional/required as per rule, Restrict)`.
  - Indexes for fast lookups: `StudentId + Date`, `ClassId + Date` if class-level queries.
- Normalize: if both `Attendance` and `TeacherAttendance` exist, decide on a single model or clear separation (e.g., `Attendance` records + `AttendanceAudit` for teacher marking).
- Services/Repositories: provide pagination and date-range queries; always `AsNoTracking` for reads.

Deliverables:
- Attendance configured with constraints to prevent duplicates and ensure integrity.

## Phase 6 — Authentication & Authorization Hardening
Goal: Improve reliability/security of auth flows.

Actions in `Program.cs` and `AuthController`:
- Token lifetime strategy:
  - Access token short-lived (e.g., 15–30 min).
  - Introduce refresh token (httpOnly, Secure, SameSite=Strict) with rotation and revocation store.
  - Keep tokens in cookies or move to Authorization header for SPA; if cookies, add anti-forgery (double-submit or same-site) and CSRF middleware.
- Claims:
  - Include `SchoolId` claim consistently on login.
  - Add policy `RequireSchoolContext` that checks presence of `SchoolId` claim.
- Cookie policy:
  - Set `CookiePolicyOptions.MinimumSameSitePolicy = SameSiteMode.Strict` when feasible; relax per environment.
- Identity configuration:
  - Require confirmed email/phone for elevated roles.
  - Add lockout, password complexity, and token providers configuration.

Deliverables:
- More secure token flows, anti-CSRF measures, and consistent school scoping.

## Phase 7 — Single Point of Reference: School Context
Goal: All data operations are scoped to a `School`.

Actions:
- Ensure every aggregate has `SchoolId` (directly or via its parent). If missing, add it and backfill.
- Add global query filters by `SchoolId` where appropriate (beware background jobs/admin endpoints).
- In controllers/services, derive `SchoolId` from user claim and require it via policy.
- Add compound uniques including `SchoolId` to prevent cross-school collisions (e.g., Subject names per school).

Deliverables:
- Consistent school scoping across queries, commands, and uniqueness.

## Phase 8 — User Model Enhancements
Goal: Enrich `ApplicationUser` while preserving Identity patterns.

Actions in `SMSDataModel/Model/Models/ApplicationUser.cs` and Identity config:
- Add fields: `ProfileImageUrl`, `EmailConfirmed` (already exists in Identity), `PhoneNumberConfirmed` (Identity), `Salary` (decimal), `Designation`, `DateOfJoining`, etc.
- Ensure `SchoolId` is required (if business rule mandates) and indexed.
- Migrations: add columns; consider moving large assets to storage and keeping URLs only.
- Add DTOs and endpoints to update profile fields with appropriate authorization and validation.

Deliverables:
- Richer user profile compatible with Identity and your domain.

## Phase 9 — Architecture and Code Consistency
Goal: Improve maintainability and performance.

Actions:
- Controllers
  - Return `ActionResult<TDto>`; remove `ApiResult<T>` wrappers and per-action try/catch.
  - Apply `[Authorize]`/policies consistently. Add `CancellationToken` parameters.
- Services
  - Return DTOs or a Result type; no generic string exceptions. Centralize business rules here.
- Repositories
  - Use typed `Include` and add `AsNoTracking()` to read queries.
  - Avoid `Update(entity)` for partial updates; track changes explicitly.
  - Prefer projections to DTOs (`ProjectTo<TDto>`) for read endpoints.
- Mapping
  - Register AutoMapper by assembly scanning (single registration), ensure profiles cover all DTOs.
- Configurations
  - Move all model configuration out of `OnModelCreating` into `IEntityTypeConfiguration<T>` classes.
- Logging
  - Add Serilog (console + file) with enrichers (RequestId, UserId, CorrelationId). Log at boundaries (controller entry, service, repository errors).
- Validation
  - FluentValidation for all request DTOs; integrate with MVC and map to ProblemDetails.

Deliverables:
- Consistent, testable, and performant code across all layers.

## Phase 10 — Migrations & Deployment Order
Apply schema changes safely and predictably.

Actions:
1) Create configuration classes and model property changes first.
2) Generate migration from `Backend/SMSDataContext` project (design-time factory exists):
   - `dotnet ef migrations add Refactor_Phase345 --project Backend/SMSDataContext --startup-project Backend/SMSPrototype1`
3) Review migration for destructive operations; add custom SQL for backfills if needed.
4) Apply migration:
   - `dotnet ef database update --project Backend/SMSDataContext --startup-project Backend/SMSPrototype1`
5) Seed minimal data if new required entities were added (Subjects per school, etc.).

Deliverables:
- Database aligned with code; no FK conflicts during rollout.

## Phase 11 — Testing Checklist
Functional:
- Auth: register/login/logout; token refresh; role access per controller.
- School scoping: all list queries only return current school data.
- Deletions: teachers/classes/students cannot be deleted while linked (soft-delete path works).
- Attendance: cannot duplicate for same `(StudentId, Date, SchoolId)`.
- Subjects: uniqueness per school enforced; teacher-class-subject assignment unique.

Non-functional:
- Cancellation tokens actually cancel long-running queries.
- Reads use `AsNoTracking` and project to DTOs.
- ProblemDetails returned for errors.
- Logs contain correlation and user identifiers.

## Phase 12 — Nice-to-Have (After Core Changes)
- Introduce MediatR for CQRS and pipeline behaviors (validation/logging)
- Add response caching and ETags for read-most endpoints
- Add background job processor (Hangfire/Quartz) for heavy tasks
- Add health checks and readiness/liveness probes

---

# File-by-File Pointers

- `Backend/SMSPrototype1/Program.cs`
  - Change DI lifetimes to Scoped.
  - Add Authorization policies (`RequireSchoolContext`, role policies).
  - Add global exception handler and Serilog (Phase 2 & 6).
  - Register FluentValidation.

- `Backend/SMSPrototype1/Controllers/*Controller.cs`
  - Add `[Authorize]` and roles/policies.
  - Convert to `ActionResult<TDto>` and remove `ApiResult<T>`.
  - Add `CancellationToken` and map to services.

- `Backend/SMSServices/Services/*Service.cs`
  - Replace generic exceptions with typed results/errors.
  - Enforce business rules for delete/soft-delete.
  - Accept/pass `CancellationToken`.

- `Backend/SMSRepository/Repository/*Repository.cs`
  - Use typed `Include`, `AsNoTracking` for reads, projections.
  - Avoid blind `Update`; track specific properties.

- `Backend/SMSDataContext/Data/DataContext.cs`
  - Move configurations to `Data/Configurations/*.cs`.
  - Add Restrict delete behaviors where required.
  - Add global query filters for `SchoolId` where appropriate.

- `Backend/SMSDataModel/Model/Models/*.cs`
  - Add `SchoolId` where missing; add `IsActive`/`IsDeleted` fields.
  - Update `ApplicationUser` with new profile fields.

- `Backend/SMSDataModel/Model/AutoMapper/*`
  - Ensure request/response DTOs and profiles exist; enable assembly scanning registration.

---

# Quick Start Execution (Minimal Command Sequence)
1) Implement Phase 2 DI and exception middleware in `Program.cs` + add FluentValidation.
2) Add `[Authorize]` to all controllers and role attributes (Phase 1).
3) Add soft-delete flags and Restrict delete behaviors + configs (Phase 3).
4) Consolidate Subject and Attendance configurations (Phase 4 & 5).
5) Enhance `ApplicationUser` fields (Phase 8) and add school scoping (Phase 7).
6) Run:
   - `dotnet ef migrations add Refactor_Core --project Backend/SMSDataContext --startup-project Backend/SMSPrototype1`
   - `dotnet ef database update --project Backend/SMSDataContext --startup-project Backend/SMSPrototype1`
7) Replace per-action try/catch + `ApiResult` with ProblemDetails responses.
8) Add Serilog, anti-forgery, token refresh flow (Phase 6).

This order minimizes migration conflicts, keeps APIs secure, and improves consistency without breaking existing core flows.


