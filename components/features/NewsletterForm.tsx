'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-medical-light p-6 rounded-2xl text-center shadow-sm border border-blue-100">
      <h3 className="text-xl font-bold font-serif mb-2 text-medical-blue">Weekly Health Tips</h3>
      <p className="text-gray-600 text-sm mb-4">Join our newsletter to get the latest health insights directly in your inbox.</p>
      
      {status === 'success' ? (
        <div className="bg-teal-50 text-medical-teal p-3 rounded-lg text-sm font-medium border border-teal-200">
          Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medical-teal"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="px-4 py-2 bg-medical-blue text-white rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}
