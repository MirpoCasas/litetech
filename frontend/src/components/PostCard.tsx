import Link from 'next/link';
import Image from 'next/image';
import { Post, getCoverImageUrl } from '@/lib/api';
import { ChevronIcon } from './icons';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { id, attributes } = post;
  const { title, topic, readTime, coverImg } = attributes;

  const imageUrl = getCoverImageUrl(coverImg);

  return (
    <Link href={`/post/${id}`}>
      <article className="group cursor-pointer flex flex-col h-[378px] overflow-hidden">
        {/* Image with overlay content */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Area */}
        <div className="bg-white">
          {/* Tag */}
          <div className="px-6 pt-6 pb-0">
            <span className="tag">{topic}</span>
          </div>

          {/* Title and Link */}
          <div className="px-6 py-3">
            <h3 className="card-title line-clamp-2 mb-2.5 group-hover:opacity-80 transition-opacity">
              {title}
            </h3>

            <div className="flex items-center justify-between">
              {/* Read the article link */}
              <div className="link-arrow">
                <span>Read the article</span>
                <ChevronIcon />
              </div>

              {/* Read time */}
              <div className="flex items-center gap-2 text-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#8C8C8C" strokeWidth="1"/>
                  <path d="M8 4.5V8L10.5 10.5" stroke="#8C8C8C" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span>{readTime} mins</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
