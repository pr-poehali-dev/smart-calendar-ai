import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Theme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

const themes: Theme[] = [
  { name: 'Фиолетовый', primary: '#a855f7', secondary: '#ec4899', accent: '#3b82f6', background: '#0f0f23' },
  { name: 'Синий', primary: '#3b82f6', secondary: '#06b6d4', accent: '#8b5cf6', background: '#0a1929' },
  { name: 'Зелёный', primary: '#10b981', secondary: '#34d399', accent: '#14b8a6', background: '#0a2f1f' },
  { name: 'Оранжевый', primary: '#f97316', secondary: '#fb923c', accent: '#f59e0b', background: '#2d1b0f' },
  { name: 'Розовый', primary: '#ec4899', secondary: '#f472b6', accent: '#a855f7', background: '#2d0f2d' },
];

type SettingsDialogProps = {
  onThemeChange: (theme: Theme) => void;
};

const SettingsDialog = ({ onThemeChange }: SettingsDialogProps) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [open, setOpen] = useState(false);

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    toast.success(`Тема "${theme.name}" применена`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="hover-scale">
          <Icon name="Settings" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Palette" size={24} />
            Настройки темы
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Label className="text-base">Выберите цветовую схему</Label>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <div
                key={theme.name}
                onClick={() => applyTheme(theme)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-scale ${
                  selectedTheme.name === theme.name ? 'border-purple-500 bg-purple-500/10' : 'border-border'
                }`}
              >
                <p className="font-medium mb-3">{theme.name}</p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.primary }} />
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
