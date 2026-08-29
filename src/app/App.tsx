import TasksFeature from "@/features/tasks";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { Header } from "@/shared/components/Header";
import Layout from "@/shared/components/Layout";

export function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header />
        <Layout>
          <TasksFeature />
        </Layout>
      </div>
    </ErrorBoundary>
  );
}

export default App;
