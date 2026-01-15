import { useState } from 'react';
import Header from '@/components/workspace/Header';
import Sidebar from '@/components/workspace/Sidebar';
import TasksSection from '@/components/workspace/TasksSection';
import DocsSection from '@/components/workspace/DocsSection';
import CRMSection from '@/components/workspace/CRMSection';
import TimeSection from '@/components/workspace/TimeSection';
import AnalyticsSection from '@/components/workspace/AnalyticsSection';
import DetailPanel from '@/components/workspace/DetailPanel';
import { toast } from 'sonner';

const Workspace = () => {
  const [activeSection, setActiveSection] = useState('tasks');
  const [detailPanel, setDetailPanel] = useState<{ type: 'task' | 'deal' | 'doc' | null; data: any }>({ type: null, data: null });

  const handleCreate = () => {
    toast.success('Открыто окно создания');
  };

  const handleTaskClick = (task: any) => {
    setDetailPanel({ type: 'task', data: task });
  };

  const handleDealClick = (deal: any) => {
    setDetailPanel({ type: 'deal', data: deal });
  };

  const handleDocClick = (doc: any) => {
    setDetailPanel({ type: 'doc', data: doc });
  };

  const handleClosePanel = () => {
    setDetailPanel({ type: null, data: null });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'tasks':
        return <TasksSection onTaskClick={handleTaskClick} />;
      case 'docs':
        return <DocsSection onDocClick={handleDocClick} />;
      case 'crm':
        return <CRMSection onDealClick={handleDealClick} />;
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
        return <TasksSection onTaskClick={handleTaskClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header workspace="Моё пространство" onCreateClick={handleCreate} />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className={`ml-64 mt-16 p-6 transition-all ${detailPanel.type ? 'mr-96' : 'mr-0'}`}>
        <div className="animate-fade-in">{renderSection()}</div>
      </main>

      <DetailPanel type={detailPanel.type} data={detailPanel.data} onClose={handleClosePanel} />
    </div>
  );
};

export default Workspace;