import { Button } from '../ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorFetching = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Unable to load fields
        </h3>
        <p className="text-gray-400 mb-6">
          We encountered an error while fetching your fields. Please try again.
        </p>
        <Button
          variant="default"
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFetching;
