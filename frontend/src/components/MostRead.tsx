import Link from 'next/link';
import Image from 'next/image';
import { Post, getCoverImageUrl } from '@/lib/api';

interface MostReadProps {
  posts: Post[];
  startIndex?: number;
}

export default function MostRead({ posts, startIndex = 1 }: MostReadProps) {
  return (
    <div className="flex flex-col gap-3.25">
      {posts.map((post, index) => (
        <div key={post.id}>
          <MostReadCard post={post} />
          {index < posts.length - 1 && (
            <div className="w-full h-px bg-[#595959] mt-3.25" />
          )}
        </div>
      ))}
    </div>
  );
}

interface MostReadCardProps {
  post: Post;
}

function MostReadCard({ post }: MostReadCardProps) {
  const { id, attributes } = post;
  const { title, coverImg } = attributes;

  const imageUrl = getCoverImageUrl(coverImg);

  return (
    <Link href={`/post/${id}`} className="block group">
      <article className="flex flex-row justify-between items-start gap-6 w-full h-20">
        {/* Title */}
        <h4 className="text-[#8C8C8C] text-base font-semibold leading-5 flex-1 group-hover:text-white transition-colors">
          {title}
        </h4>

        {/* Thumbnail */}
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        </div>
      </article>
    </Link>
  );
}
