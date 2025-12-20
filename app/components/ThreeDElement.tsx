"use client"


import { useEffect, useRef } from "react";

interface ThreeDElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  hoverScale?: number;
}

const ThreeDElement = ({ 
  children, 
  className = "", 
  intensity = 15,
  hoverScale = 1.05 
}: ThreeDElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * intensity;
      const rotateY = (centerX - x) / centerX * intensity;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale})`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, hoverScale]);

  return (
    <div
  ref={elementRef}
  className={`transition-transform duration-300 ease-out ${className}`}
  style={{
    transformStyle: "preserve-3d",
    willChange: "transform",
  }}
>

      {children}
    </div>
  );
};

export default ThreeDElement;