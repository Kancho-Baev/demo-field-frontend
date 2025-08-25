import { Field } from '../../types';
import FieldItem from '../FieldItem';
import { Loader } from '../ui/Loader';
import ErrorFetching from './ErrorFetching';
import NoFieldsFound from './NoFieldsFound';

type FieldsListProps = {
  fields: Field[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
};

const FieldsList = ({ fields, loading, error, refetch }: FieldsListProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Fields
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl">
          Explore your field configurations below. Click on any field to view
          its details or expand for more information.
        </p>
      </div>

      {error ? <ErrorFetching refetch={refetch} /> : null}

      {loading ? (
        <div className="flex justify-center items-center py-12 sm:py-16">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Loader size="lg" />
            <div>
              <p className="text-white font-medium mb-1">Loading fields...</p>
              <p className="text-gray-400 text-sm">
                Please wait while we fetch your field configurations
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {!loading && !error && fields.length === 0 ? <NoFieldsFound /> : null}

      {!loading && !error && fields.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
          {fields.map(field => (
            <div key={field.id} className="w-full">
              <FieldItem field={field} />
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default FieldsList;
