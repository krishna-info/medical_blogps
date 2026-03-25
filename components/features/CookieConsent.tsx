'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 text-white z-50 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <div className="text-sm mb-4 sm:mb-0 mr-4">
        We use cookies to enhance your experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our <a href="/privacy-policy" className="underline hover:text-medical-teal">Privacy Policy</a>.
      </div>
      <button 
        onClick={handleAccept}
        className="px-6 py-2 bg-medical-teal text-white rounded-lg font-bold hover:bg-teal-600 transition whitespace-nowrap"
      >
        Accept
      </button>
    </div>
  );
}
