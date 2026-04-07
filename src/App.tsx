import { useState } from "react";
import { Section } from "@/data/content";
import Navbar from "@/components/Navbar";
import { HomePage, TheoryPage, TasksPage } from "@/components/pages/HomeTheoryTasks";
import { SolutionsPage, AiPage, TemplatesPage } from "@/components/pages/SolutionsAiTemplates";

export default function App() {
  const [active, setActive] = useState<Section>("home");

  const renderPage = () => {
    switch (active) {
      case "home": return <HomePage onNavigate={setActive} />;
      case "theory": return <TheoryPage />;
      case "tasks": return <TasksPage />;
      case "solutions": return <SolutionsPage />;
      case "ai": return <AiPage />;
      case "templates": return <TemplatesPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-60" />
      </div>

      <Navbar active={active} onNavigate={setActive} />

      <main className="pt-16 relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}
