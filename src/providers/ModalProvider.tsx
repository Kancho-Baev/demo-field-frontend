import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode
} from 'react';
import { Modal } from '@/components/ui/Modal';
import type { ModalContextValue, ModalConfig, ModalState } from '@/types/modal';

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback((modal: ModalConfig) => {
    const id =
      modal.id ||
      `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newModal: ModalState = {
      ...modal,
      id,
      isOpen: true
    };

    setModals(prev => [...prev, newModal]);
  }, []);

  const closeModal = useCallback((id?: string) => {
    if (id) {
      setModals(prev => prev.filter(modal => modal.id !== id));
    } else {
      setModals(prev => prev.slice(0, -1));
    }
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
      modals
    }),
    [openModal, closeModal, closeAllModals, modals]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modals.map(modal => (
        <Modal
          key={modal.id}
          isOpen={modal.isOpen}
          onClose={() => closeModal(modal.id)}
          {...modal.props}
        >
          {modal.component}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};
