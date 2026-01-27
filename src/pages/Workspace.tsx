import { useState, useEffect } from 'react';
import Header from '@/components/workspace/Header';
import Sidebar from '@/components/workspace/Sidebar';
import TasksSection from '@/components/workspace/TasksSection';
import NotesSection from '@/components/workspace/NotesSection';
import CRMSection from '@/components/workspace/CRMSection';
import TimeSection from '@/components/workspace/TimeSection';
import AnalyticsSection from '@/components/workspace/AnalyticsSection';
import SettingsSection from '@/components/workspace/SettingsSection';
import DetailPanel from '@/components/workspace/DetailPanel';
import { toast } from 'sonner';

const Workspace = () => {
  const [activeSection, setActiveSection] = useState('tasks');
  const [detailPanel, setDetailPanel] = useState<{ type: 'task' | 'deal' | 'doc' | null; data: any }>({ type: null, data: null });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(() => {
    return (localStorage.getItem('menuPosition') as 'top' | 'bottom' | 'left' | 'right') || 'left';
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setSidebarCollapsed(saved === 'true');
      
      const position = localStorage.getItem('menuPosition') as 'top' | 'bottom' | 'left' | 'right' | null;
      if (position) {
        setMenuPosition(position);
      }
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 100);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleCreate = (type: 'task' | 'note' | 'deal' | 'event') => {
    const labels: Record<string, string> = {
      task: 'Задача',
      note: 'Заметка',
      deal: 'Сделка',
      event: 'Событие',
    };
    toast.success(`Создание: ${labels[type]}`);
    
    if (type === 'note') {
      setActiveSection('notes');
    } else if (type === 'task') {
      setActiveSection('tasks');
    } else if (type === 'deal') {
      setActiveSection('crm');
    }
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
      case 'notes':
        return <NotesSection />;
      case 'crm':
        return <CRMSection onDealClick={handleDealClick} />;
      case 'time':
        return <TimeSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        try {
          return <SettingsSection />;
        } catch (error) {
          console.error('SettingsSection error:', error);
          return (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold">Настройки</h2>
              <p className="text-red-500">Ошибка загрузки: {String(error)}</p>
            </div>
          );
        }
      default:
        return <TasksSection onTaskClick={handleTaskClick} />;
    }
  };

  const getMainClassName = () => {
    let classes = 'transition-all p-6';
    
    if (menuPosition === 'left') {
      classes += ` ${sidebarCollapsed ? 'ml-16' : 'ml-64'} mt-16`;
    } else if (menuPosition === 'right') {
      classes += ` ${sidebarCollapsed ? 'mr-16' : 'mr-64'} mt-16`;
    } else if (menuPosition === 'top') {
      classes += ' mt-32';
    } else if (menuPosition === 'bottom') {
      classes += ' mt-16 mb-20';
    }
    
    if (detailPanel.type) {
      classes += ' mr-96';
    }
    
    return classes;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header workspace="Моё пространство" onCreateClick={handleCreate} />
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        position={menuPosition}
        collapsed={sidebarCollapsed}
      />
      
      <main className={getMainClassName()}>
        <div className="animate-fade-in">{renderSection()}</div>
      </main>

      <DetailPanel type={detailPanel.type} data={detailPanel.data} onClose={handleClosePanel} />
    </div>
  );
};

export default Workspace;