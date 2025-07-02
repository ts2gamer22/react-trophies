import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export const ScrollArea: React.FC<ScrollAreaPrimitive.ScrollAreaProps> = ({
  children,
  className = '',
  ...props
}) => (
  <ScrollAreaPrimitive.Root className={`overflow-hidden ${className}`} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]" >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className="flex select-none touch-none p-0.5 bg-transparent"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
);
