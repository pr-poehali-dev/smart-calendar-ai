import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

type Notification = {
  id: string;
  type: 'task_completed' | 'task_assigned' | 'comment' | 'reminder';
  title: string;
  message: string;
  from: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Задача выполнена',
    message: 'Максим Петров выполнил задачу "Позвонить клиенту". Комментарий: Клиент согласен на встречу',
    from: 'МП',
    time: '5 мин назад',
    read: false,
  },
  {
    id: '2',
    type: 'task_assigned',
    title: 'Новая задача',
    message: 'Анна Смирнова назначила вам задачу "Подготовить презентацию" на 18 января',
    from: 'АС',
    time: '1 час назад',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    title: 'Новый комментарий',
    message: 'Елена Иванова оставила комментарий к задаче "Разработать дизайн главной страницы"',
    from: 'ЕИ',
    time: '2 часа назад',
    read: true,
  },
];

const NotificationPanel = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return 'CheckCircle';
      case 'task_assigned': return 'UserPlus';
      case 'comment': return 'MessageSquare';
      case 'reminder': return 'Bell';
      default: return 'Bell';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'task_completed': return 'text-green-400';
      case 'task_assigned': return 'text-blue-400';
      case 'comment': return 'text-purple-400';
      case 'reminder': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon name="Bell" size={24} />
              Уведомления
            </span>
            {unreadCount > 0 && (
              <Badge className="gradient-purple text-white">{unreadCount} новых</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Ваши последние уведомления о задачах и комментариях
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 cursor-pointer transition-all hover:border-primary ${
                !notification.read ? 'bg-purple-500/5 border-purple-500/30' : 'bg-card'
              }`}
            >
              <div className="flex gap-3">
                <div className={`mt-1 ${getColor(notification.type)}`}>
                  <Icon name={getIcon(notification.type) as any} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="gradient-blue text-white text-xs">
                        {notification.from}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    {!notification.read && (
                      <Button size="sm" variant="ghost" className="h-6 text-xs">
                        Отметить прочитанным
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            Отметить все прочитанными
          </Button>
          <Button variant="outline" className="flex-1">
            Настройки уведомлений
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;