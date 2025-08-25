import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import GET_FIELDS_LIST from '@/graphql/getFieldsList.graphql';
import type { Field } from '@/types';

export type FieldsListResponse = {
  fields: Field[];
};

type UseFieldsListReturn = {
  data: Field[] | [];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
};

export const useFieldsList = (): UseFieldsListReturn => {
  const { data, loading, error, refetch } = useQuery<FieldsListResponse>(
    GET_FIELDS_LIST,
    {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true
    }
  );

  const fieldsList = useMemo(() => data?.fields || [], [data?.fields]);

  return {
    data: fieldsList,
    loading,
    error: error as Error | undefined,
    refetch
  };
};
