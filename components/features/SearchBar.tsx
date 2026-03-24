/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';

export default function SearchBar() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).pagefindUI_init) {
      (window as any).pagefindUI_init = true;
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.onload = () => {
        if ((window as any).PagefindUI) {
          new (window as any).PagefindUI({
            element: "#search",
            showSubResults: true,
            showImages: true,
          });
        }
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <div id="search"></div>
    </div>
  );
}
