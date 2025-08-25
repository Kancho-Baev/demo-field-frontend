import { cn } from '@/lib/utils';
import { memo, useCallback, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { InputWithIcon } from './Input';

type ChoicesProps = {
  choices?: string[];
  className?: string;
  hasMaximumChoices?: boolean;
  onAddChoice?: (choice: string) => void;
  onRemoveChoice?: (choice: string) => void;
};

const Choices = memo(
  ({
    choices = [],
    className = '',
    hasMaximumChoices = false,
    onAddChoice,
    onRemoveChoice
  }: ChoicesProps) => {
    const [newChoice, setNewChoice] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const hasChoice = useMemo(() => {
      return choices.find(choice => choice === newChoice.trim());
    }, [choices, newChoice]);

    const handleAddChoice = useCallback(() => {
      if (
        hasChoice ||
        newChoice.trim().length === 0 ||
        !onAddChoice ||
        hasMaximumChoices
      ) {
        return;
      }

      onAddChoice(newChoice.trim());
      setNewChoice('');
    }, [newChoice, onAddChoice]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddChoice();
      }
    };

    const handleRemoveChoice = (choice: string) => {
      if (onRemoveChoice) {
        onRemoveChoice(choice);
      }
    };

    if (!choices) {
      return null;
    }

    return (
      <div
        className={cn(
          'border border-input rounded-md bg-background h-[200px] flex flex-col',
          className
        )}
      >
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {choices.map((choice, index) => (
            <div
              key={index}
              className="relative group flex items-center justify-between text-sm text-foreground py-1 px-2 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="flex-1 pr-2">{choice}</span>
              {onRemoveChoice && hoveredIndex === index && (
                <button
                  type="button"
                  onClick={() => handleRemoveChoice(choice)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground transition-all duration-200 rounded-sm"
                  aria-label={`Remove ${choice}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {onAddChoice && (
          <div className="border-t border-input p-3">
            <InputWithIcon
              type="text"
              value={newChoice}
              onChange={e => setNewChoice(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a choice..."
              icon={
                !hasChoice && !hasMaximumChoices ? <Plus size={16} /> : null
              }
              onIconClick={() => {
                if (hasChoice || hasMaximumChoices) {
                  return;
                }

                handleAddChoice();
              }}
              className="w-full"
              size="sm"
            />
          </div>
        )}
      </div>
    );
  }
);

Choices.displayName = 'Choices';

export { Choices };
