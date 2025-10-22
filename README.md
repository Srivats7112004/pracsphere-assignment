

 

# 🧩 PracSphere Monorepo

A **Next.js 15 + Turborepo** monorepo built with shared libraries for **UI**, **Utils**, **Types**, **Config**, and **Database**.  
Implements **Mongoose (MongoDB)** for persistent storage and demonstrates a complete **task management workflow** using shared packages across the repo.

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
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** for animations
- **Mongoose + MongoDB** for persistence
- **pnpm + Turborepo** for workspace management
- **Lucide React Icons**
- **Dark Mode** with theme toggle

---

## 🧱 Shared Packages

| Package | Purpose |
|----------|----------|
| `@repo/ui` | Shared React UI components |
| `@repo/utils` | Common helpers (auth, formatters, HTTP) |
| `@repo/types` | TypeScript interfaces & enums |
| `@repo/config` | Shared TS + ESLint + Tailwind configs |
| `@repo/db` | Centralized Mongoose connection and models |

_All packages are consumed through workspace imports — no duplication in the apps._

---

## 🌐 App Features (`apps/web`)
- **Auth System:** Login / Signup with JWT via `@repo/utils`
- **Dashboard:** Displays task stats & user summary
- **Task Manager:** Create, update, complete, delete, and search tasks
- **Analytics:** Charts and visual breakdown of task distribution
- **Profile Page:** View and edit user info
- **Dark Mode:** Persistent theme toggle with system preference support
- **Framer Motion:** Smooth animations and transitions

---

## 🧰 Scripts
From the repo root:
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
```

A sample `.env.example` is included.

---

## 🧩 DB Package Highlights (`@repo/db`)

* Single connection utility (`connectDB`)
* Centralized schema definitions (`User`, `Task`)
* Optional seed script for sample data
* **No Prisma — pure Mongoose implementation**
* Shared models imported from `@repo/db`

---

## 🧭 Acceptance Checklist

✅ No duplicate models or utils in `apps/web`
✅ All database access routed through `@repo/db`
✅ Shared imports used consistently (`@repo/ui`, `@repo/utils`, etc.)
✅ App builds and runs cleanly
✅ One screen demonstrates full flow (shared UI + utils + DB)

---

## 💡 Future Enhancements

* Notifications and due-date reminders
* Calendar & timeline views
* Collaborative task boards
* Role-based access for teams

---

## 👨‍💻 Author

**M. Srivats**
💼 Full Stack Developer | Hyderabad, India
🔗 [GitHub Profile](https://github.com/Srivats7112004)

---

## 🪄 License

MIT License © 2025 M. Srivats

````

---

### ✨ Now do:
```bash
git add README.md
git commit -m "polished markdown README"
git push -u origin main
````

