import CreateFieldModal from '@/components/CreateFieldModal/CreateFieldModal';

export const MODAL_CONFIG = {
  CREATE_FIELD: {
    id: 'create-field',
    component: <CreateFieldModal />,
    props: {
      title: 'Field Builder',
      description: '',
      size: 'xl' as const,
      closeOnBackdropClick: false,
      closeOnEscape: false,
      showCloseButton: false,
      headerClassName: 'bg-blue-100 [&_h2]:text-blue-700',
      contentClassName: 'border-2 border-blue-100'
    }
  }
};
