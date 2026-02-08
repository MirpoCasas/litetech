import Link from 'next/link';
import Image from 'next/image';
import { Post, getCoverImageUrl } from '@/lib/api';
import { ReactNode } from 'react';
import { ArrowIcon, ArticleIcon } from './icons';

interface ArticleGridProps {
  posts: Post[];
  newsletter?: ReactNode;
}

export default function ArticleGrid({ posts, newsletter }: ArticleGridProps) {
  const row1Posts = posts.slice(0, 3);
  const row2Posts = posts.slice(3, 5);
  const row3Posts = posts.slice(5, 8);

  return (
    <div className="flex flex-col gap-8 md:gap-[56px]">
      {/* Row 1: Portrait + 2 stacked on desktop, single column on mobile */}
      {row1Posts.length >= 3 && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-[33px]">
          <ArticleCard post={row1Posts[0]} variant="portrait" />
          <div className="flex flex-col gap-8 md:gap-[33px] flex-1">
            <ArticleCard post={row1Posts[1]} variant="landscape" />
            <ArticleCard post={row1Posts[2]} variant="landscape" />
          </div>
        </div>
      )}

      {/* Newsletter after first row */}
      {newsletter}

      {/* Row 2: 2 landscape cards on desktop, single column on mobile */}
      {row2Posts.length >= 2 && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-[33px]">
          <ArticleCard post={row2Posts[0]} variant="landscape-large" />
          <ArticleCard post={row2Posts[1]} variant="landscape-large" />
        </div>
      )}

      {/* Row 3: Portrait + 2 stacked on desktop, single column on mobile */}
      {row3Posts.length >= 3 && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-[33px]">
          <ArticleCard post={row3Posts[0]} variant="portrait" />
          <div className="flex flex-col gap-8 md:gap-[33px] flex-1">
            <ArticleCard post={row3Posts[1]} variant="landscape" />
            <ArticleCard post={row3Posts[2]} variant="landscape" />
          </div>
        </div>
      )}
    </div>
  );
}

type CardVariant = 'portrait' | 'landscape' | 'landscape-large';

const variantConfig: Record<CardVariant, {
  linkClass: string;
  articleClass: string;
  sizes: string;
  titleClass: string;
  readClass: string;
}> = {
  portrait: {
    linkClass: 'block w-full md:w-[528px] md:flex-shrink-0 group',
    articleClass: 'relative h-[378px] md:h-[790px] overflow-hidden',
    sizes: '(max-width: 768px) 100vw, 528px',
    titleClass: 'text-black font-bold text-[18px] md:text-[21px] leading-[150%] mb-2.5 line-clamp-3',
    readClass: 'flex items-center gap-1.25 text-black font-semibold text-base md:text-lg',
  },
  landscape: {
    linkClass: 'block group',
    articleClass: 'relative h-[378px] md:h-[379px] overflow-hidden',
    sizes: '(max-width: 768px) 100vw, 412px',
    titleClass: 'text-black font-bold text-lg leading-[150%] mb-2.5 line-clamp-3 md:line-clamp-4',
    readClass: 'flex items-center gap-1.25 text-black text-md font-semibold',
  },
  'landscape-large': {
    linkClass: 'block flex-1 group',
    articleClass: 'relative h-[378px] md:h-[379px] overflow-hidden',
    sizes: '(max-width: 768px) 100vw, 412px',
    titleClass: 'text-black font-bold text-lg leading-[150%] mb-2.5 line-clamp-3 md:line-clamp-4',
    readClass: 'flex items-center gap-1.25 text-black font-semibold',
  },
};

function ArticleCard({ post, variant }: { post: Post; variant: CardVariant }) {
  const { id, attributes } = post;
  const { title, topic, readTime, coverImg } = attributes;
  const imageUrl = getCoverImageUrl(coverImg);
  const config = variantConfig[variant];

  return (
    <Link href={`/post/${id}`} className={config.linkClass}>
      <article className={config.articleClass}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={config.sizes}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex">
            <div className="bg-white px-6 pt-6 pb-0">
              <span className="tag">{topic}</span>
            </div>
          </div>

          <div className="bg-white p-6 max-w-full">
            <h3 className={config.titleClass}>
              {title}
            </h3>

            <div className="flex items-center justify-between">
              <div className={config.readClass}>
                <span>Read</span>
                <ArrowIcon width={18} height={9} />
              </div>

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
