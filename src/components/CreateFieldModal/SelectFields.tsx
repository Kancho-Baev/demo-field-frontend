import { Plus } from 'lucide-react';
import { Checkbox } from '../ui/Checkbox';
import { Choices } from '../ui/Choices';
import { InputWithIcon } from '../ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/Select';
import { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

type SelectFieldsProps = {
  label: string;
  type?: string;
  order?: string;
  errors?: Record<string, string>;
  isValueRequired: boolean;
  defaultValue: string;
  options: string[];
  hasMaximumOptions: boolean;
  setData: (key: string, value: any) => void;
  addOption: (value: string) => void;
  removeOption: (value: string) => void;
};

const SelectFields = ({
  label,
  isValueRequired,
  defaultValue,
  type,
  errors,
  order,
  options,
  setData,
  addOption,
  removeOption,
  hasMaximumOptions
}: SelectFieldsProps) => {
  const hasAddIcon = useMemo(() => {
    if (hasMaximumOptions) {
      return false;
    }

    const foundOption = options.find(str => str === defaultValue);
    return !foundOption && defaultValue.trim().length > 0;
  }, [defaultValue, options]);

  const onRemoveChoice = useCallback((choice: string) => {
    removeOption(choice);
  }, []);

  const onAddChoice = useCallback((choice: string) => {
    addOption(choice);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label
          htmlFor="field-label"
          className="text-sm font-medium text-foreground w-32 shrink-0"
        >
          Label
        </label>
        <div className="flex-1">
          <InputWithIcon
            id="field-label"
            type="text"
            value={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData('label', e.target.value)
            }
            placeholder="Enter field name"
            className={cn(
              'w-full max-w-xs',
              errors?.label &&
                'border rounded-md border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2'
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="field-select-type"
          className="text-sm font-medium text-foreground w-32 shrink-0"
        >
          Type
        </label>
        <div className="flex-1 flex items-center gap-4">
          <div className="w-40">
            <Select
              value={type}
              onValueChange={value => setData('type', value)}
            >
              <SelectTrigger
                id="field-select-type"
                className={cn(
                  errors?.type &&
                    'border rounded-md border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2'
                )}
              >
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SINGLE_SELECT">Select</SelectItem>
                <SelectItem value="MULTI_SELECT">Multi-select</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isValueRequired"
              checked={isValueRequired}
              onCheckedChange={checked => setData('isValueRequired', !!checked)}
            />
            <label
              htmlFor="isValueRequired"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              A Value is required
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="field-default-value"
          className="text-sm font-medium text-foreground w-32 shrink-0"
        >
          Default Value
        </label>
        <div className="flex-1">
          <InputWithIcon
            id="field-default-value"
            type="text"
            value={defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData('defaultValue', e.target.value)
            }
            placeholder="Enter Default Value"
            className="w-full max-w-xs"
            icon={hasAddIcon ? <Plus size={16} /> : null}
            onIconClick={() => {
              if (!hasAddIcon) return;
              addOption(defaultValue);
            }}
          />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <label className="text-sm font-medium text-foreground w-32 shrink-0 pt-2">
          Choices
        </label>
        <div className="flex-1">
          <Choices
            choices={options}
            hasMaximumChoices={hasMaximumOptions}
            className="w-full max-w-xs"
            onAddChoice={onAddChoice}
            onRemoveChoice={onRemoveChoice}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="field-order"
          className="text-sm font-medium text-foreground w-32 shrink-0"
        >
          Order
        </label>
        <div className="flex-1 flex items-center gap-4">
          <div className="w-full max-w-xs">
            <Select
              value={order}
              onValueChange={value => setData('order', value)}
            >
              <SelectTrigger id="field-order">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALPHABETICAL">
                  Display choices in Alphabetical
                </SelectItem>
                <SelectItem value="REVERSE_ALPHABETICAL">
                  Display choices in Reverse Alphabetical
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFields;
