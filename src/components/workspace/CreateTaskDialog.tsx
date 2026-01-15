import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type CreateTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  date: string;
  onTaskCreate: (task: any) => void;
};

const teamMembers = [
  { id: '1', name: 'Анна Смирнова', initials: 'АС' },
  { id: '2', name: 'Максим Петров', initials: 'МП' },
  { id: '3', name: 'Елена Иванова', initials: 'ЕИ' },
  { id: '4', name: 'Вы', initials: 'ЮР' },
];

const CreateTaskDialog = ({ open, onClose, date, onTaskCreate }: CreateTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('10:00');
  const [type, setType] = useState<'personal' | 'work' | 'reminder'>('work');
  const [assignee, setAssignee] = useState(teamMembers[3].initials);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAssigneeList, setShowAssigneeList] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'ru-RU';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTitle((prev) => prev + ' ' + transcript);
        setIsRecording(false);
        toast.success('Голосовой ввод распознан');
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
        toast.error('Ошибка распознавания речи');
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    } else {
      toast.error('Голосовой ввод не поддерживается в этом браузере');
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error('Введите название задачи');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      date,
      time,
      type,
      assignee,
      status: 'pending',
      createdBy: 'ЮР',
      description,
    };

    onTaskCreate(task);
    
    const assigneeName = teamMembers.find(m => m.initials === assignee)?.name || 'пользователь';
    if (assignee !== 'ЮР') {
      toast.success(`Задача создана и отправлена ${assigneeName}`);
    } else {
      toast.success('Задача создана');
    }

    setTitle('');
    setDescription('');
    setTime('10:00');
    setType('work');
    setAssignee(teamMembers[3].initials);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Plus" size={24} />
            Создать задачу на {new Date(date).toLocaleDateString('ru-RU')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Название задачи</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Позвонить клиенту"
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                onClick={isRecording ? stopVoiceInput : startVoiceInput}
                className={isRecording ? 'bg-red-500 hover:bg-red-600' : 'gradient-purple'}
              >
                <Icon name={isRecording ? 'MicOff' : 'Mic'} size={18} />
              </Button>
            </div>
            {isRecording && (
              <p className="text-xs text-purple-400 mt-1 animate-pulse">
                🎤 Слушаю... Говорите сейчас
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Время</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Тип задачи</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full mt-1 p-2 rounded-lg border border-border bg-background"
              >
                <option value="personal">Личная</option>
                <option value="work">Работа</option>
                <option value="reminder">Напоминание</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Ответственный</Label>
            <div className="relative mt-1">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowAssigneeList(!showAssigneeList)}
              >
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarFallback className="gradient-purple text-white text-xs">
                    {assignee}
                  </AvatarFallback>
                </Avatar>
                {teamMembers.find((m) => m.initials === assignee)?.name}
                <Icon name="ChevronDown" size={16} className="ml-auto" />
              </Button>

              {showAssigneeList && (
                <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-10">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setAssignee(member.initials);
                        setShowAssigneeList(false);
                      }}
                      className="flex items-center gap-2 p-3 hover:bg-muted cursor-pointer transition-all"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="gradient-blue text-white text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Описание (необязательно)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Дополнительная информация о задаче..."
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCreate} className="flex-1 gradient-purple text-white">
              <Icon name="Check" size={18} className="mr-2" />
              Создать задачу
            </Button>
            <Button onClick={onClose} variant="outline">
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
