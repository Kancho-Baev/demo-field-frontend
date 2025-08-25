import { useMemo } from 'react';
import { useModalContext } from '@/providers/ModalProvider';
import { Button } from '../ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/Select';
import useCreateField from '@/hooks/useCreateField';
import { CREATE_FIELD_CONFIG, FIELDS_TYPES } from '@/lib/fields-config';

const CreateFieldModal = () => {
  const { closeModal } = useModalContext();
  const {
    label,
    type,
    errors,
    order,
    options,
    field_type,
    isValueRequired,
    defaultValue,
    hasMaximumOptions,
    setData,
    addOption,
    removeOption,
    submitField,
    loading
  } = useCreateField(closeModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitField();
  };

  const FieldComponent = useMemo(() => {
    if (!field_type) return null;

    return CREATE_FIELD_CONFIG?.[field_type]?.component;
  }, [field_type]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label
          htmlFor="field-type"
          className="text-sm font-medium text-foreground w-32 shrink-0"
        >
          Field Type
        </label>
        <div className="flex-1">
          <Select
            value={field_type}
            onValueChange={value => setData('field_type', value)}
          >
            <SelectTrigger id="field-type" className="w-full max-w-xs">
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FIELDS_TYPES.SELECT}>Select</SelectItem>
              <SelectItem value={FIELDS_TYPES.TEXT}>Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-6">
        {FieldComponent ? (
          <FieldComponent
            type={type}
            order={order}
            label={label}
            options={options}
            errors={errors}
            hasMaximumOptions={hasMaximumOptions}
            isValueRequired={isValueRequired}
            defaultValue={defaultValue}
            setData={setData}
            removeOption={removeOption}
            addOption={addOption}
          />
        ) : null}

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="ghost"
            className="text-red-600 hover:bg-transparent hover:text-red-500"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || Object.keys(errors).length > 0 || !field_type}
            loading={loading}
          >
            {loading ? 'Creating...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFieldModal;
