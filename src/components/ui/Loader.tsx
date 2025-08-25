import { memo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type LoaderVariants = VariantProps<typeof loaderVariants>;

interface LoaderProps extends LoaderVariants {
  className?: string;
}

const loaderVariants = cva(
  'animate-spin rounded-full border-solid border-t-transparent',
  {
    variants: {
      size: {
        default: 'size-4 border-2',
        sm: 'size-3 border-[1.5px]',
        lg: 'size-5 border-2',
        icon: 'size-4 border-2'
      },
      variant: {
        default: 'border-blue-600 border-t-transparent',
        white: 'border-white border-t-transparent',
        muted: 'border-muted-foreground border-t-transparent'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

const Loader = memo<LoaderProps>(({ className, size, variant }) => {
  return (
    <div
      className={cn(loaderVariants({ size, variant }), className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

Loader.displayName = 'Loader';

export { Loader, loaderVariants };
export type { LoaderProps };
