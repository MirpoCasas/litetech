'use client';

import { useState } from 'react';

const topics = [
  'All',
  'Diversity & Inclusion',
  'Tech companies',
  'Crypto & Blockchain',
  'Space',
  'Startup',
  'Apps',
  'Gears',
];

export default function TopicsFilter() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['All', 'Crypto & Blockchain']);

  const toggleTopic = (topic: string) => {
    if (topic === 'All') {
      setSelectedTopics(['All']);
    } else {
      const newTopics = selectedTopics.filter((t) => t !== 'All');
      if (newTopics.includes(topic)) {
        const filtered = newTopics.filter((t) => t !== topic);
        setSelectedTopics(filtered.length === 0 ? ['All'] : filtered);
      } else {
        setSelectedTopics([...newTopics, topic]);
      }
    }
  };

  return (
    <section className="">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <span className="text-white font-bold text-lg">Topics</span>

        <div className="flex items-center gap-2 flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-base font-normal whitespace-nowrap flex-shrink-0
                  transition-all duration-200
                  ${isSelected
                    ? 'bg-[#D8F34E] text-black'
                    : 'border border-[#8C8C8C] text-[#8C8C8C] hover:border-white hover:text-white'
                  }
                `}
              >
                <span>{topic}</span>
                {isSelected && topic !== 'All' && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 1L9 9M9 1L1 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
