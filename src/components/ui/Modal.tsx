import { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import type { ModalProps } from '@/types/modal';

const modalVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4',
  {
    variants: {
      position: {
        center: 'items-center justify-center',
        top: 'items-start justify-center pt-20',
        bottom: 'items-end justify-center pb-20'
      }
    },
    defaultVariants: {
      position: 'center'
    }
  }
);

const modalContentVariants = cva(
  'relative bg-background border border-border rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col',
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        full: 'w-full max-w-7xl h-[90vh]'
      },
      animation: {
        fade: 'animate-in fade-in-0 duration-200',
        slide: 'animate-in slide-in-from-bottom-4 fade-in-0 duration-300',
        scale: 'animate-in zoom-in-95 fade-in-0 duration-200',
        none: ''
      }
    },
    defaultVariants: {
      size: 'md',
      animation: 'scale'
    }
  }
);

const modalOverlayVariants = cva(
  'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
  {
    variants: {
      animation: {
        fade: 'animate-in fade-in-0 duration-200',
        slide: 'animate-in fade-in-0 duration-300',
        scale: 'animate-in fade-in-0 duration-200',
        none: ''
      }
    },
    defaultVariants: {
      animation: 'fade'
    }
  }
);

interface ModalComponentProps
  extends Omit<ModalProps, 'position'>,
    VariantProps<typeof modalVariants> {
  position?: 'center' | 'top' | 'bottom';
}

const Modal = memo<ModalComponentProps>(
  ({
    isOpen,
    onClose,
    children,
    title,
    description,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className,
    overlayClassName,
    contentClassName,
    headerClassName,
    footerClassName,
    footer,
    preventScroll = true,
    animation = 'scale',
    position = 'center'
  }) => {
    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape') {
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    const handleBackdropClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    useEffect(() => {
      if (!preventScroll) return;

      if (isOpen) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [isOpen, preventScroll]);

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, handleEscape]);

    useEffect(() => {
      if (isOpen) {
        const activeElement = document.activeElement as HTMLElement;
        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('[data-modal="true"]');

        if (modal) {
          const firstFocusable = modal.querySelector(
            focusableElements
          ) as HTMLElement;
          firstFocusable?.focus();
        }

        return () => {
          activeElement?.focus();
        };
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
      <>
        <div
          className={cn(modalOverlayVariants({ animation }), overlayClassName)}
          onClick={closeOnBackdropClick ? handleBackdropClick : undefined}
          aria-hidden="true"
        />
        <div
          className={cn(modalVariants({ position }), className)}
          onClick={closeOnBackdropClick ? handleBackdropClick : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          <div
            className={cn(
              modalContentVariants({ size, animation }),
              contentClassName
            )}
            data-modal="true"
            onClick={e => e.stopPropagation()}
          >
            {(title || description || showCloseButton) && (
              <div
                className={cn(
                  'flex items-center justify-between px-4 py-2 border-b border-border',
                  headerClassName
                )}
              >
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-foreground"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-muted-foreground"
                    >
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-md ml-4 flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <span className="text-lg leading-none">×</span>
                  </Button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
            {footer && (
              <div
                className={cn('border-t border-border p-6', footerClassName)}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

export { Modal, modalVariants, modalContentVariants, modalOverlayVariants };
export type { ModalComponentProps };
