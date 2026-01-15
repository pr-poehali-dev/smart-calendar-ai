import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type TeamMember = {
  id: string;
  name: string;
  initials: string;
  availability: { day: string; slots: string[] }[];
};

type MeetingsViewProps = {
  teamMembers: TeamMember[];
  selectedMembers: string[];
  aiSuggestions: { day: string; time: string }[];
  onToggleMember: (id: string) => void;
  onFindSlots: () => void;
};

const MeetingsView = ({
  teamMembers,
  selectedMembers,
  aiSuggestions,
  onToggleMember,
  onFindSlots,
}: MeetingsViewProps) => {
  return (
    <div className="grid gap-6 animate-fade-in">
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-semibold mb-6">ИИ-подбор времени для встречи</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Выберите участников</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onToggleMember(member.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-scale ${
                    selectedMembers.includes(member.id)
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="gradient-purple text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.availability.reduce((acc, day) => acc + day.slots.length, 0)} свободных слотов
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={onFindSlots} className="gradient-purple text-white w-full hover-scale">
            <Icon name="Sparkles" size={20} className="mr-2" />
            Найти оптимальное время с помощью ИИ
          </Button>

          {aiSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Icon name="Sparkles" size={20} className="mr-2 text-purple-400" />
                ИИ нашёл {aiSuggestions.length} подходящих слотов
              </h3>
              <div className="grid md:grid-cols-4 gap-3">
                {aiSuggestions.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg gradient-purple/10 border border-purple-500/30 hover:border-purple-500 cursor-pointer transition-all hover-scale"
                  >
                    <p className="font-medium">{slot.day}</p>
                    <p className="text-2xl font-bold mt-1">{slot.time}</p>
                    <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white">
                      Выбрать
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MeetingsView;
