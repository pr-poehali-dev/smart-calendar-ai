import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
};

const colors = [
  { name: 'Фиолетовый', value: 'bg-purple-500/20 border-purple-500/30' },
  { name: 'Синий', value: 'bg-blue-500/20 border-blue-500/30' },
  { name: 'Зелёный', value: 'bg-green-500/20 border-green-500/30' },
  { name: 'Жёлтый', value: 'bg-yellow-500/20 border-yellow-500/30' },
  { name: 'Розовый', value: 'bg-pink-500/20 border-pink-500/30' },
];

const NotesView = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Идея для проекта',
      content: 'Добавить интеграцию с календарями Google и Outlook для автоматической синхронизации событий',
      color: colors[0].value,
      createdAt: '2026-01-15T10:30',
    },
    {
      id: '2',
      title: 'Список покупок',
      content: 'Молоко, хлеб, яйца, сыр, овощи на неделю',
      color: colors[2].value,
      createdAt: '2026-01-14T15:20',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: colors[0].value });
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('Заполните заголовок и текст заметки');
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      color: newNote.color,
      createdAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', color: colors[0].value });
    setShowAddForm(false);
    toast.success('Заметка добавлена');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    toast.success('Заметка удалена');
  };

  return (
    <div className="grid gap-6 animate-fade-in">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Icon name="StickyNote" size={28} className="text-purple-400" />
            Заметки
          </h2>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gradient-purple text-white hover-scale">
            <Icon name="Plus" size={20} className="mr-2" />
            Новая заметка
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-4 mb-6 bg-muted/50 border-border">
            <div className="space-y-4">
              <Input
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Заголовок заметки"
              />
              <Textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Напишите вашу идею или мысль..."
                rows={4}
              />
              <div>
                <p className="text-sm mb-2">Цвет заметки:</p>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      onClick={() => setNewNote({ ...newNote, color: color.value })}
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all hover-scale ${color.value} ${
                        newNote.color === color.value ? 'ring-2 ring-white' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={addNote} className="gradient-purple text-white">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">Отмена</Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className={`p-4 border-2 ${note.color} hover-scale cursor-pointer transition-all`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <Button
                  onClick={() => deleteNote(note.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-1 -mr-1"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
              <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(note.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotesView;
