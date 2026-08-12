# Timon

**Timon** (Filipino, /tee-MON/) — *helm* or *rudder*: the part of a boat that steers it and keeps it on course.

Timon is a personal command center that pulls together your email, messages, and projects, and helps you figure out what you should actually be working on — like a rudder keeping you steered toward what matters, instead of drifting from inbox to inbox.

## Stack

- [Vite](https://vite.dev/) + React 19
- [React Router](https://reactrouter.com/) v7
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) (manually scaffolded for Tailwind v4 compatibility)
- TypeScript (strict mode)

## Project structure

```
src/
├── features/
│   ├── focus/       Daily focus view — ranks tasks by due date + priority
│   ├── inbox/        Unified email view
│   ├── messages/      Unified messages view
│   └── projects/      Project & task tracker
├── layouts/           App shell (sidebar nav) + routing outlet
├── components/ui/     shadcn base components (Button, Card, ...)
├── data/               Mock data + domain types (swap for real data later)
└── lib/                Shared utilities (cn helper, etc.)
```

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Roadmap

- Replace `src/data/mockData.ts` with real data (Gmail, Slack, task tools, etc.)
- Add task interactions (mark done, snooze, reprioritize)
- Add more shadcn components as needed (dialog, tabs, etc.)
