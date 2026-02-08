'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NewPostModal from './NewPostModal';
import { LogoIcon, ArrowIcon } from './icons';

interface HeaderProps {
  onPostCreated?: () => void;
  opacity?: number;
}

export default function Header({ onPostCreated, opacity = 1 }: HeaderProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsModalOpen(true);
    window.addEventListener('openNewPostModal', handler);
    return () => window.removeEventListener('openNewPostModal', handler);
  }, []);

  const handlePostCreated = () => {
    setIsModalOpen(false);
    router.refresh();
    onPostCreated?.();
  };

  return (
    <>
      <header className="w-full bg-black md:border-b border-[#333]">
        <div
          className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 md:py-6 backdrop-blur-sm"
          style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
        >
          <div className="flex items-center justify-between md:justify-between">
            <Link href="/" className="flex items-center gap-3 md:mx-0">
              {/* Logo Icon */}
              <LogoIcon width={28} height={28} className="flex-shrink-0" />
              <span className="font-semibold text-xl text-white">lite-tech</span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.25 text-white font-semibold hover:opacity-80 transition-opacity md:relative absolute right-6"
            >
              <span className="text-base font-semibold">New post</span>
              <ArrowIcon color="#D8F34E" width={18} height={9} />
            </button>
          </div>
        </div>
      </header>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePostCreated}
      />
    </>
  );
}
