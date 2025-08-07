# WeRoster JWT Authenticator (Next.js + Drizzle + MySQL + JWT)

This project is an authentication protocol intended for proposed use for WeRoster's applications using Next.js 15, Drizzle ORM, MySQL, bcrypt, and JWT (via [jose](https://github.com/panva/jose)).  
It aims to ensure secure login/logout with protected dashboard routes.

---

## 
Quick Start

### 1. **Clone the Repo**

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure your environment**

Copy .env.example to .env (if provided and empty), or create a .env file in the project root.

Set the following variables:
```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=your_db_name
JWT_SECRET=your_long_secret_string_here
```

### 4. **Start your database**
If using Docker, run:
```bash
docker compose up -d
```
Or, start MySQL any other way you prefer.

### 5. **Push the Drizzle schema (if needed)**
```bash
npm run db:push
```

### 6. **Seed the admin user**
```bash 
npx ts-node scripts/seed-user.ts
```
Or, if you've added your own script in package.json
```bash
npm run seed:user
```
This creates a preset admin user:
* Username: admin
* Password: securepassword

Otherwise, feel free to edit seed-user.ts or make your own script within the scripts folder and adjust the initial command accordingly.

### 7. **Run the dev server**
```bash
npm run dev
```
Visit http://localhost:3000
You will automatically be redirected to /sign-in

---
## Authentication Flow
* Sign in with the seeded username and password
* Upon login, you will be redirected to dashboard
* The dashboard is protected by JWT auth middleware (auth_token cookie)
* Log out by clicking the Log Out button on the dashboard

---
## Testing the Auth Flow
1. Go to /sign-in
2. Use the seeded credentials
3. After login, you should see the dashboard
4. Click "Log Out" to invalidate the session (cookie is removed)
5. Try to visit /dashboard again -- you should be redirected to /sign-in

---
## Troubleshooting
* Login fails, or you're redirected to /sign-in after logging in:
    * Check your .env values (especially JWT_SECRET) and restart npm run dev
    * Make sure the auth_token cookie is being set (see Dev_Tools > Application > Cookies)
    * Make sure database connection details are correct
* Seeding fails:
    * Make sure MySQL is running and credentials in .env are correct
* Still stuck?
    * Run npx ts-node scripts/seed-user.ts again to re-inject the admin user
    * Check logs/output for detailed errors

---
## Key Files
* /src/app/api/auth/sign-in/route.ts — Handles login & issues JWT
* /src/app/api/auth/logout/route.ts — Handles logout & removes JWT cookie
* /src/app/dashboard/page.tsx — Protected dashboard page
* /src/middleware.ts — Middleware for route protection
* /scripts/seed-user.ts — Script to create the initial admin user
* /src/lib/auth.ts — JWT sign/verify helpers
* /src/lib/bcrypt.ts — Password hashing/verification
* /src/db/schema.ts — Drizzle ORM schema for users

---
## Notes
* Never commit .env files with real secrets to GitHub! This is a dev/test template, so the .env file does not hold any sensitive data.
* This is a dev/test template: use stronger passwords and secrets in production.

---
## Happy Hacking!
