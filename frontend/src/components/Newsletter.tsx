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
      <div className="flex flex-col md:flex-row justify-center items-center py-10 md:py-10 px-6 md:px-10 gap-7 md:gap-6 w-full max-w-[1440px]">
        <p className="text-white text-[27px] leading-[121%] text-center md:text-left md:flex-1">
          <span className="font-normal">Sign up for our newsletter </span>
          <span className="font-semibold">and get daily updates</span>
        </p>
        <button
          onClick={handleSubmit}
          className="w-full md:w-[152px] h-14 bg-[#D8F34E] flex items-center justify-center flex-shrink-0"
        >
          <span className="text-black text-lg font-medium leading-[135%] text-center px-8">
            Subscribe
          </span>
        </button>
      </div>
    </div>
  );
}
