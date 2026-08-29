import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { Header } from "@/shared/components/Header";
import Layout from "@/shared/components/Layout";
import { Button } from "@/shared/components/ui/button";

export function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header />
        <Layout>
          <Button>Button</Button>
        </Layout>
      </div>
    </ErrorBoundary>
  );
}

export default App;
