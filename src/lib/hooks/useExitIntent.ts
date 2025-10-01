import { useState, useEffect, useCallback, useRef } from 'react';

interface UseExitIntentOptions {
  enabled: boolean;
  sensitivity?: number;
  delay?: number;
}

export const useExitIntent = (options: UseExitIntentOptions) => {
  const { enabled, sensitivity = 20, delay = 500 } = options;
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerExitIntent = useCallback(() => {
    if (hasShownExitIntent) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowExitIntent(true);
      setHasShownExitIntent(true);
      console.log('Exit intent triggered!');
    }, delay);
  }, [hasShownExitIntent, delay]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Near top of viewport
    if (e.clientY <= sensitivity && !hasShownExitIntent) {
      triggerExitIntent();
    }
  }, [hasShownExitIntent, sensitivity, triggerExitIntent]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    // If leaving the window (relatedTarget is null) and near the top, count as exit intent
    const target = e.relatedTarget as Node | null;
    if (!target && (e.clientY <= sensitivity + 5)) {
      triggerExitIntent();
    }
  }, [sensitivity, triggerExitIntent]);

  useEffect(() => {
    if (enabled && !hasShownExitIntent) {
      console.log('Exit intent listener enabled');
      document.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseOut);
      
      return () => {
        console.log('Exit intent listener disabled');
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseOut);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [enabled, hasShownExitIntent, handleMouseMove, handleMouseOut]);

  // Reset internal state when enabling (e.g., when order dialog opens)
  useEffect(() => {
    if (enabled) {
      setShowExitIntent(false);
      setHasShownExitIntent(false);
      console.log('Exit intent state reset on enable');
    }
  }, [enabled]);

  const closeExitIntent = useCallback(() => {
    setShowExitIntent(false);
  }, []);

  return {
    showExitIntent,
    closeExitIntent,
    hasShownExitIntent,
    // Expose manual trigger for programmatic usage (e.g., when user closes the order dialog)
    openExitIntent: triggerExitIntent
  };
};

