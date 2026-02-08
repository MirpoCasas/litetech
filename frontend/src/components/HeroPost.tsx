import Link from 'next/link';
import Image from 'next/image';
import { Post, getCoverImageUrl } from '@/lib/api';
import { ArrowIcon, ArticleIcon } from './icons';

interface HeroPostProps {
  post: Post;
}

export default function HeroPost({ post }: HeroPostProps) {
  const { id, attributes } = post;
  const { title, topic, readTime, coverImg } = attributes;

  const imageUrl = getCoverImageUrl(coverImg);

  return (
    <Link href={`/post/${id}`} className="block group">
      <article className="relative h-[378px] md:h-[348px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 900px"
          priority
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Tag Container with black background */}
          <div className="flex">
            <div className="bg-black px-6 pt-6 pb-0">
              <span className="tag">{topic}</span>
            </div>
          </div>

          {/* Title and Link Container */}
          <div className="bg-black px-6 py-3 md:p-6 max-w-full md:max-w-[560px]">
            <h2 className="text-white font-bold text-[18px] md:text-[41px] leading-[150%] md:leading-[130%] mb-2.5">
              {title}
            </h2>

            <div className="flex items-center justify-between">
              {/* Read Link */}
              <div className="flex items-center gap-1.25 text-white font-semibold">
                <span>Read</span>
                <ArrowIcon width={18} height={9} />
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-[#595959] text-sm">
                <ArticleIcon width={16} height={16} />
                <span>{readTime} mins</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
