import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AnalyticsSection = () => {
  const teamLoad = [
    { name: 'Анна Смирнова', initials: 'АС', hours: 42, tasks: 12, efficiency: 95 },
    { name: 'Максим Петров', initials: 'МП', hours: 38, tasks: 8, efficiency: 88 },
    { name: 'Елена Иванова', initials: 'ЕИ', hours: 35, tasks: 10, efficiency: 92 },
  ];

  const projectStatus = [
    { name: 'Корпоративный сайт', progress: 75, tasks: 24, completed: 18 },
    { name: 'Мобильное приложение', progress: 45, tasks: 32, completed: 14 },
    { name: 'CRM система', progress: 90, tasks: 16, completed: 14 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Аналитика</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={18} className="mr-2" />
            Экспорт
          </Button>
          <Button className="gradient-purple text-white">
            <Icon name="Plus" size={18} className="mr-2" />
            Создать отчёт
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Задач выполнено</span>
            <Icon name="CheckCircle" size={18} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold">46</p>
          <p className="text-xs text-green-400 mt-1">+12% за неделю</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Часов отработано</span>
            <Icon name="Clock" size={18} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold">115</p>
          <p className="text-xs text-blue-400 mt-1">+8% за неделю</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Эффективность</span>
            <Icon name="TrendingUp" size={18} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold">92%</p>
          <p className="text-xs text-purple-400 mt-1">+5% за неделю</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Активных проектов</span>
            <Icon name="Briefcase" size={18} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-xs text-muted-foreground mt-1">без изменений</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 bg-card border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="Users" size={20} />
            Загрузка команды
          </h3>
          <div className="space-y-4">
            {teamLoad.map((member) => (
              <div key={member.initials} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="gradient-purple text-white text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.tasks} задач • {member.hours}ч</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{member.efficiency}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-purple transition-all"
                    style={{ width: `${member.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="Briefcase" size={20} />
            Статус проектов
          </h3>
          <div className="space-y-4">
            {projectStatus.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.completed} из {project.tasks} задач
                    </p>
                  </div>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      project.progress >= 80
                        ? 'bg-green-500'
                        : project.progress >= 50
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Icon name="BarChart3" size={20} />
          Динамика выполнения задач
        </h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {[12, 18, 15, 22, 28, 25, 30].map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full gradient-purple rounded-t-lg transition-all hover-scale" style={{ height: `${(value / 30) * 100}%` }} />
              <span className="text-xs text-muted-foreground">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][idx]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
