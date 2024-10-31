# Nest.js REST API with Prisma ORM, Neon Postgres - Series Part 5

- [x] (00:00) Intro
- [x] (00:05) Welcome
- [x] (00:28) Starter Code
- [x] (00:45) Neon & Prisma
- [x] (01:20) Set up your Neon database
- [x] (03:32) Set up Prisma\
  `npm i -D prisma`\
  `npx prisma init`
- [x] (06:52) Prisma VS Code Extension
- [x] (07:20) Define Data Models in the Prisma Schema
- [x] (10:37) Run a Prisma Migration\
  `npx prisma migrate dev --name init`\
- [x] (14:25) How to Migrate Data Model changes\
    `npx prisma migrate generate &&  npx prisma migrate dev --name  name_index_has_changed`
- [x] (16:52) Database Module\
  `nest g module database && nest g module database`
- [x] (18:07) Not Using the Global Decorator
- [x] (19:10) Database Service
- [x] (20:55) Create the Employee REST API Resource
- [x] (22:27) Employees Module
- [x] (22:58) Employees Controller
- [x] (26:47) Employee Service
- [x] (33:37) Testing the REST API Endpoints
