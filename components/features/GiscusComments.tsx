'use client';
import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Placeholder data-repo logic for TRD
    script.setAttribute('data-repo', 'krishna-info/medical_blogps');
    script.setAttribute('data-repo-id', 'R_kgDORvLC4Q');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDORvLC4c4C5KII');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="mt-12 pt-8 border-t border-gray-200" />;
}
