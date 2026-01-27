import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type DayEfficiencyProps = {
  tasks: any[];
};

const DayEfficiency = ({ tasks }: DayEfficiencyProps) => {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date === today);
  const completedTasks = todayTasks.filter(task => task.status === 'completed');
  
  const totalTasks = todayTasks.length;
  const completed = completedTasks.length;
  const efficiency = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
  
  const getEfficiencyColor = () => {
    if (efficiency >= 80) return { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'TrendingUp' };
    if (efficiency >= 50) return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'Minus' };
    return { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', icon: 'TrendingDown' };
  };

  const getEfficiencyLabel = () => {
    if (efficiency >= 80) return 'Отличный день';
    if (efficiency >= 50) return 'Неплохо';
    if (totalTasks === 0) return 'Нет задач на сегодня';
    return 'Есть над чем поработать';
  };

  const colors = getEfficiencyColor();

  return (
    <Card className={`p-4 border ${colors.border} ${colors.bg} transition-all`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <Icon name={colors.icon as any} size={24} className={colors.text} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Эффективность дня</p>
            <p className={`text-2xl font-bold ${colors.text}`}>{efficiency}%</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium">{getEfficiencyLabel()}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="CheckCircle2" size={14} className="text-green-400" />
              {completed}
            </span>
            <span>/</span>
            <span className="flex items-center gap-1">
              <Icon name="Circle" size={14} />
              {totalTasks}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors.text === 'text-green-400' ? 'bg-green-500' : colors.text === 'text-yellow-400' ? 'bg-yellow-500' : 'bg-red-500'} transition-all duration-500`}
          style={{ width: `${efficiency}%` }}
        />
      </div>
    </Card>
  );
};

export default DayEfficiency;
