import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Task = {
  id: string;
  title: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
};

const TasksSection = () => {
  const [view, setView] = useState<'board' | 'list' | 'calendar' | 'gantt'>('board');
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Разработать дизайн главной страницы',
      status: 'todo',
      priority: 'high',
      assignee: 'АС',
      dueDate: '2026-01-20',
      tags: ['дизайн', 'ui'],
      comments: 3,
      attachments: 2,
    },
    {
      id: '2',
      title: 'Настроить CI/CD pipeline',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'МП',
      dueDate: '2026-01-18',
      tags: ['devops'],
      comments: 5,
      attachments: 0,
    },
    {
      id: '3',
      title: 'Написать документацию API',
      status: 'in-progress',
      priority: 'low',
      assignee: 'ЕИ',
      dueDate: '2026-01-25',
      tags: ['документация'],
      comments: 1,
      attachments: 1,
    },
    {
      id: '4',
      title: 'Провести код-ревью',
      status: 'done',
      priority: 'medium',
      assignee: 'АС',
      dueDate: '2026-01-15',
      tags: ['разработка'],
      comments: 8,
      attachments: 0,
    },
  ];

  const columns = [
    { id: 'todo', title: 'К выполнению', color: 'bg-gray-500/20' },
    { id: 'in-progress', title: 'В работе', color: 'bg-blue-500/20' },
    { id: 'done', title: 'Выполнено', color: 'bg-green-500/20' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'low': return 'text-green-400 border-green-500/30 bg-green-500/10';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Задачи</h2>
        <div className="flex gap-2">
          <Button variant={view === 'board' ? 'default' : 'ghost'} size="sm" onClick={() => setView('board')}>
            <Icon name="Columns" size={16} className="mr-2" />
            Доска
          </Button>
          <Button variant={view === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setView('list')}>
            <Icon name="List" size={16} className="mr-2" />
            Список
          </Button>
          <Button variant={view === 'calendar' ? 'default' : 'ghost'} size="sm" onClick={() => setView('calendar')}>
            <Icon name="Calendar" size={16} className="mr-2" />
            Календарь
          </Button>
          <Button variant={view === 'gantt' ? 'default' : 'ghost'} size="sm" onClick={() => setView('gantt')}>
            <Icon name="BarChart2" size={16} className="mr-2" />
            Гант
          </Button>
        </div>
      </div>

      {view === 'board' && (
        <div className="grid grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="space-y-3">
              <div className={`p-3 rounded-lg ${column.color}`}>
                <h3 className="font-semibold flex items-center justify-between">
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {tasks.filter((t) => t.status === column.id).length}
                  </Badge>
                </h3>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <Card key={task.id} className="p-4 hover:border-primary cursor-pointer transition-all hover-scale bg-card border-border">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm leading-tight">{task.title}</p>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            {task.comments > 0 && (
                              <span className="flex items-center gap-1">
                                <Icon name="MessageSquare" size={14} />
                                {task.comments}
                              </span>
                            )}
                            {task.attachments > 0 && (
                              <span className="flex items-center gap-1">
                                <Icon name="Paperclip" size={14} />
                                {task.attachments}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                            </span>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs gradient-purple text-white">
                                {task.assignee}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              <Button variant="ghost" className="w-full border-2 border-dashed border-border hover:border-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить задачу
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksSection;
