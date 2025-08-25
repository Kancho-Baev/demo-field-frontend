import SelectFields from '@/components/CreateFieldModal/SelectFields';

export const FIELDS_TYPES = {
  SELECT: 'SELECT',
  TEXT: 'TEXT'
};

export const CREATE_FIELD_CONFIG = {
  [FIELDS_TYPES.SELECT]: {
    component: SelectFields
  },
  [FIELDS_TYPES.TEXT]: {
    component: () => null
  }
};
