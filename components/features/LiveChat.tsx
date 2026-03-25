'use client';
import { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {
    // Inject the Tawk.to or Crisp chat script into the document dynamically
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/placeholder_id/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // To prevent errors locally if the script is blocked, we wrap in a simple error boundary
    script.onerror = () => console.warn('Live chat script blocked or failed to load.');
    
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      if (document.body.contains(script)) {
        // Safe removal
        script.remove();
      }
    };
  }, []);

  return null;
}
