import { useFieldsList } from '@/hooks/useFieldsList';
import FieldsList from '../components/FieldsList/FieldsList';
import Header from '@/components/Header';

const Dashboard = () => {
  const { data, loading, error, refetch } = useFieldsList();

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FieldsList
          fields={data}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Dashboard;
