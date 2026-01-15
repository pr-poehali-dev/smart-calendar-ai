import { useState } from 'react';
import Header from '@/components/workspace/Header';
import Sidebar from '@/components/workspace/Sidebar';
import TasksSection from '@/components/workspace/TasksSection';
import DocsSection from '@/components/workspace/DocsSection';
import CRMSection from '@/components/workspace/CRMSection';
import TimeSection from '@/components/workspace/TimeSection';
import AnalyticsSection from '@/components/workspace/AnalyticsSection';
import { toast } from 'sonner';

const Workspace = () => {
  const [activeSection, setActiveSection] = useState('tasks');

  const handleCreate = () => {
    toast.success('Открыто окно создания');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'tasks':
        return <TasksSection />;
      case 'docs':
        return <DocsSection />;
      case 'crm':
        return <CRMSection />;
      case 'time':
        return <TimeSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Настройки пространства</h2>
            <p className="text-muted-foreground mt-2">Раздел в разработке</p>
          </div>
        );
      default:
        return <TasksSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header workspace="Моё пространство" onCreateClick={handleCreate} />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="ml-64 mt-16 p-6">
        <div className="animate-fade-in">{renderSection()}</div>
      </main>
    </div>
  );
};

export default Workspace;
