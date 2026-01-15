import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Document = {
  id: string;
  title: string;
  folder: string;
  lastEdited: string;
  editedBy: string;
  emoji: string;
};

const DocsSection = () => {
  const docs: Document[] = [
    { id: '1', title: 'Техническое задание', folder: 'Проекты', lastEdited: '2 часа назад', editedBy: 'АС', emoji: '📋' },
    { id: '2', title: 'База знаний команды', folder: 'Общее', lastEdited: '1 день назад', editedBy: 'МП', emoji: '📚' },
    { id: '3', title: 'API Documentation', folder: 'Разработка', lastEdited: '3 дня назад', editedBy: 'ЕИ', emoji: '⚙️' },
    { id: '4', title: 'Маркетинговая стратегия', folder: 'Маркетинг', lastEdited: '1 неделю назад', editedBy: 'АС', emoji: '📈' },
  ];

  const folders = ['Все документы', 'Проекты', 'Общее', 'Разработка', 'Маркетинг'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">База знаний</h2>
        <div className="flex gap-2">
          <Input placeholder="Поиск в документах..." className="w-64" />
          <Button className="gradient-purple text-white">
            <Icon name="Plus" size={18} className="mr-2" />
            Создать документ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-1 p-4 bg-card border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Icon name="Folder" size={18} />
            Папки
          </h3>
          <div className="space-y-1">
            {folders.map((folder) => (
              <Button
                key={folder}
                variant="ghost"
                className="w-full justify-start text-sm"
              >
                <Icon name="Folder" size={16} className="mr-2" />
                {folder}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="col-span-4 p-6 bg-card border-border">
          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-all hover-scale bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{doc.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="Folder" size={12} />
                          {doc.folder}
                        </span>
                        <span>•</span>
                        <span>Изменено {doc.lastEdited}</span>
                        <span>•</span>
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs gradient-blue text-white">
                            {doc.editedBy}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DocsSection;
