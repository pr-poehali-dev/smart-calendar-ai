import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Event = {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'event';
};

const TimeSection = () => {
  const events: Event[] = [
    { id: '1', title: 'Планирование спринта', time: '10:00', duration: '1ч', type: 'meeting' },
    { id: '2', title: 'Работа над дизайном', time: '11:00', duration: '2ч', type: 'task' },
    { id: '3', title: 'Обед с клиентом', time: '13:00', duration: '1ч 30м', type: 'event' },
    { id: '4', title: 'Код-ревью', time: '15:00', duration: '45м', type: 'meeting' },
  ];

  const weekDays = ['Пн 13', 'Вт 14', 'Ср 15', 'Чт 16', 'Пт 17', 'Сб 18', 'Вс 19'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${9 + i}:00`);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'task': return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'event': return 'bg-green-500/20 border-green-500/30 text-green-400';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Календарь и время</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <Button variant="outline">Сегодня</Button>
          <Button variant="outline">
            <Icon name="ChevronRight" size={18} />
          </Button>
          <Button className="gradient-purple text-white">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить событие
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Часов сегодня</span>
            <Icon name="Clock" size={18} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold">6.5ч</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Встреч</span>
            <Icon name="Video" size={18} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold">4</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Загрузка</span>
            <Icon name="TrendingUp" size={18} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold">85%</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Свободно</span>
            <Icon name="Coffee" size={18} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold">1.5ч</p>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-1 p-4 bg-card border-border">
          <h3 className="font-semibold mb-4">Сегодня</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event.type)}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-4 p-4 bg-card border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-sm font-medium">Время</th>
                  {weekDays.map((day) => (
                    <th key={day} className="text-center p-2 text-sm font-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="border-t border-border">
                    <td className="p-2 text-xs text-muted-foreground">{time}</td>
                    {weekDays.map((day) => (
                      <td key={day} className="p-1">
                        <div className="h-12 rounded border border-border hover:border-primary cursor-pointer transition-all" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TimeSection;
