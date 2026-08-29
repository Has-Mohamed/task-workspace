## Live demo

https://task-workspace-five.vercel.app/

## How to run it locally

**1. Clone & enter the repo**

```bash
git clone <your-repo-url>
cd task-workspace
npm install
npm run dev
```

**2. Install & start the frontend**

```bash
cd frontend
npm install
npm run dev        # Vite dev server — opens http://localhost:5173
```

## Technologies Used

- React (v19)
- TypeScript (v5)
- TanStack Query (v5) for server state management
- Zustand for client state management
- Tailwind CSS (v4) for styling
- Shadcn UI for components
- Dnd-kit for drag and drop
- Lucide React for icons

## Architectural Decisions

The main thing I want to call out: server state and client state are kept completely separate.

### server state

TanStack Query for server state management

### client state

zustand for client state management

shadcn vs MUI shadcn wins because it is more customizable and accessible.

zustand vs redux toolkit zustand wins because it is more lightweight and has less boilerplate.

features based architecture for better scalability and maintainability.

## Engineering Trade-Offs:

- we didn't implement any tests due to the time constraint, although the codebase is set up for it.

- ui isn't fully responsive for mobile devices.

## Future Scalability & Roadmap:

- add unit and integration tests.

- improve ui and make it fully responsive for mobile devices.

- enhancing taskCard transition effect
