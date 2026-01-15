import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type AIMessage = {
  id: string;
  text: string;
  type: 'motivation' | 'warning' | 'praise';
  timestamp: string;
};

type AIAssistantProps = {
  productivity: number;
  tasksCompleted: number;
};

const AIAssistant = ({ productivity, tasksCompleted }: AIAssistantProps) => {
  const getAIMessage = (): AIMessage => {
    if (productivity >= 85) {
      return {
        id: '1',
        text: '🎉 Отличная работа! Вы показываете потрясающие результаты. Продуктивность на высшем уровне — так держать!',
        type: 'praise',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (productivity >= 60) {
      return {
        id: '2',
        text: '💪 Хорошая динамика! Вы на правильном пути. Ещё немного усилий, и результаты станут ещё лучше.',
        type: 'motivation',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
    } else {
      return {
        id: '3',
        text: '🌟 Вижу, что сегодня тяжеловато. Помните: каждый день — это новая возможность. Начните с малого: выберите одну задачу и сосредоточьтесь только на ней. Вы справитесь!',
        type: 'warning',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
    }
  };

  const message = getAIMessage();

  const getMessageStyle = () => {
    switch (message.type) {
      case 'praise':
        return 'gradient-purple/10 border-purple-500/30';
      case 'motivation':
        return 'gradient-blue/10 border-blue-500/30';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/30';
      default:
        return '';
    }
  };

  return (
    <Card className={`p-6 border-2 ${getMessageStyle()} animate-fade-in`}>
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12 gradient-purple">
          <AvatarFallback className="text-white text-xl">🤖</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">ИИ-Ассистент</h3>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">{message.text}</p>
          
          {productivity < 60 && (
            <div className="space-y-2 mt-4 p-3 rounded-lg bg-background/50">
              <p className="text-sm font-medium">💡 Советы для продуктивности:</p>
              <ul className="text-xs space-y-1 text-muted-foreground ml-4">
                <li>• Разбейте большие задачи на маленькие шаги</li>
                <li>• Сделайте короткий перерыв и вернитесь с новыми силами</li>
                <li>• Начните с самой лёгкой задачи для разогрева</li>
              </ul>
            </div>
          )}

          {productivity >= 85 && (
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="gradient-purple text-white">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Посмотреть статистику
              </Button>
              <Button size="sm" variant="outline">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться успехом
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AIAssistant;
