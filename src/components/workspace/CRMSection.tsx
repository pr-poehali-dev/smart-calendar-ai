import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Deal = {
  id: string;
  title: string;
  company: string;
  stage: string;
  amount: number;
  probability: number;
  contact: string;
  dueDate: string;
};

const CRMSection = () => {
  const deals: Deal[] = [
    {
      id: '1',
      title: 'Разработка корпоративного сайта',
      company: 'ООО "Технологии"',
      stage: 'negotiation',
      amount: 500000,
      probability: 70,
      contact: 'ИИ',
      dueDate: '2026-02-01',
    },
    {
      id: '2',
      title: 'Внедрение CRM системы',
      company: 'ПАО "Строй"',
      stage: 'proposal',
      amount: 1200000,
      probability: 50,
      contact: 'АВ',
      dueDate: '2026-01-25',
    },
    {
      id: '3',
      title: 'Техподдержка на год',
      company: 'ИП Петров',
      stage: 'contact',
      amount: 300000,
      probability: 30,
      contact: 'ПА',
      dueDate: '2026-03-10',
    },
  ];

  const stages = [
    { id: 'contact', title: 'Первый контакт', color: 'bg-gray-500/20' },
    { id: 'proposal', title: 'Предложение', color: 'bg-blue-500/20' },
    { id: 'negotiation', title: 'Переговоры', color: 'bg-purple-500/20' },
    { id: 'closed', title: 'Закрыто', color: 'bg-green-500/20' },
  ];

  const totalRevenue = deals.reduce((acc, deal) => acc + (deal.amount * deal.probability) / 100, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">CRM</h2>
        <Button className="gradient-purple text-white">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить сделку
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Всего сделок</span>
            <Icon name="TrendingUp" size={18} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{deals.length}</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Ожидаемый доход</span>
            <Icon name="DollarSign" size={18} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold">{(totalRevenue / 1000).toFixed(0)}K ₽</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Конверсия</span>
            <Icon name="Percent" size={18} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold">45%</p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Средний чек</span>
            <Icon name="BarChart3" size={18} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold">{(deals.reduce((a, d) => a + d.amount, 0) / deals.length / 1000).toFixed(0)}K ₽</p>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="space-y-3">
            <div className={`p-3 rounded-lg ${stage.color}`}>
              <h3 className="font-semibold flex items-center justify-between">
                {stage.title}
                <Badge variant="secondary" className="ml-2">
                  {deals.filter((d) => d.stage === stage.id).length}
                </Badge>
              </h3>
            </div>

            <div className="space-y-3">
              {deals
                .filter((deal) => deal.stage === stage.id)
                .map((deal) => (
                  <Card key={deal.id} className="p-4 hover:border-primary cursor-pointer transition-all hover-scale bg-card border-border">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">{deal.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{deal.company}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-green-400">
                          {(deal.amount / 1000).toFixed(0)}K ₽
                        </span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {deal.probability}%
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={12} />
                          {new Date(deal.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                        </span>
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs gradient-purple text-white">
                            {deal.contact}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMSection;
