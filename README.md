# Lekha : A Fullstack Blog Application

This is a full-stack blog application that allows users to create, read, and bookmark blog posts. The application features a frontend, backend, and a common folder for shared utilities such as Zod validation.

## Features

- **CRUD Operations:** Create, Read, bookmark and share blog posts.
- **User Authentication:** Secure login and registration system.
- **Type Validation:** Consistent type definitions across frontend and backend using Zod and TypeScript.

## Screenshots

![Homepage](/readmeAssets/lekhaHomePage.png)

## Tech Stack

- **Frontend:** Next.js 14, ShadCN, Tailwind CSS
- **Backend:** Hono.js, Cloudflare
- **Database:** Prisma ORM, PostgreSQL
- **Deployment:** Vercel (Frontend), Cloudflare (Backend)
- **Type Validation:** Zod, TypeScript

## Installation and Setup

### Prerequisites

- Node.js (v20 or later)
- PostgreSQL

### Backend Setup

1. **Fork and then Clone the repository:**
   ```bash
    git clone https://github.com/AnchalDevBytes/lekha.git
    cd lekha
   ```

2. **Install dependencies: frontend & backend**
   ```bash
   cd backend
   npm install

   cd frontend
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL and a Prisma accelerate database URL and update the `DATABASE_URL` with prisma accelerate and `DIRECT_URL` with postgresql url, in the `.env` file of backend.
   - In the frontend `.env` just paste the backend server url example `http://localhost:8787`

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name name_of_migration
   npx prisma generate --no-engine
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Type Validation

This project follows an older approach of creating a common Zod module for both frontend and backend. This approach ensures that type validation for forms and APIs is consistent across the application.
