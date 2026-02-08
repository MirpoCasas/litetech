import Image from 'next/image';
import { RelatedPost } from '@/lib/api';
import { ArrowIcon, ArticleIcon } from './icons';

interface RelatedPostCardProps {
  post: RelatedPost;
}

export default function RelatedPostCard({ post }: RelatedPostCardProps) {
  const { title, imageUrl } = post;

  // Extract topic from title or use default
  const topic = title.includes('Crypto') ? 'Crypto' :
    title.includes('Security') || title.includes('Police') ? 'Security' :
      'Tech companies';

  // Mock read time - you can add this to your API later
  const readTime = 6;

  return (
    <div className="block flex-1 w-full md:w-auto group">
      <article className="relative h-[378px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Content Overlay at bottom */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Tag Container with white background */}
          <div className="flex">
            <div className="bg-white px-6 pt-6 pb-0">
              <span className="tag">{topic}</span>
            </div>
          </div>

          {/* Title and Link Container */}
          <div className="bg-white p-3 md:p-6">
            <h3 className="text-lg font-bold leading-[150%] text-black line-clamp-3 mb-2.5 group-hover:opacity-80 transition-opacity">
              {title}
            </h3>

            <div className="flex items-center justify-between">
              {/* Read link */}
              <div className="flex items-center gap-0.5">
                <span className="text-base font-semibold text-black">Read</span>
                <ArrowIcon width={18} height={9} />
              </div>

              {/* Read time */}
              <div className="flex items-center gap-2">
                <ArticleIcon width={16} height={16} />
                <span className="text-sm text-[#595959] font-normal leading-[160%]">{readTime} mins</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
