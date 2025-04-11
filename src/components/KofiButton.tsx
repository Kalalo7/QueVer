'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: any) => void;
    };
  }
}

export default function KofiButton() {
  useEffect(() => {
    const loadKofiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
      script.onload = () => {
        if (window.kofiWidgetOverlay) {
          window.kofiWidgetOverlay.draw('kalalo7', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Donate',
            'floating-chat.donateButton.background-color': '#323842',
            'floating-chat.donateButton.text-color': '#fff'
          });
        }
      };
      document.body.appendChild(script);
    };

    loadKofiScript();

    // Cleanup function
    return () => {
      const existingButton = document.querySelector('[data-ko-fi-widget]');
      if (existingButton) {
        existingButton.remove();
      }
    };
  }, []);

  return null;
}