// Performance monitoring utilities
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  mark(name: string) {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string) {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      console.warn(`Mark ${startMark} not found`);
      return;
    }
    const duration = performance.now() - startTime;
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  // Measure component render time
  static measureRender(componentName: string) {
    return function <T extends (...args: any[]) => any>(target: T): T {
      return ((...args: any[]) => {
        const start = performance.now();
        const result = target(...args);
        const end = performance.now();
        console.log(`[Render] ${componentName}: ${(end - start).toFixed(2)}ms`);
        return result;
      }) as T;
    };
  }
}

// Debounce utility for scroll events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Intersection Observer utility for lazy loading
// Note: This requires React to be imported in the component using this hook
export function useIntersectionObserver(
  _elementRef: any,
  _callback: IntersectionObserverCallback,
  _options?: IntersectionObserverInit
) {
  // Placeholder - implement this in your component with React.useEffect
  console.warn('useIntersectionObserver requires React context');
}

// Memory usage monitoring (development only)
export function logMemoryUsage() {
  if (import.meta.env.DEV && (performance as any).memory) {
    const memory = (performance as any).memory;
    console.log('[Memory]', {
      usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
    });
  }
}