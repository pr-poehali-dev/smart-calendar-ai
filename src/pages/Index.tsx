import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type Task = {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
};

type TeamMember = {
  id: string;
  name: string;
  initials: string;
  availability: { day: string; slots: string[] }[];
};

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  suggestedBy: 'ai' | 'manual';
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'team' | 'meetings' | 'analytics'>('calendar');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Подготовить презентацию для клиента', priority: 'high', deadline: '2026-01-18', status: 'in-progress' },
    { id: '2', title: 'Проверить код новой фичи', priority: 'medium', deadline: '2026-01-20', status: 'pending' },
    { id: '3', title: 'Обновить документацию API', priority: 'low', deadline: '2026-01-25', status: 'pending' },
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Анна Смирнова',
      initials: 'АС',
      availability: [
        { day: '16 янв', slots: ['10:00', '14:00', '16:00'] },
        { day: '17 янв', slots: ['11:00', '15:00'] },
      ],
    },
    {
      id: '2',
      name: 'Максим Петров',
      initials: 'МП',
      availability: [
        { day: '16 янв', slots: ['10:00', '11:00', '14:00'] },
        { day: '17 янв', slots: ['10:00', '14:00', '16:00'] },
      ],
    },
    {
      id: '3',
      name: 'Елена Иванова',
      initials: 'ЕИ',
      availability: [
        { day: '16 янв', slots: ['10:00', '14:00'] },
        { day: '17 янв', slots: ['11:00', '15:00', '16:00'] },
      ],
    },
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: '1', title: 'Планирование спринта', date: '16 янв', time: '10:00', participants: ['1', '2', '3'], suggestedBy: 'ai' },
    { id: '2', title: 'Обсуждение дизайна', date: '17 янв', time: '15:00', participants: ['1', '3'], suggestedBy: 'manual' },
  ]);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<{ day: string; time: string }[]>([]);

  const findCommonSlots = () => {
    if (selectedMembers.length === 0) {
      toast.error('Выберите участников для встречи');
      return;
    }

    const selected = teamMembers.filter((m) => selectedMembers.includes(m.id));
    const commonSlots: { day: string; time: string }[] = [];

    const allDays = [...new Set(selected.flatMap((m) => m.availability.map((a) => a.day)))];

    allDays.forEach((day) => {
      const dayAvailability = selected.map((m) => m.availability.find((a) => a.day === day)?.slots || []);
      if (dayAvailability.length === selected.length) {
        const common = dayAvailability.reduce((acc, slots) => acc.filter((s) => slots.includes(s)));
        common.forEach((time) => commonSlots.push({ day, time }));
      }
    });

    setAiSuggestions(commonSlots);
    if (commonSlots.length > 0) {
      toast.success(`ИИ нашёл ${commonSlots.length} свободных слотов для встречи`);
    } else {
      toast.error('Нет общих свободных слотов у выбранных участников');
    }
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                SmartPlan AI
              </h1>
              <p className="text-muted-foreground mt-2">Умный планировщик с ИИ-ассистентом</p>
            </div>
            <Button className="gradient-purple text-white hover-scale">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать событие
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
              { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
              { id: 'team', label: 'Команда', icon: 'Users' },
              { id: 'meetings', label: 'Встречи', icon: 'Video' },
              { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className={`transition-all ${
                  activeTab === tab.id ? 'gradient-purple text-white' : 'hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon as any} size={18} className="mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </header>

        {activeTab === 'calendar' && (
          <div className="grid gap-6 animate-fade-in">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Январь 2026</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2;
                  const isCurrentMonth = day > 0 && day <= 31;
                  const isToday = day === 15;
                  const hasEvent = [16, 17, 20, 25].includes(day);

                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isCurrentMonth
                          ? 'border-border hover:border-primary bg-card'
                          : 'border-transparent bg-muted/30'
                      } ${isToday ? 'gradient-purple text-white font-bold' : ''} ${
                        hasEvent && !isToday ? 'border-purple-500/50' : ''
                      }`}
                    >
                      <div className="text-center">{isCurrentMonth ? day : ''}</div>
                      {hasEvent && !isToday && (
                        <div className="mt-1 w-2 h-2 rounded-full gradient-blue mx-auto"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Icon name="Clock" size={20} className="mr-2 text-blue-400" />
                  Предстоящие события
                </h3>
                <div className="space-y-3">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="p-4 rounded-lg bg-muted/50 border border-border hover-scale">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {meeting.date} в {meeting.time}
                          </p>
                        </div>
                        {meeting.suggestedBy === 'ai' && (
                          <Badge className="gradient-purple text-white text-xs">ИИ</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Icon name="TrendingUp" size={20} className="mr-2 text-purple-400" />
                  ИИ-рекомендации
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg gradient-purple/10 border border-purple-500/30">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={20} className="text-purple-400 mt-1" />
                      <div>
                        <p className="font-medium">Оптимизация расписания</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Перенесите встречу с 16:00 на 14:00 для большей продуктивности
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg gradient-blue/10 border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertCircle" size={20} className="text-blue-400 mt-1" />
                      <div>
                        <p className="font-medium">Перегрузка на неделе</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          На 20 января запланировано 5 встреч. Рекомендуем перенести 2 из них
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="grid gap-6 animate-fade-in">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Мои задачи</h2>
                <Button className="gradient-purple text-white hover-scale">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить задачу
                </Button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-5 rounded-lg bg-muted/50 border border-border hover:border-primary transition-all hover-scale"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          className="mt-1 w-5 h-5 rounded border-2 border-primary"
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{task.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={16} />
                              {new Date(task.deadline).toLocaleDateString('ru-RU')}
                            </span>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="grid gap-6 animate-fade-in">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-semibold mb-6">ИИ-подбор времени для встречи</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Выберите участников</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => toggleMember(member.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-scale ${
                          selectedMembers.includes(member.id)
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-border bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="gradient-purple text-white">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.availability.reduce((acc, day) => acc + day.slots.length, 0)} свободных слотов
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={findCommonSlots} className="gradient-purple text-white w-full hover-scale">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Найти оптимальное время с помощью ИИ
                </Button>

                {aiSuggestions.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Icon name="Sparkles" size={20} className="mr-2 text-purple-400" />
                      ИИ нашёл {aiSuggestions.length} подходящих слотов
                    </h3>
                    <div className="grid md:grid-cols-4 gap-3">
                      {aiSuggestions.map((slot, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg gradient-purple/10 border border-purple-500/30 hover:border-purple-500 cursor-pointer transition-all hover-scale"
                        >
                          <p className="font-medium">{slot.day}</p>
                          <p className="text-2xl font-bold mt-1">{slot.time}</p>
                          <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white">
                            Выбрать
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid gap-6 animate-fade-in">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Команда</h2>
                <Button className="gradient-purple text-white hover-scale">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Добавить участника
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="p-5 bg-muted/50 border-border hover:border-primary transition-all hover-scale">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="gradient-blue text-white text-lg">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {member.availability.reduce((acc, day) => acc + day.slots.length, 0)} свободных слотов
                        </p>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-2">Ближайшая доступность:</p>
                          {member.availability.slice(0, 2).map((day, idx) => (
                            <div key={idx} className="text-xs mb-1">
                              <span className="font-medium">{day.day}:</span>{' '}
                              <span className="text-muted-foreground">{day.slots.join(', ')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid gap-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Выполнено задач</h3>
                  <Icon name="CheckCircle" size={24} className="text-green-400" />
                </div>
                <p className="text-4xl font-bold">24</p>
                <p className="text-sm text-muted-foreground mt-2">+8 за эту неделю</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Встречи</h3>
                  <Icon name="Video" size={24} className="text-blue-400" />
                </div>
                <p className="text-4xl font-bold">12</p>
                <p className="text-sm text-muted-foreground mt-2">Запланировано на неделю</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Продуктивность</h3>
                  <Icon name="TrendingUp" size={24} className="text-purple-400" />
                </div>
                <p className="text-4xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground mt-2">+5% к прошлой неделе</p>
              </Card>
            </div>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-6">Загрузка на неделю</h3>
              <div className="space-y-4">
                {[
                  { day: 'Пн', load: 85 },
                  { day: 'Вт', load: 70 },
                  { day: 'Ср', load: 95 },
                  { day: 'Чт', load: 60 },
                  { day: 'Пт', load: 75 },
                ].map((item) => (
                  <div key={item.day} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-8">{item.day}</span>
                    <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          item.load > 80 ? 'bg-red-500' : item.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${item.load}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{item.load}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-4">Рекомендации ИИ</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg gradient-purple/10 border border-purple-500/30">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertTriangle" size={20} className="text-purple-400 mt-1" />
                    <div>
                      <p className="font-medium">Перегрузка в среду</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Рекомендуем перенести 2 задачи на четверг или пятницу
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg gradient-blue/10 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={20} className="text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium">Оптимальное время для задач</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ваш пик продуктивности: 10:00-12:00. Планируйте сложные задачи на это время
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
