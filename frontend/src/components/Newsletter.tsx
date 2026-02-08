'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center p-0 w-full bg-[#9C73F7]">
      <div className="flex flex-col justify-center items-center py-10 md:py-10 px-10 md:px-10 gap-7 md:gap-16 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-10 md:gap-3 w-full">
          <p className="text-white text-[27px] leading-[121%] flex-1 text-center md:text-left">
            <span className="font-normal">Sign up for our newsletter </span>
            <span className="font-semibold">and get daily updates</span>
          </p>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 md:w-[240px] h-14 px-4 bg-white text-black text-base placeholder:text-[#8C8C8C] focus:outline-none"
              style={{ fontFamily: 'Space Grotesk' }}
            />
            <button
              type="submit"
              className="w-full md:w-[152px] h-14 bg-[#D8F34E] flex items-center justify-center flex-shrink-0"
            >
              <span className="text-black text-lg font-medium leading-[135%] text-center px-8">
                Subscribe
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
