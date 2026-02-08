'use client';

import { RelatedPost } from '@/lib/api';
import RelatedPostCard from './RelatedPostCard';
import { ChevronIcon } from './icons';

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col items-start py-10 md:py-16 gap-2.5 bg-white">
      <div className="max-w-[1088px] mx-auto w-full px-6">
        {/* Header with title and New post link */}
        <div className="flex flex-row justify-between items-center mb-6 w-full">
          <h2 className="font-bold text-[25px] md:text-[35px] leading-[120%] text-black">
            Related posts
          </h2>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openNewPostModal'))}
            className="flex flex-col justify-center items-center gap-0.5 hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-row items-center gap-0.5">
              <span className="text-base font-semibold text-black">New post</span>
              <ChevronIcon className="flex-shrink-0" />
            </div>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row items-start gap-8 mt-6 md:mt-10">
          {posts.slice(0, 3).map((post) => (
            <RelatedPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
