import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export interface ProgressProps extends ProgressPrimitive.ProgressProps {
  value?: number;
}

export const Progress: React.FC<ProgressProps> = ({ value = 0, className = '', ...props }) => (
  <ProgressPrimitive.Root
    value={value}
    className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}
    {...props}
  >
    <ProgressPrimitive.Indicator
      style={{ transform: `translateX(-${100 - value}%)` }}
      className="h-full w-full flex-1 bg-primary transition-transform"/>
  </ProgressPrimitive.Root>
);
