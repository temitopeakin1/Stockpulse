'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market',
    author: 'Ethan R.',
    role: 'Retail Investor',
  },
  {
    quote:
      'I used to miss breakouts while switching between apps. Signalist keeps me focused on the stocks that actually matter.',
    author: 'Maya L.',
    role: 'Day Trader',
  },
  {
    quote:
      'Clean dashboard, timely alerts, and no noise. It feels like having a research assistant for my portfolio.',
    author: 'Jordan K.',
    role: 'Portfolio Manager',
  },
] as const;

const ROTATE_MS = 5000;

const AuthTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, []);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <div className="z-10 relative lg:mt-4 lg:mb-16">
      <div key={activeIndex} className="auth-testimonial-slide">
        <blockquote className="auth-blockquote">{testimonial.quote}</blockquote>
        <div className="flex items-center justify-between">
          <div>
            <cite className="auth-testimonial-author">- {testimonial.author}</cite>
            <p className="max-md:text-xs text-gray-500">{testimonial.role}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                src="/assets/icons/star.svg"
                alt="Star"
                key={star}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {TESTIMONIALS.map((item, index) => (
          <button
            key={item.author}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-6 bg-yellow-500' : 'w-1.5 bg-gray-600'
            }`}
            aria-label={`Show testimonial from ${item.author}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthTestimonials;
