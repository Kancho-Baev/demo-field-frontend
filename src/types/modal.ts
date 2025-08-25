import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  footer?: ReactNode;
  preventScroll?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  position?: 'center' | 'top' | 'bottom';
}

export interface ModalContextValue {
  openModal: (modal: ModalConfig) => void;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  modals: ModalState[];
}

export interface ModalConfig {
  id?: string;
  component: ReactNode;
  props?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>;
}

export interface ModalState extends ModalConfig {
  id: string;
  isOpen: boolean;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
