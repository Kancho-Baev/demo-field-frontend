import { Button } from '../ui/Button';
import { MODAL_CONFIG } from '@/lib/modal-config';
import { useModalContext } from '@/providers/ModalProvider';
import { FileText } from 'lucide-react';

const NoFieldsFound = () => {
  const { openModal } = useModalContext();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-500/10 flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No fields found
        </h3>
        <p className="text-gray-400 mb-6">
          Get started by creating your first field to organize your data.
        </p>
        <Button
          variant="default"
          onClick={() => openModal(MODAL_CONFIG.CREATE_FIELD)}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
        >
          Create Your First Field
        </Button>
      </div>
    </div>
  );
};

export default NoFieldsFound;
