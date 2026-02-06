"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    recreateInterest: [] as string[],
    otherDetails: "",
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData({
      ...formData,
      recreateInterest: formData.recreateInterest.includes(value)
        ? formData.recreateInterest.filter(item => item !== value)
        : [...formData.recreateInterest, value],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Thank you, {formData.name.split(' ')[0]}
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              We'll reach out as soon as we're ready.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Your memories are precious to us.
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-rose-100 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
              Have voice recordings, videos, or photos you'd like to share?
            </p>
            <a 
              href="mailto:info@artoo.love"
              className="inline-flex items-center text-xl font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@artoo.love
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <p className="text-rose-600 dark:text-rose-400 font-medium mb-4 text-lg">
            For those who miss hearing their voice
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-balance leading-tight">
            What if you could hear them again?
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-4 text-balance max-w-2xl mx-auto leading-relaxed">
            The hardest part of loss isn't forgetting their face.<br />It's forgetting their voice.
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 text-balance max-w-2xl mx-auto">
            We're building something to help you remember — to hear their laugh, their stories, their love again.
          </p>
        </div>

        {/* CTA Form */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-100 dark:border-slate-700 mb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Join the Waitlist
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Be among the first to reconnect with cherished memories
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-lg placeholder:text-slate-400"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-lg placeholder:text-slate-400"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-lg placeholder:text-slate-400"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                What would help you remember? (optional)
              </p>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.recreateInterest.includes("voice")}
                    onChange={() => handleCheckboxChange("voice")}
                    className="h-5 w-5 text-rose-600 focus:ring-rose-500 border-slate-300 rounded"
                  />
                  <span className="ml-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    Hear their voice again
                  </span>
                </label>
                
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.recreateInterest.includes("pictures")}
                    onChange={() => handleCheckboxChange("pictures")}
                    className="h-5 w-5 text-rose-600 focus:ring-rose-500 border-slate-300 rounded"
                  />
                  <span className="ml-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    See their photos come to life
                  </span>
                </label>
                
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.recreateInterest.includes("video")}
                    onChange={() => handleCheckboxChange("video")}
                    className="h-5 w-5 text-rose-600 focus:ring-rose-500 border-slate-300 rounded"
                  />
                  <span className="ml-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    Create new video messages
                  </span>
                </label>
              </div>
            </div>

            <div>
              <textarea
                id="otherDetails"
                name="otherDetails"
                rows={3}
                value={formData.otherDetails}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all placeholder:text-slate-400"
                placeholder="Tell us about them... (optional)"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-xl">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 disabled:from-rose-400 disabled:to-orange-400 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </span>
              ) : (
                'Get Early Access'
              )}
            </button>

            <p className="text-sm text-center text-slate-500 dark:text-slate-400 pt-2">
              We'll reach out personally when we're ready
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 dark:text-slate-400">
          <p className="mb-3 text-sm">Already have recordings or photos to share?</p>
          <a 
            href="mailto:info@artoo.love"
            className="inline-flex items-center text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send them to info@artoo.love
          </a>
        </div>
      </div>
    </div>
  );
}
