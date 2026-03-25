'use client';
import { useEffect } from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).googleTranslateElementInit = () => {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).google && (window as any).google.translate) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).google.translate.TranslateElement(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      }
    };
  }, []);

  return (
    <div className="mt-6 flex justify-center">
       <div id="google_translate_element" className="inline-block text-sm overflow-hidden rounded shadow-sm border border-gray-200"></div>
    </div>
  );
}
