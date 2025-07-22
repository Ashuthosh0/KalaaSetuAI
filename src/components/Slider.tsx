import React, { useState, useRef, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange }) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((percentage / 100) * (max - min) + min);
    const steppedValue = Math.round(newValue / step) * step;

    if (isDragging === 'min') {
      onChange([Math.min(steppedValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(steppedValue, value[0])]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        <div
          className="absolute h-2 bg-amber-600 rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
        <div
          className="absolute w-4 h-4 bg-amber-600 rounded-full border-2 border-white shadow-md cursor-pointer transform -translate-y-1"
          style={{ left: `${minPercentage}%`, marginLeft: '-8px' }}
          onMouseDown={handleMouseDown('min')}
        />
        <div
          className="absolute w-4 h-4 bg-amber-600 rounded-full border-2 border-white shadow-md cursor-pointer transform -translate-y-1"
          style={{ left: `${maxPercentage}%`, marginLeft: '-8px' }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
};