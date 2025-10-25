---


# 🧩 PracSphere Monorepo

A **Next.js 15 + Turborepo** monorepo built with shared libraries for **UI**, **Utils**, **Types**, **Config**, and **Database**.  
Implements **Mongoose (MongoDB)** for persistent storage and demonstrates a complete **task management workflow** using shared packages across the repo.

---

## 🚀 Deployment

🔗 **Live App:** https://prachsphere-v2-gw9djkhaj-srivatsmahesh7-5961s-projects.vercel.app/

Deployed on **Vercel** with automated CI/CD pipelines from the `main` branch, leveraging **Turborepo caching** for fast incremental builds.

---

## 📂 Monorepo Structure

```

prachsphere-v2/
│
├── apps/
│   └── web/              # Next.js 15 App Router frontend
│
├── packages/
│   ├── ui/               # Shared UI components (Button, Card, Header, etc.)
│   ├── utils/            # Formatters, logger, API client, auth helpers
│   ├── types/            # Shared TypeScript interfaces and enums
│   ├── config/           # Shared ESLint, Tailwind, and tsconfig presets
│   └── db/               # Mongoose connection + models + seed scripts
│
├── turbo.json            # Turborepo pipeline config
├── pnpm-workspace.yaml   # Defines workspace scope
└── package.json          # Root scripts and dependencies

````

---

## ⚙️ Tech Stack

- ⚡ **Next.js 15 (App Router)**
- 🧠 **TypeScript**
- 🎨 **Tailwind CSS 3**
- 🎥 **Framer Motion** for animations
- 🧩 **Mongoose + MongoDB** for persistence
- 🚀 **pnpm + Turborepo** for workspace management
- 💡 **Lucide React Icons**
- 🌙 **Dark Mode** with theme toggle
- 📊 **Recharts** for analytics and data visualization

---

## 🧱 Shared Packages

| Package | Purpose |
|----------|----------|
| `@repo/ui` | Shared React UI components |
| `@repo/utils` | Common helpers (auth, formatters, HTTP) |
| `@repo/types` | TypeScript interfaces & enums |
| `@repo/config` | Shared TS + ESLint + Tailwind configs |
| `@repo/db` | Centralized Mongoose connection and models |

_All packages are consumed via workspace imports — ensuring zero duplication across apps._

---

## 🌐 App Features (`apps/web`)

- 🔐 **Auth System:** Login / Signup with JWT via `@repo/utils`
- 🏠 **Dashboard:** Displays task statistics and user summaries
- ✅ **Task Manager:** Create, update, complete, delete, and search tasks
- 📈 **Analytics Dashboard:** Charts showing task distribution and progress trends
- 👤 **Profile Page:** View and edit user information
- 🌗 **Dark Mode:** Persistent theme toggle with system preference detection
- 🎞️ **Framer Motion:** Smooth animations and transitions
- 🧩 **Modular Components:** Shared UI and logic across all workspaces

---

## 🧰 Scripts

Run from the repo root:

```bash
# Install dependencies
pnpm install

# Run the web app
pnpm --filter web dev

# Build all packages
pnpm build

# Run DB seeder
pnpm db:seed
````

---

## 🌿 Environment Setup

Create a `.env` file in `/apps/web`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/pracsphere
JWT_SECRET=your_secret_here
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

A sample `.env.example` is included for guidance.

---

## 🧩 DB Package Highlights (`@repo/db`)

* 🔌 Single connection utility (`connectDB`)
* 🧱 Centralized schema definitions (`User`, `Task`)
* 🌱 Optional seed script for sample data
* ⚡ **No Prisma** — pure Mongoose implementation
* 🔁 Shared models imported from `@repo/db` across apps

---

## 🧭 Acceptance Checklist

✅ No duplicate models or utils in `apps/web`
✅ All database access routed through `@repo/db`
✅ Shared imports used consistently (`@repo/ui`, `@repo/utils`, etc.)
✅ App builds and runs cleanly
✅ Analytics dashboard demonstrates full integration (UI + DB + Utils)

---

## 💡 Future Enhancements

* 🔔 Notifications & due-date reminders
* 📅 Calendar & timeline views
* 🧩 Collaborative task boards
* 👥 Role-based access for teams
* 📲 PWA support for mobile devices

---

## 👨‍💻 Author

**M. Srivats**
💼 Full Stack Developer | Hyderabad, India
🔗 [GitHub Profile](https://github.com/Srivats7112004)
🌐 https://prachsphere-v2-gw9djkhaj-srivatsmahesh7-5961s-projects.vercel.app/

---



