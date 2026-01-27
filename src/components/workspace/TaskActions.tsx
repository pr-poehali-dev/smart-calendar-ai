import { memo } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TaskActionsProps = {
  onComplete: () => void;
  onEdit: () => void;
  onReschedule: () => void;
  isCompleted?: boolean;
};

const TaskActions = ({ onComplete, onEdit, onReschedule, isCompleted = false }: TaskActionsProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-green-500/20 hover:text-green-400"
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
            >
              <Icon name={isCompleted ? "CheckCheck" : "Check"} size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCompleted ? 'Отменить выполнение' : 'Отметить выполненной'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-blue-500/20 hover:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Icon name="Edit" size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Редактировать</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-purple-500/20 hover:text-purple-400"
              onClick={(e) => {
                e.stopPropagation();
                onReschedule();
              }}
            >
              <Icon name="CalendarDays" size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перенести на другой день</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default memo(TaskActions);