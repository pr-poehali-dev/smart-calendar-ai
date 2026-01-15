import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Task = {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
};

type TasksViewProps = {
  tasks: Task[];
};

const TasksView = ({ tasks }: TasksViewProps) => {
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
  );
};

export default TasksView;
