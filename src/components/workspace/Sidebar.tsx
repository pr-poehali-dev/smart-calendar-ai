import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  badge?: number;
};

type SidebarProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

const menuItems: MenuItem[] = [
  { id: 'tasks', label: 'Задачи', icon: 'CheckSquare', badge: 12 },
  { id: 'notes', label: 'Заметки', icon: 'StickyNote' },
  { id: 'crm', label: 'CRM', icon: 'Users' },
  { id: 'time', label: 'Время', icon: 'Clock' },
  { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <aside className={`border-r border-border bg-card/30 fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-3 flex items-center justify-between border-b border-border mb-2">
        {!collapsed && <span className="text-sm font-semibold text-muted-foreground">МЕНЮ</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="hover-scale"
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} />
        </Button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'} transition-all ${
              activeSection === item.id ? 'gradient-purple text-white' : 'hover:bg-muted'
            }`}
            onClick={() => onSectionChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon as any} size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-3 right-3">
          <div className="p-4 rounded-lg gradient-purple/10 border border-purple-500/30">
            <div className="flex items-start gap-2">
              <Icon name="Sparkles" size={18} className="text-purple-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Попробуйте Premium</p>
                <p className="text-xs text-muted-foreground mt-1">Больше проектов и пользователей</p>
                <Button size="sm" className="w-full mt-2 gradient-purple text-white">
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;