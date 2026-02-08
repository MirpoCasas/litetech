import Link from 'next/link';
import Image from 'next/image';
import { Post, getCoverImageUrl } from '@/lib/api';

interface MostViewedProps {
    posts: Post[];
}

export default function MostViewed({ posts }: MostViewedProps) {
    // Get first 4 posts for the sidebar
    const displayPosts = posts.slice(0, 4);

    return (
        <div className="bg-white">
            <h3 className="text-xs font-semibold text-black mb-6 uppercase tracking-wide">Most viewed</h3>
            <div className="flex flex-col gap-6">
                {displayPosts.map((post, index) => (
                    <div key={post.id}>
                        <MostViewedCard post={post} />
                        {index < displayPosts.length - 1 && (
                            <div className="w-full h-px bg-[#E5E5E5] mt-6" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface MostViewedCardProps {
    post: Post;
}

function MostViewedCard({ post }: MostViewedCardProps) {
    const { id, attributes } = post;
    const { title, coverImg } = attributes;

    const imageUrl = getCoverImageUrl(coverImg);

    return (
        <Link href={`/post/${id}`} className="block group">
            <article className="flex flex-row justify-between items-start gap-4 w-full">
                {/* Title */}
                <h4 className="text-[#8C8C8C] text-sm font-normal leading-5 flex-1 group-hover:text-black transition-colors line-clamp-3">
                    {title}
                </h4>

                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded">
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
