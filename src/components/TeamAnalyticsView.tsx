import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type TeamMember = {
  id: string;
  name: string;
  initials: string;
  availability: { day: string; slots: string[] }[];
};

type TeamAnalyticsViewProps = {
  teamMembers: TeamMember[];
  viewType: 'team' | 'analytics';
};

const TeamAnalyticsView = ({ teamMembers, viewType }: TeamAnalyticsViewProps) => {
  if (viewType === 'team') {
    return (
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
    );
  }

  return (
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
  );
};

export default TeamAnalyticsView;
