import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type CalendarTask = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'personal' | 'work' | 'reminder';
  assignee: string;
  status: 'pending' | 'completed';
  createdBy: string;
  comment?: string;
};

type TaskCalendarProps = {
  onCreateTask: (date: string) => void;
  tasks: CalendarTask[];
  onTaskComplete: (taskId: string, comment: string) => void;
  onTaskMove: (taskId: string, newDate: string) => void;
};

const TaskCalendar = ({ onCreateTask, tasks, onTaskComplete, onTaskMove }: TaskCalendarProps) => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date('2026-01-15'));
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dayDialogOpen, setDayDialogOpen] = useState(false);
  const [dayDialogDate, setDayDialogDate] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() || 7;

    const days = [];
    for (let i = 1 - (startDay - 1); i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `2026-01-${String(day).padStart(2, '0')}`;
    return tasks.filter((task) => task.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personal': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'work': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'reminder': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return '';
    }
  };

  const handleDateClick = (day: number) => {
    if (day > 0) {
      const dateStr = `2026-01-${String(day).padStart(2, '0')}`;
      setSelectedDate(new Date(dateStr));
      onCreateTask(dateStr);
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(selectedDate);
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-3">
            {day}
          </div>
        ))}
        
        {days.map((day, idx) => {
          const isCurrentMonth = day > 0;
          const isToday = day === 15;
          const dayTasks = isCurrentMonth ? getTasksForDate(day) : [];
          
          return (
            <div
              key={idx}
              onClick={() => handleDateClick(day)}
              onDragOver={(e) => {
                if (isCurrentMonth && draggedTask) {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedTask && isCurrentMonth) {
                  const newDate = `2026-01-${String(day).padStart(2, '0')}`;
                  onTaskMove(draggedTask, newDate);
                  setDraggedTask(null);
                }
              }}
              className={`min-h-24 p-2 rounded-lg border transition-all cursor-pointer ${
                draggedTask && isCurrentMonth ? 'ring-2 ring-purple-500' : ''
              } ${
                isCurrentMonth
                  ? 'border-border hover:border-primary bg-card'
                  : 'border-transparent bg-muted/30'
              } ${isToday ? 'ring-2 ring-purple-500' : ''}`}
            >
              {isCurrentMonth && (
                <>
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-purple-400' : ''}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayTasks
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .slice(0, 3)
                      .map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => {
                            setDraggedTask(task.id);
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onDragEnd={() => setDraggedTask(null)}
                          className={`text-xs p-1 rounded border ${getTypeColor(task.type)} truncate cursor-move hover:opacity-80`}
                        >
                          {task.time} {task.title}
                        </div>
                      ))}
                    {dayTasks.length > 3 && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setDayDialogDate(day);
                          setDayDialogOpen(true);
                        }}
                        className="text-xs text-blue-400 cursor-pointer hover:underline"
                      >
                        +{dayTasks.length - 3} ещё
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayDialog = () => {
    if (!dayDialogDate) return null;
    const dayTasks = getTasksForDate(dayDialogDate).sort((a, b) => a.time.localeCompare(b.time));

    return (
      <Dialog open={dayDialogOpen} onOpenChange={setDayDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Задачи на {dayDialogDate} января 2026
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {dayTasks.map((task) => (
              <Card key={task.id} className={`p-3 border ${getTypeColor(task.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{task.time}</span>
                      <span className="text-sm">{task.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ответственный: {task.assignee}
                    </p>
                  </div>
                  {task.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const comment = prompt('Добавить комментарий:');
                        if (comment !== null) {
                          onTaskComplete(task.id, comment);
                          setDayDialogOpen(false);
                        }
                      }}
                    >
                      <Icon name="Check" size={14} />
                    </Button>
                  )}
                  {task.status === 'completed' && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Icon name="CheckCircle" size={14} />
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderWeekView = () => {
    const weekDays = ['Пн 13', 'Вт 14', 'Ср 15', 'Чт 16', 'Пт 17', 'Сб 18', 'Вс 19'];
    const timeSlots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 text-sm font-medium sticky left-0 bg-card">Время</th>
              {weekDays.map((day) => (
                <th key={day} className="text-center p-2 text-sm font-medium min-w-32">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-t border-border">
                <td className="p-2 text-xs text-muted-foreground sticky left-0 bg-card">{time}</td>
                {weekDays.map((day) => {
                  const dayNum = parseInt(day.split(' ')[1]);
                  const tasksAtTime = getTasksForDate(dayNum).filter((t) => t.time.startsWith(time.split(':')[0]));
                  
                  return (
                    <td key={day} className="p-1">
                      <div
                        onClick={() => handleDateClick(dayNum)}
                        className="min-h-12 rounded border border-border hover:border-primary cursor-pointer transition-all"
                      >
                        <div className="space-y-0.5 p-1">
                          {tasksAtTime
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((task) => (
                              <div
                                key={task.id}
                                className={`p-1 text-xs rounded border ${getTypeColor(task.type)} truncate`}
                              >
                                {task.title}
                              </div>
                            ))}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDayView = () => {
    const timeSlots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);
    const dayTasks = getTasksForDate(selectedDate.getDate());

    return (
      <div className="space-y-2">
        {timeSlots.map((time) => {
          const tasksAtTime = dayTasks
            .filter((t) => t.time.startsWith(time.split(':')[0]))
            .sort((a, b) => a.time.localeCompare(b.time));
          
          return (
            <div key={time} className="flex gap-4">
              <div className="w-16 text-sm text-muted-foreground">{time}</div>
              <div className="flex-1">
                {tasksAtTime.length > 0 ? (
                  <div className="space-y-2">
                    {tasksAtTime.map((task) => (
                      <Card key={task.id} className={`p-3 border ${getTypeColor(task.type)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ответственный: {task.assignee}
                            </p>
                            {task.comment && (
                              <p className="text-xs mt-2 p-2 bg-background/50 rounded">
                                💬 {task.comment}
                              </p>
                            )}
                          </div>
                          {task.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => {
                                const comment = prompt('Добавить комментарий:');
                                if (comment !== null) {
                                  onTaskComplete(task.id, comment);
                                }
                              }}
                              className="gradient-purple text-white"
                            >
                              <Icon name="Check" size={14} className="mr-1" />
                              Выполнить
                            </Button>
                          )}
                          {task.status === 'completed' && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Выполнено
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => handleDateClick(selectedDate.getDate())}
                    className="h-12 rounded border-2 border-dashed border-border hover:border-primary cursor-pointer transition-all flex items-center justify-center text-sm text-muted-foreground"
                  >
                    Нажмите для создания задачи
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <h3 className="text-xl font-semibold">Январь 2026</h3>
          <Button variant="outline" size="icon">
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
            className={view === 'day' ? 'gradient-purple text-white' : ''}
          >
            День
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
            className={view === 'week' ? 'gradient-purple text-white' : ''}
          >
            Неделя
          </Button>
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
            className={view === 'month' ? 'gradient-purple text-white' : ''}
          >
            Месяц
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-card border-border">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </Card>

      <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 mt-4">
        <div className="flex items-start gap-3">
          <div className="bg-purple-500/20 p-2 rounded-lg">
            <Icon name="Sparkles" size={20} className="text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-2">💡 Рекомендации от ИИ</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>У вас 3 задачи на завтра — рекомендую начать с "Позвонить клиенту" в 16:00</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Встреча с командой в 10:00 может пересечься с другой задачей — перенести на 11:00?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Максим Петров выполнил 5 задач на этой неделе — отличная работа! 🎉</span>
              </li>
            </ul>
            <Button size="sm" variant="ghost" className="mt-3 text-purple-400 hover:text-purple-300">
              Показать больше рекомендаций
              <Icon name="ChevronRight" size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {renderDayDialog()}
    </div>
  );
};

export default TaskCalendar;