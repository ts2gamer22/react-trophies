import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

/**
 * Lightweight fallback versions of the Shadcn dialog components.
 * These wrappers expose the same named exports (`Dialog`, `DialogTrigger`, etc.)
 * that TrophyModal expects, but with minimal styling so the package can be
 * used without running the Shadcn generator.  Consumers can still override the
 * styling or replace these with the official shadcn variants later.
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>((props, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
    <DialogPrimitive.Content
      ref={ref}
      className={
        'fixed left-1/2 top-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none'
      }
      {...props}
    />
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

// Shadcn adds a <DialogHeader> wrapper; replicate it with simple markup.
export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => <div className={`mb-4 flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />;
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = DialogPrimitive.Title;
