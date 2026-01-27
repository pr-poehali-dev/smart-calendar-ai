import { useState, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';

type RescheduleDialogProps = {
  open: boolean;
  onClose: () => void;
  onReschedule: (newDate: string) => void;
  taskTitle: string;
  currentDate: string;
};

const RescheduleDialog = ({ open, onClose, onReschedule, taskTitle, currentDate }: RescheduleDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentDate));

  const handleConfirm = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      onReschedule(dateStr);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            Перенести задачу
          </DialogTitle>
          <DialogDescription>
            Выберите новую дату для задачи "{taskTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Текущая дата</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(currentDate).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>

          <div>
            <Label>Новая дата</Label>
            <div className="mt-2 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-lg border border-border"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConfirm} className="flex-1 gradient-purple text-white" disabled={!selectedDate}>
              <Icon name="Check" size={18} className="mr-2" />
              Перенести
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

export default memo(RescheduleDialog);