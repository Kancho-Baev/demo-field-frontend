import { FIELDS_TYPES } from '@/lib/fields-config';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import CREATE_FIELD_MUTATION from '@/graphql/createField.graphql';
import GET_FIELDS_LIST from '@/graphql/getFieldsList.graphql';

type State = {
  errors: Record<string, string>;
  field_type: string | undefined;
  label: string;
  type: string | undefined;
  isValueRequired: boolean;
  defaultValue: string;
  options: string[];
  order: string | undefined;
};

type Action =
  | { type: 'SET_DATA'; key: string; payload: any }
  | { type: 'ADD_OPTION'; payload: string }
  | { type: 'REMOVE_OPTION'; payload: string }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'RESET_DATA' };

const initialState: State = {
  errors: {},
  field_type: undefined,
  label: '',
  type: undefined,
  isValueRequired: false,
  defaultValue: '',
  options: [],
  order: undefined
};

const TEMP_FORM_KEY = 'temp_create_field_form';

const getInitialState = (): State => {
  try {
    const savedData = localStorage.getItem(TEMP_FORM_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...initialState,
        ...parsedData,
        errors: {}
      };
    }
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }

  return initialState;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, [action.key]: action.payload };
    case 'ADD_OPTION':
      const newOptions = [...state.options, action.payload];
      return { ...state, options: newOptions };
    case 'REMOVE_OPTION':
      const filteredOptions = state.options.filter(
        str => str !== action.payload
      );
      return { ...state, options: filteredOptions };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET_DATA':
      return initialState;
    default:
      return state;
  }
};

const useCreateField = (closeModal: () => void) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const saveTemporaryState = useCallback((data: any) => {
    localStorage.setItem(TEMP_FORM_KEY, JSON.stringify(data));
  }, []);

  const removeTemporaryState = useCallback(() => {
    localStorage.removeItem(TEMP_FORM_KEY);
  }, []);

  const [createField, { loading }] = useMutation(CREATE_FIELD_MUTATION, {
    onCompleted: () => {
      toast.success('Field created successfully');
      dispatch({ type: 'RESET_DATA' });
      removeTemporaryState();
      closeModal();
    },
    onError: error => {
      toast.error(`Error creating field: ${error.message}`);
    },
    refetchQueries: [
      {
        query: GET_FIELDS_LIST,
        variables: {}
      }
    ],
    awaitRefetchQueries: true
  });

  const setData = useCallback(
    (key: string, value: any) => {
      if (key === 'label' && state.errors.label) {
        const { label, ...restErrors } = state.errors;
        setErrors(restErrors);
      }

      if (key === 'type' && state.errors.type) {
        const { type, ...restErrors } = state.errors;
        setErrors(restErrors);
      }

      dispatch({ type: 'SET_DATA', key, payload: value });
    },
    [state.errors]
  );

  const setErrors = useCallback((errors: Record<string, string>) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  }, []);

  const addOption = useCallback(
    (value: string) => {
      if (state.field_type !== FIELDS_TYPES.SELECT) {
        return null;
      }

      dispatch({ type: 'ADD_OPTION', payload: value });
    },
    [state.field_type]
  );

  const removeOption = useCallback(
    (value: string) => {
      if (state.field_type !== FIELDS_TYPES.SELECT) {
        return null;
      }

      dispatch({ type: 'REMOVE_OPTION', payload: value });
    },
    [state.field_type]
  );

  const hasMaximumOptions = useMemo(() => {
    return state.options.length >= 50;
  }, [state.options]);

  const submitField = useCallback(async () => {
    if (!state.field_type) {
      toast.error('Please select a field type');
      return;
    }

    const _errors = {} as any;

    if (!state.label) {
      _errors.label = 'Label';
    }

    if (state.field_type === FIELDS_TYPES.SELECT && !state.type) {
      _errors.type = 'Select Type';
    }

    if (Object.keys(_errors).length > 0) {
      toast.error(`Missing ${Object.values(_errors).join(', ')}`);

      setErrors({
        ...state.errors,
        ..._errors
      });
      return;
    }

    try {
      await createField({
        variables: {
          data: {
            label: state.label,
            type: state.field_type,
            ...(state.isValueRequired
              ? { isValueRequired: state.isValueRequired }
              : {}),
            ...(state.defaultValue ? { defaultValue: state.defaultValue } : {}),
            ...(state.type ? { selectType: state.type } : {}),
            ...(state.options.length > 0 ? { options: state.options } : {}),
            ...(state.order ? { orderType: state.order } : {})
          }
        }
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }, [state, createField]);

  useEffect(() => {
    const { errors, ...stateToSave } = state;
    saveTemporaryState(stateToSave);
  }, [
    state.field_type,
    state.label,
    state.type,
    state.isValueRequired,
    state.defaultValue,
    state.options,
    state.order,
    saveTemporaryState
  ]);

  return {
    ...state,
    hasMaximumOptions,
    setData,
    addOption,
    removeOption,
    submitField,
    loading
  };
};

export default useCreateField;
