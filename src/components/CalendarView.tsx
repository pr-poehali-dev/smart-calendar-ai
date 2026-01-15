import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  suggestedBy: 'ai' | 'manual';
};

type CalendarViewProps = {
  meetings: Meeting[];
};

const CalendarView = ({ meetings }: CalendarViewProps) => {
  return (
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
  );
};

export default CalendarView;
