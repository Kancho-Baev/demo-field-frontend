import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        default: 'h-9',
        sm: 'h-8 text-xs',
        lg: 'h-10'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

interface InputWithIconProps extends InputProps {
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, size, type, icon, onIconClick, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        <input
          type={type}
          className={cn(inputVariants({ size }), icon ? 'pr-10' : '', 'w-full')}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {icon}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
InputWithIcon.displayName = 'InputWithIcon';

export { Input, InputWithIcon, inputVariants };
export type { InputProps, InputWithIconProps };
