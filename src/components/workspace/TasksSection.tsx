import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import TaskCalendar from './TaskCalendar';
import CreateTaskDialog from './CreateTaskDialog';
import DayEfficiency from './DayEfficiency';
import TaskActions from './TaskActions';
import RescheduleDialog from './RescheduleDialog';
import { toast } from 'sonner';

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

type TasksSectionProps = {
  onTaskClick: (task: Task) => void;
};

const TasksSection = ({ onTaskClick }: TasksSectionProps) => {
  const [view, setView] = useState<'board' | 'list' | 'calendar' | 'stats'>(() => {
    const saved = localStorage.getItem('tasksView');
    return (saved as 'board' | 'list' | 'calendar' | 'stats') || 'board';
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [taskToReschedule, setTaskToReschedule] = useState<Task | null>(null);
  const [calendarTasks, setCalendarTasks] = useState<any[]>([
    {
      id: '1',
      title: 'Позвонить клиенту',
      date: '2026-01-16',
      time: '16:00',
      type: 'work',
      assignee: 'МП',
      status: 'pending',
      createdBy: 'ЮР',
    },
    {
      id: '2',
      title: 'Встреча с командой',
      date: '2026-01-17',
      time: '10:00',
      type: 'work',
      assignee: 'ЮР',
      status: 'pending',
      createdBy: 'АС',
    },
  ]);

  const handleCreateTask = useCallback((date: string) => {
    setSelectedDate(date);
    setCreateDialogOpen(true);
  }, []);

  const handleTaskCreate = useCallback((task: any) => {
    setCalendarTasks(prev => [...prev, task]);
  }, []);

  const handleTaskMove = useCallback((taskId: string, newDate: string) => {
    setCalendarTasks(prev =>
      prev.map((task) =>
        task.id === taskId ? { ...task, date: newDate } : task
      )
    );
    toast.success('Задача перенесена на новую дату');
  }, []);

  useEffect(() => {
    localStorage.setItem('tasksView', view);
  }, [view]);

  const handleTaskComplete = useCallback((taskId: string, comment: string) => {
    setCalendarTasks(prev => {
      const updatedTasks = prev.map((task) =>
        task.id === taskId ? { ...task, status: 'completed', comment } : task
      );
      
      const task = updatedTasks.find((t) => t.id === taskId);
      if (task && task.createdBy !== 'ЮР') {
        toast.success(
          `${task.createdBy} получил уведомление о выполнении задачи "${task.title}"`,
          { duration: 5000 }
        );
      }
      
      return updatedTasks;
    });
  }, []);
  
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
          <Button variant={view === 'stats' ? 'default' : 'ghost'} size="sm" onClick={() => setView('stats')}>
            <Icon name="BarChart2" size={16} className="mr-2" />
            Статистика
          </Button>
        </div>
      </div>

      {view === 'calendar' && (
        <>
          <DayEfficiency tasks={calendarTasks} />
          <TaskCalendar
            onCreateTask={handleCreateTask}
            tasks={calendarTasks}
            onTaskComplete={handleTaskComplete}
            onTaskMove={handleTaskMove}
          />
          <CreateTaskDialog
            open={createDialogOpen}
            onClose={() => setCreateDialogOpen(false)}
            date={selectedDate}
            onTaskCreate={handleTaskCreate}
          />
        </>
      )}

      {view === 'list' && (
        <Card className="p-6 bg-card border-border">
          <div className="space-y-3">
            {[...tasks, ...calendarTasks.map(ct => ({
              id: ct.id,
              title: ct.title,
              status: ct.status === 'completed' ? 'done' : 'todo',
              priority: 'medium' as const,
              assignee: ct.assignee,
              dueDate: ct.date,
              tags: [ct.type],
              comments: 0,
              attachments: 0,
            }))].map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="group p-4 rounded-lg bg-muted/50 border border-border hover:border-primary cursor-pointer transition-all hover-scale"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.status === 'done' || task.status === 'completed'}
                      className="w-5 h-5 rounded border-2 border-primary"
                      onChange={() => {}}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                        </span>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs gradient-purple text-white">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                  <TaskActions
                    onComplete={() => {
                      toast.success('Статус задачи изменён');
                    }}
                    onEdit={() => {
                      toast.info('Редактирование задачи');
                      onTaskClick(task);
                    }}
                    onReschedule={() => {
                      setTaskToReschedule(task);
                      setRescheduleDialogOpen(true);
                    }}
                    isCompleted={task.status === 'done' || task.status === 'completed'}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
                    <Card key={task.id} onClick={() => onTaskClick(task)} className="group p-4 hover:border-primary cursor-pointer transition-all hover-scale bg-card border-border">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm leading-tight flex-1">{task.title}</p>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>
                        
                        <TaskActions
                          onComplete={() => {
                            toast.success('Статус задачи изменён');
                          }}
                          onEdit={() => {
                            onTaskClick(task);
                          }}
                          onReschedule={() => {
                            setTaskToReschedule(task);
                            setRescheduleDialogOpen(true);
                          }}
                          isCompleted={task.status === 'done'}
                        />

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

      {view === 'stats' && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Статистика задач по дням</h3>
          <div className="space-y-4">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date('2026-01-15');
              date.setDate(date.getDate() + i);
              const dateStr = date.toISOString().split('T')[0];
              
              const dayTasks = calendarTasks.filter((t) => t.date === dateStr);
              const total = dayTasks.length;
              const completed = dayTasks.filter((t) => t.status === 'completed').length;
              const pending = dayTasks.filter((t) => t.status === 'pending').length;
              const postponed = 0;
              
              return (
                <div key={dateStr} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-sm text-muted-foreground">Всего: {total}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">✓ Выполнено: {completed}</span>
                    <span className="text-yellow-400">⏳ Не выполнено: {pending}</span>
                    <span className="text-blue-400">📅 Перенесено: {postponed}</span>
                  </div>
                  {total > 0 && (
                    <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(completed / total) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <RescheduleDialog
        open={rescheduleDialogOpen}
        onClose={() => {
          setRescheduleDialogOpen(false);
          setTaskToReschedule(null);
        }}
        onReschedule={(newDate) => {
          if (taskToReschedule) {
            toast.success(`Задача "${taskToReschedule.title}" перенесена на ${new Date(newDate).toLocaleDateString('ru-RU')}`);
          }
        }}
        taskTitle={taskToReschedule?.title || ''}
        currentDate={taskToReschedule?.dueDate || new Date().toISOString()}
      />
    </div>
  );
};

export default TasksSection;