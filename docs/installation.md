# 📦 Installation

This guide explains how to set up Orchestra for local development.

---

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- npm
- Git

You will also need accounts or access to:

- Slack Workspace
- Google Gemini API
- Neon PostgreSQL
- Pinecone
- Redis
- ngrok

---

## Clone the Repository

```bash
git clone <repository-url>
cd orchestra
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Copy the example environment file.

```bash
cp .env.example .env
```

Update the values inside `.env` with your own credentials.

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Start the Development Server

```bash
npm run dev
```

By default the server runs on:

```
http://localhost:3000
```

---

## Next Steps

Continue with the remaining setup guides:

- [Slack App Configuration](slack-setup.md)
- [Prisma Setup](prisma-setup.md)