import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { AppProvider } from "./app/AppProvider.tsx";

async function enableMocking() {
  // if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./mocks/browser.ts");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </StrictMode>,
  );
});
