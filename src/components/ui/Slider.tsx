import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, min, max, step, onChange, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className="relative flex items-center select-none touch-none w-full h-5"
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={([newValue]) => onChange(newValue)}
      {...props}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block w-5 h-5 bg-white rounded-full border-2 border-blue-500",
          "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
          "transition-colors duration-200"
        )}
      />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = "Slider";

export { Slider };