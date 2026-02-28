import { useIsMobile } from '../hooks/use-mobile';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`
      container mx-auto px-4 
      ${isMobile ? 'px-3' : 'px-6'}
      ${className}
    `}>
      {children}
    </div>
  );
}

export function MobileOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
}

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return !isMobile ? <>{children}</> : null;
}