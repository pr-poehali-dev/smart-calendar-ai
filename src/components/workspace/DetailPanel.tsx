import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

type DetailPanelProps = {
  type: 'task' | 'deal' | 'doc' | null;
  data: any;
  onClose: () => void;
};

const DetailPanel = ({ type, data, onClose }: DetailPanelProps) => {
  if (!type || !data) return null;

  const renderTaskDetail = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Input
            defaultValue={data.title}
            className="text-xl font-semibold border-0 px-0 focus-visible:ring-0"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Статус</label>
          <select className="w-full p-2 rounded-lg border border-border bg-background">
            <option value="todo">К выполнению</option>
            <option value="in-progress" selected>В работе</option>
            <option value="done">Выполнено</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Приоритет</label>
          <select className="w-full p-2 rounded-lg border border-border bg-background">
            <option value="low">Низкий</option>
            <option value="medium" selected>Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Исполнитель</label>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="gradient-purple text-white text-xs">
              {data.assignee}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Срок</label>
        <Input type="date" defaultValue={data.dueDate} />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Метки</label>
        <div className="flex flex-wrap gap-2">
          {data.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
              <Icon name="X" size={12} className="ml-1 cursor-pointer" />
            </Badge>
          ))}
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Описание</label>
        <Textarea
          placeholder="Добавьте описание задачи..."
          rows={6}
          className="resize-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block flex items-center justify-between">
          <span>Подзадачи</span>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm">Подготовить макеты</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <input type="checkbox" className="w-4 h-4" checked />
            <span className="text-sm line-through text-muted-foreground">Согласовать концепцию</span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block flex items-center justify-between">
          <span>Комментарии ({data.comments})</span>
        </label>
        <div className="space-y-3">
          <Card className="p-3 bg-muted/50">
            <div className="flex items-start gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="gradient-blue text-white text-xs">АС</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Анна Смирнова</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Начала работу над макетами, будут готовы завтра
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 часа назад</p>
              </div>
            </div>
          </Card>
          <div className="flex gap-2">
            <Input placeholder="Написать комментарий..." />
            <Button size="icon" className="gradient-purple text-white">
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block flex items-center justify-between">
          <span>Вложения ({data.attachments})</span>
          <Button variant="ghost" size="sm">
            <Icon name="Paperclip" size={16} className="mr-1" />
            Добавить
          </Button>
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded border border-border hover:border-primary cursor-pointer">
            <Icon name="FileText" size={20} className="text-blue-400" />
            <div className="flex-1">
              <p className="text-sm font-medium">Техническое задание.pdf</p>
              <p className="text-xs text-muted-foreground">2.4 MB</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDealDetail = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Input
            defaultValue={data.title}
            className="text-xl font-semibold border-0 px-0 focus-visible:ring-0"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Сумма</label>
          <Input type="number" defaultValue={data.amount} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Вероятность</label>
          <Input type="number" defaultValue={data.probability} />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Компания</label>
        <Input defaultValue={data.company} />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Этап</label>
        <select className="w-full p-2 rounded-lg border border-border bg-background">
          <option value="contact">Первый контакт</option>
          <option value="proposal">Предложение</option>
          <option value="negotiation" selected>Переговоры</option>
          <option value="closed">Закрыто</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Контактное лицо</label>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="gradient-purple text-white text-xs">
              {data.contact}
            </AvatarFallback>
          </Avatar>
          <Input placeholder="Имя контакта" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Ожидаемая дата закрытия</label>
        <Input type="date" defaultValue={data.dueDate} />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">История активности</label>
        <div className="space-y-2">
          <Card className="p-3 bg-muted/50">
            <div className="flex items-start gap-2">
              <Icon name="Phone" size={16} className="text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">Звонок с клиентом</p>
                <p className="text-xs text-muted-foreground mt-1">Вчера в 15:30</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 bg-muted/50">
            <div className="flex items-start gap-2">
              <Icon name="Mail" size={16} className="text-purple-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">Отправлено коммерческое предложение</p>
                <p className="text-xs text-muted-foreground mt-1">3 дня назад</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderDocDetail = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.emoji}</span>
          <Input
            defaultValue={data.title}
            className="text-xl font-semibold border-0 px-0 focus-visible:ring-0"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
        <span className="text-sm text-muted-foreground">Последнее изменение: {data.lastEdited}</span>
        <Avatar className="w-6 h-6">
          <AvatarFallback className="gradient-blue text-white text-xs">
            {data.editedBy}
          </AvatarFallback>
        </Avatar>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Папка</label>
        <select className="w-full p-2 rounded-lg border border-border bg-background">
          <option>Проекты</option>
          <option>Общее</option>
          <option>Разработка</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Доступ</label>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Users" size={16} className="mr-2" />
            Доступ для команды
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Link" size={16} className="mr-2" />
            Создать публичную ссылку
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">История версий</label>
        <div className="space-y-2">
          <Card className="p-3 bg-muted/50 cursor-pointer hover:border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Текущая версия</p>
                <p className="text-xs text-muted-foreground">Изменено 2 часа назад</p>
              </div>
              <Badge className="gradient-purple text-white">Актуальная</Badge>
            </div>
          </Card>
          <Card className="p-3 bg-muted/50 cursor-pointer hover:border-primary">
            <div>
              <p className="text-sm font-medium">Версия от 14 января</p>
              <p className="text-xs text-muted-foreground">Изменено Максим Петров</p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Связанные задачи</label>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="CheckSquare" size={16} className="mr-2" />
            Разработать дизайн главной страницы
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Icon name="Plus" size={16} className="mr-2" />
            Связать с задачей
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <aside className="fixed right-0 top-16 bottom-0 w-96 bg-card border-l border-border overflow-y-auto z-40 animate-slide-in-right">
      <div className="p-6">
        {type === 'task' && renderTaskDetail()}
        {type === 'deal' && renderDealDetail()}
        {type === 'doc' && renderDocDetail()}
      </div>
    </aside>
  );
};

export default DetailPanel;
