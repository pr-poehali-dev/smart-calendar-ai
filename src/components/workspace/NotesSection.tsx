import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  tags: string[];
  createdAt: string;
  pinned: boolean;
};

const NotesSection = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Идеи для проекта',
      content: 'Добавить интеграцию с календарём\nУлучшить дизайн дашборда\nДобавить темы оформления',
      color: 'yellow',
      tags: ['работа', 'идеи'],
      createdAt: '2026-01-15',
      pinned: true,
    },
    {
      id: '2',
      title: 'Список покупок',
      content: 'Молоко\nХлеб\nЯйца\nФрукты',
      color: 'blue',
      tags: ['личное'],
      createdAt: '2026-01-14',
      pinned: false,
    },
    {
      id: '3',
      title: 'Встреча с клиентом',
      content: 'Обсудить новые требования\nПодготовить презентацию\nСогласовать сроки',
      color: 'green',
      tags: ['работа', 'встречи'],
      createdAt: '2026-01-13',
      pinned: false,
    },
  ]);

  const colors = [
    { name: 'yellow', class: 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500' },
    { name: 'blue', class: 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500' },
    { name: 'green', class: 'bg-green-500/10 border-green-500/30 hover:border-green-500' },
    { name: 'purple', class: 'bg-purple-500/10 border-purple-500/30 hover:border-purple-500' },
    { name: 'pink', class: 'bg-pink-500/10 border-pink-500/30 hover:border-pink-500' },
  ];

  const getColorClass = (color: string) => {
    return colors.find((c) => c.name === color)?.class || colors[0].class;
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setDialogOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedNote(null);
    setNoteTitle('');
    setNoteContent('');
    setDialogOpen(true);
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Ваш браузер не поддерживает голосовой ввод');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      setNoteContent((prev) => prev + (prev ? '\n' : '') + transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();

    setTimeout(() => {
      recognition.stop();
    }, 10000);
  };

  const handlePinToggle = (noteId: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Заметки</h2>
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('grid')}
          >
            <Icon name="LayoutGrid" size={16} className="mr-2" />
            Сетка
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('list')}
          >
            <Icon name="List" size={16} className="mr-2" />
            Список
          </Button>
          <Button className="gradient-purple text-white" onClick={handleCreateNew}>
            <Icon name="Plus" size={16} className="mr-2" />
            Новая заметка
          </Button>
        </div>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск заметок..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className={`p-4 cursor-pointer transition-all hover-scale border ${getColorClass(note.color)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 -mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinToggle(note.id);
                  }}
                >
                  <Icon
                    name="Pin"
                    size={16}
                    className={note.pinned ? 'text-purple-400' : 'text-muted-foreground'}
                  />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4 mb-3">
                {note.content}
              </p>
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className={`p-4 cursor-pointer transition-all hover:border-primary border ${getColorClass(note.color)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{note.title}</h3>
                    {note.pinned && (
                      <Icon name="Pin" size={14} className="text-purple-400" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {note.content.split('\n')[0]}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(note.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNote ? 'Редактировать заметку' : 'Новая заметка'}</DialogTitle>
            <DialogDescription>
              Создайте или отредактируйте заметку. Используйте голосовой ввод для удобства
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Заголовок заметки"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <div className="relative">
              <textarea
                placeholder="Содержимое заметки..."
                className="w-full h-64 p-3 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute bottom-2 right-2 ${
                  isRecording ? 'bg-red-500/20 text-red-400 animate-pulse' : ''
                }`}
                onClick={startVoiceRecording}
                disabled={isRecording}
              >
                <Icon name="Mic" size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Цвет:</span>
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 hover-scale ${color.class}`}
                />
              ))}
            </div>
            <Input placeholder="Теги (через запятую)" />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Отмена
              </Button>
              <Button className="gradient-purple text-white">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesSection;