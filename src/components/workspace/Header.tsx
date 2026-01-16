import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NotificationPanel from './NotificationPanel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HeaderProps = {
  workspace: string;
  onCreateClick: (type: 'task' | 'note' | 'deal' | 'event') => void;
};

const Header = ({ workspace, onCreateClick }: HeaderProps) => {
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const createOptions = [
    { id: 'task', label: 'Задачу', icon: 'CheckSquare', color: 'text-blue-400' },
    { id: 'note', label: 'Заметку', icon: 'StickyNote', color: 'text-yellow-400' },
    { id: 'deal', label: 'Сделку', icon: 'Briefcase', color: 'text-green-400' },
    { id: 'event', label: 'Событие', icon: 'Calendar', color: 'text-purple-400' },
  ];

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center text-white font-bold">
              W
            </div>
            <Button variant="ghost" className="flex items-center gap-2">
              <span className="font-semibold">{workspace}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск задач, документов, контактов..."
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu open={createMenuOpen} onOpenChange={setCreateMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="gradient-purple text-white hover-scale">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {createOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => {
                    onCreateClick(option.id as any);
                    setCreateMenuOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Icon name={option.icon as any} size={18} className={`mr-3 ${option.color}`} />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <NotificationPanel />

          <Avatar className="cursor-pointer hover-scale">
            <AvatarFallback className="gradient-blue text-white">ЮР</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;