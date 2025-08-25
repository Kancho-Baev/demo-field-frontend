import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { useModalContext } from '@/providers/ModalProvider';
import { MODAL_CONFIG } from '@/lib/modal-config';

const Header = () => {
  const { openModal } = useModalContext();

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Field Builder
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Button
              variant="default"
              onClick={() => openModal(MODAL_CONFIG.CREATE_FIELD)}
            >
              Create Field
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
