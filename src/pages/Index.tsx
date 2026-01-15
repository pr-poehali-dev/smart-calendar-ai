import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import CalendarView from '@/components/CalendarView';
import TasksView from '@/components/TasksView';
import MeetingsView from '@/components/MeetingsView';
import TeamAnalyticsView from '@/components/TeamAnalyticsView';
import SettingsDialog from '@/components/SettingsDialog';
import AIAssistant from '@/components/AIAssistant';
import ImportantDatesView from '@/components/ImportantDatesView';
import NotesView from '@/components/NotesView';

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
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'team' | 'meetings' | 'analytics' | 'dates' | 'notes'>('calendar');
  const [productivity, setProductivity] = useState(87);
  const [tasksCompleted, setTasksCompleted] = useState(24);
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
            <div className="flex gap-2">
              <SettingsDialog onThemeChange={(theme) => console.log('Theme changed:', theme)} />
              <Button className="gradient-purple text-white hover-scale">
                <Icon name="Plus" size={20} className="mr-2" />
                Создать событие
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
              { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
              { id: 'meetings', label: 'Встречи', icon: 'Video' },
              { id: 'dates', label: 'Важные даты', icon: 'Cake' },
              { id: 'notes', label: 'Заметки', icon: 'StickyNote' },
              { id: 'team', label: 'Команда', icon: 'Users' },
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

        <AIAssistant productivity={productivity} tasksCompleted={tasksCompleted} />

        {activeTab === 'calendar' && <CalendarView meetings={meetings} />}

        {activeTab === 'tasks' && <TasksView tasks={tasks} />}

        {activeTab === 'meetings' && (
          <MeetingsView
            teamMembers={teamMembers}
            selectedMembers={selectedMembers}
            aiSuggestions={aiSuggestions}
            onToggleMember={toggleMember}
            onFindSlots={findCommonSlots}
          />
        )}

        {activeTab === 'team' && <TeamAnalyticsView teamMembers={teamMembers} viewType="team" />}

        {activeTab === 'analytics' && <TeamAnalyticsView teamMembers={teamMembers} viewType="analytics" />}

        {activeTab === 'dates' && <ImportantDatesView />}

        {activeTab === 'notes' && <NotesView />}
      </div>
    </div>
  );
};

export default Index;