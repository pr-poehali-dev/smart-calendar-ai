import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Theme = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  preview: string[];
};

type MenuPosition = 'top' | 'bottom' | 'left' | 'right';

const themes: Theme[] = [
  {
    id: 'cosmic-purple',
    name: 'Космический пурпур',
    colors: { primary: '#a855f7', secondary: '#7c3aed', accent: '#ec4899' },
    preview: ['bg-purple-500', 'bg-purple-600', 'bg-pink-500']
  },
  {
    id: 'ocean-blue',
    name: 'Океанский синий',
    colors: { primary: '#0ea5e9', secondary: '#0284c7', accent: '#06b6d4' },
    preview: ['bg-sky-500', 'bg-sky-600', 'bg-cyan-500']
  },
  {
    id: 'forest-green',
    name: 'Лесной зелёный',
    colors: { primary: '#22c55e', secondary: '#16a34a', accent: '#84cc16' },
    preview: ['bg-green-500', 'bg-green-600', 'bg-lime-500']
  },
  {
    id: 'sunset-orange',
    name: 'Закатный оранж',
    colors: { primary: '#f97316', secondary: '#ea580c', accent: '#fb923c' },
    preview: ['bg-orange-500', 'bg-orange-600', 'bg-orange-400']
  },
  {
    id: 'ruby-red',
    name: 'Рубиновый красный',
    colors: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
    preview: ['bg-red-500', 'bg-red-600', 'bg-red-400']
  },
  {
    id: 'lavender-dream',
    name: 'Лавандовый сон',
    colors: { primary: '#c084fc', secondary: '#a855f7', accent: '#e879f9' },
    preview: ['bg-purple-400', 'bg-purple-500', 'bg-fuchsia-400']
  },
  {
    id: 'mint-fresh',
    name: 'Свежая мята',
    colors: { primary: '#34d399', secondary: '#10b981', accent: '#6ee7b7' },
    preview: ['bg-emerald-400', 'bg-emerald-500', 'bg-emerald-300']
  },
  {
    id: 'golden-hour',
    name: 'Золотой час',
    colors: { primary: '#fbbf24', secondary: '#f59e0b', accent: '#fcd34d' },
    preview: ['bg-amber-400', 'bg-amber-500', 'bg-amber-300']
  },
  {
    id: 'royal-indigo',
    name: 'Королевский индиго',
    colors: { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' },
    preview: ['bg-indigo-500', 'bg-indigo-600', 'bg-indigo-400']
  },
  {
    id: 'cherry-blossom',
    name: 'Сакура',
    colors: { primary: '#f472b6', secondary: '#ec4899', accent: '#f9a8d4' },
    preview: ['bg-pink-400', 'bg-pink-500', 'bg-pink-300']
  }
];

const menuPositions: { id: MenuPosition; name: string; icon: string; description: string }[] = [
  { id: 'left', name: 'Слева', icon: 'PanelLeft', description: 'Классическое боковое меню' },
  { id: 'right', name: 'Справа', icon: 'PanelRight', description: 'Меню справа от контента' },
  { id: 'top', name: 'Сверху', icon: 'PanelTop', description: 'Горизонтальное меню сверху' },
  { id: 'bottom', name: 'Снизу', icon: 'PanelBottom', description: 'Меню внизу экрана (мобильный стиль)' }
];

const SettingsSection = () => {
  console.log('SettingsSection rendering');
  
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'cosmic-purple';
  });

  const [menuPosition, setMenuPosition] = useState<MenuPosition>(() => {
    return (localStorage.getItem('menuPosition') as MenuPosition) || 'left';
  });

  useEffect(() => {
    const theme = themes.find(t => t.id === selectedTheme);
    if (theme) {
      document.documentElement.style.setProperty('--theme-primary', theme.colors.primary);
      document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary);
      document.documentElement.style.setProperty('--theme-accent', theme.colors.accent);
      localStorage.setItem('appTheme', selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    localStorage.setItem('menuPosition', menuPosition);
    window.dispatchEvent(new Event('storage'));
  }, [menuPosition]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    toast.success(`Тема "${theme?.name}" применена`);
  };

  const handleMenuPositionChange = (position: MenuPosition) => {
    setMenuPosition(position);
    const positionData = menuPositions.find(p => p.id === position);
    toast.success(`Меню перемещено: ${positionData?.name}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-2">Настройки внешнего вида</h2>
        <p className="text-muted-foreground">Персонализируйте интерфейс под свои предпочтения</p>
      </div>

      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Цветовая тема</h3>
            <p className="text-sm text-muted-foreground mb-4">Выберите палитру цветов для интерфейса</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-scale ${
                  selectedTheme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex gap-2 mb-3">
                  {theme.preview.map((color, idx) => (
                    <div key={idx} className={`flex-1 h-8 rounded ${color}`} />
                  ))}
                </div>
                <p className="text-sm font-medium text-center">{theme.name}</p>
                {selectedTheme === theme.id && (
                  <div className="flex justify-center mt-2">
                    <Icon name="CheckCircle2" size={18} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Расположение меню</h3>
            <p className="text-sm text-muted-foreground mb-4">Выберите, где разместить главное меню навигации</p>
          </div>

          <RadioGroup value={menuPosition} onValueChange={(value) => handleMenuPositionChange(value as MenuPosition)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuPositions.map((position) => (
                <div
                  key={position.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    menuPosition === position.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleMenuPositionChange(position.id)}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value={position.id} id={position.id} className="mt-1" />
                    <Label htmlFor={position.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={position.icon as any} size={20} />
                        <span className="font-medium">{position.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{position.description}</p>
                    </Label>
                  </div>
                  {menuPosition === position.id && (
                    <div className="absolute top-3 right-3">
                      <Icon name="CheckCircle2" size={18} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="flex items-start gap-3">
              <Icon name="Zap" size={18} className="text-green-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1 text-green-400">Мгновенное применение</p>
                <p className="text-muted-foreground">
                  Расположение меню меняется сразу после выбора, без перезагрузки страницы. 
                  Все настройки сохраняются автоматически.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Дополнительные настройки</h3>
            <p className="text-sm text-muted-foreground">Скоро появятся новые опции персонализации</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Icon name="Palette" size={20} />
                <div>
                  <p className="font-medium text-sm">Кастомные цвета</p>
                  <p className="text-xs">В разработке</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Icon name="Type" size={20} />
                <div>
                  <p className="font-medium text-sm">Размер шрифтов</p>
                  <p className="text-xs">В разработке</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Icon name="Moon" size={20} />
                <div>
                  <p className="font-medium text-sm">Тёмная/светлая тема</p>
                  <p className="text-xs">В разработке</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Icon name="Sparkles" size={20} />
                <div>
                  <p className="font-medium text-sm">Анимации</p>
                  <p className="text-xs">В разработке</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsSection;