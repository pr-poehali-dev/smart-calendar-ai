import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type ImportantDate = {
  id: string;
  title: string;
  date: string;
  type: 'birthday' | 'holiday' | 'anniversary' | 'other';
  daysUntil: number;
};

const ImportantDatesView = () => {
  const [dates, setDates] = useState<ImportantDate[]>([
    { id: '1', title: 'День рождения мамы', date: '2026-02-15', type: 'birthday', daysUntil: 31 },
    { id: '2', title: 'Годовщина свадьбы', date: '2026-03-20', type: 'anniversary', daysUntil: 64 },
    { id: '3', title: 'День рождения коллеги', date: '2026-01-25', type: 'birthday', daysUntil: 10 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDate, setNewDate] = useState({ title: '', date: '', type: 'birthday' as const });

  const calculateDaysUntil = (dateStr: string) => {
    const today = new Date('2026-01-15');
    const targetDate = new Date(dateStr);
    const diff = targetDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const addDate = () => {
    if (!newDate.title || !newDate.date) {
      toast.error('Заполните все поля');
      return;
    }

    const daysUntil = calculateDaysUntil(newDate.date);
    const date: ImportantDate = {
      id: Date.now().toString(),
      title: newDate.title,
      date: newDate.date,
      type: newDate.type,
      daysUntil,
    };

    setDates([...dates, date].sort((a, b) => a.daysUntil - b.daysUntil));
    setNewDate({ title: '', date: '', type: 'birthday' });
    setShowAddForm(false);
    toast.success('Дата добавлена');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'birthday': return 'Cake';
      case 'holiday': return 'Sparkles';
      case 'anniversary': return 'Heart';
      default: return 'Calendar';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'birthday': return 'text-pink-400';
      case 'holiday': return 'text-purple-400';
      case 'anniversary': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="grid gap-6 animate-fade-in">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Icon name="Calendar" size={28} className="text-purple-400" />
            Важные даты
          </h2>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gradient-purple text-white hover-scale">
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить дату
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-4 mb-6 bg-muted/50 border-border">
            <div className="space-y-4">
              <div>
                <Label>Название события</Label>
                <Input
                  value={newDate.title}
                  onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
                  placeholder="Например: День рождения Анны"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Дата</Label>
                <Input
                  type="date"
                  value={newDate.date}
                  onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Тип события</Label>
                <select
                  value={newDate.type}
                  onChange={(e) => setNewDate({ ...newDate, type: e.target.value as any })}
                  className="w-full mt-1 p-2 rounded-lg bg-background border border-border"
                >
                  <option value="birthday">День рождения</option>
                  <option value="holiday">Праздник</option>
                  <option value="anniversary">Годовщина</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={addDate} className="gradient-purple text-white">Добавить</Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">Отмена</Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {dates.map((date) => (
            <div
              key={date.id}
              className="p-5 rounded-lg bg-muted/50 border border-border hover:border-primary transition-all hover-scale"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Icon name={getTypeIcon(date.type) as any} size={32} className={getTypeColor(date.type)} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{date.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(date.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <div className="mt-2">
                      {date.daysUntil <= 7 ? (
                        <span className="text-sm font-medium text-red-400">🔥 Через {date.daysUntil} дней!</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Через {date.daysUntil} дней</span>
                      )}
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
  );
};

export default ImportantDatesView;
