# 🗄️ Prisma Setup

Orchestra uses PostgreSQL hosted on Neon together with Prisma ORM.

---

## Install Prisma

```bash
npm install @prisma/client
npm install pg
npm install @prisma/adapter-pg

npm install --save-dev prisma
```

---

## Configure the Database

Create a `.env` file.

```env
DATABASE_URL=your_database_url
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Running Migrations

After modifying the Prisma schema, create a migration.

```bash
npx prisma migrate dev --name <migration-name>
```

Example:

```bash
npx prisma migrate dev --name add-project-member
```

This command:

- Creates a migration
- Applies the migration
- Updates migration history

---

## Regenerate Prisma Client

After every schema change.

```bash
npx prisma generate
```

---

## Restart the Application

Restart the Node.js server after generating the Prisma Client.

---

## Migration Workflow

```
Update schema.prisma
        ↓
Create Migration
        ↓
Apply Migration
        ↓
Generate Prisma Client
        ↓
Restart Orchestra
```