'use client';
import { useState, useEffect } from 'react';
import NewsletterForm from './NewsletterForm';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit_popup_closed')) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of the top of the viewport (indicating closing tab/switching tab)
      if (e.clientY < 5 && !hasTriggered) {
        setShow(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem('exit_popup_closed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full relative shadow-2xl transform transition-all">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">🎁</span>
            <h2 className="text-2xl font-bold font-serif text-gray-900">Wait, don&apos;t leave empty-handed!</h2>
            <p className="text-gray-600 text-sm mt-2">Subscribe to our newsletter and get a free digital copy of our Wellness Guidelines.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
