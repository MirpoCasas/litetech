import Image from 'next/image';
import Link from 'next/link';
import { getPost, getRelatedPosts, getPosts, getCoverImageUrl } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPosts from '@/components/RelatedPosts';
import SocialShare from '@/components/SocialShare';
import MostViewed from '@/components/MostViewed';
import { ChevronIcon, ArticleIcon } from '@/components/icons';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

const STATIC_MARKDOWN_CONTENT = `
# Curabitur sit amet sapien at velit fringilla tincidunt porttitor eget lacus. Sed mauris libero,
malesuada et venenatis vitae, porta ac enim. Curabitur sit amet sapien at velit fringilla
tincidunt porttitor eget lacus. Sed mauris libero, malesuada et venenatis vitae, porta ac enim.
Aliquam erat volutpat. Cras tristique eleifend dolor, et ultricies nisl feugiat sed. Pellentesque
blandit orci eu velit vehicula commodo. Phasellus imperdiet finibus ex eget gravida. Maecenas
vitae molestie dolor. Nulla hendrerit ipsum leo, in tempor urna interdum ut. Sed molestie sodales
quam. Mauris sollicitudin metus at eros imperdiet, vitae pulvinar nunc condimentum. Pellentesque
rhoncus, lacus sit amet mollis placerat, nulla lectus maximus justo, quis gravida elit augue id.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image.png)

# Pellentesque venenatis arcu lectu Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta
dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet
purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed
placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.
Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante
euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,
elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.

![imagen blog](https://litetech-assets.s3.us-east-2.amazonaws.com/Image2.png)

> Commodo eget mi. In orci nunc, laoreet eleifend sem vel, suscipitlon lorem ipsum
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem in nunc porttitor dapibus a sollicitudin nunc. Sed lacinia nisl a magna congue, maximus tristique tellus finibus.

# Nullam tristique tellus purus Maecenas iaculis et dolor ac laoreet. Curabitur placerat porta
dolor. Quisque consectetur vitae odio ac posuere. Nullam tristique tellus purus, quis aliquet
purus sodales sed. Sed hendrerit gravida augue luctus suscipit. Maecenas id faucibus magna. Sed
placerat orci ac orci blandit, at porta ante ornare. Praesent tristique sollicitudin fringilla.
Morbi at laoreet enim, sed viverra ligula. Sed laoreet, elit vel faucibus semper, urna ante
euismod sem, accumsan volutpat augue ante ut elit. Phasellus rutrum, nulla vitae euismod blandit,
elit nisi placerat neque, vitae facilisis massa sapien a mi. Fusce sit amet blandit lectus.
`;

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={elements.length} className="text-base text-[#595959] leading-[170%] mb-3">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      const text = blockquoteLines.join(' ').trim();
      elements.push(
        <div key={elements.length} className="px-0 md:px-4 my-6">
          <blockquote className="border-l-[4px] border-[#D8F34E] pl-4 py-4">
            <p className="text-[19px] font-bold text-black leading-[150%]">
              {text}
            </p>
          </blockquote>
        </div>
      );
      blockquoteLines = [];
      inBlockquote = false;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('# ')) {
      flushParagraph();
      flushBlockquote();
      elements.push(
        <h2 key={elements.length} className="text-[19px] font-bold text-black mt-3 mb-3 leading-[150%]">
          {trimmedLine.slice(2)}
        </h2>
      );
    } else if (trimmedLine.startsWith('![')) {
      flushParagraph();
      flushBlockquote();
      const match = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <div key={elements.length} className="my-6">
            <Image
              src={src}
              alt={alt || 'Blog image'}
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>
        );
      }
    } else if (trimmedLine.startsWith('>')) {
      flushParagraph();
      inBlockquote = true;
      blockquoteLines.push(trimmedLine.slice(1).trim());
    } else if (trimmedLine === '') {
      if (inBlockquote) {
        flushBlockquote();
      } else {
        flushParagraph();
      }
    } else {
      if (inBlockquote) {
        blockquoteLines.push(trimmedLine);
      } else {
        currentParagraph.push(trimmedLine);
      }
    }
  }

  flushParagraph();
  flushBlockquote();

  return elements;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const { data: post } = await getPost(id);
  const relatedPosts = await getRelatedPosts();
  const { data: allPosts } = await getPosts();

  const { attributes } = post;
  const { title, topic, author, readTime, coverImg } = attributes;

  const imageUrl = getCoverImageUrl(coverImg);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header opacity={0.8} />

      <main className="flex-1">
        {/* Hero Image with Title Overlay */}
        <div className="relative w-full h-[488px] md:h-[677px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Title Card Container */}
          <div className="absolute bottom-0 left-0 right-0 md:bottom-12 md:left-12 md:right-auto flex flex-col items-center md:items-start px-6 md:px-0 pb-10 md:pb-0 gap-6">
            {/* Back Button/Breadcrumbs */}
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity self-start">
              <ChevronIcon color="white" className="transform rotate-180" />
              <span className="text-sm font-semibold">Blog</span>
            </Link>

            {/* White Card */}
            <div className="w-full md:w-[528px] flex flex-col">
              {/* Author Section */}
              <div className="bg-white flex items-center gap-2 px-4 md:px-6 pt-4 md:pt-6 pb-0 w-fit">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm">
                  {author.charAt(0)}
                </div>
                <span className="text-lg md:text-xl text-[#595959] font-normal leading-[150%]">By {author}</span>
              </div>

              {/* Title and Read Time Section */}
              <div className="bg-white px-4 md:px-6 py-4 md:py-6 flex flex-col gap-[10px]">
                {/* Title */}
                <h1 className="text-[25px] md:text-[35px] font-bold text-black leading-[120%]">
                  {title}
                </h1>

                {/* Read Time */}
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-2">
                    <ArticleIcon width={16} height={16} />
                    <span className="text-sm text-[#595959] font-normal leading-[150%]">{readTime} mins read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content Container */}
        <div className="py-10 md:py-16 px-6 md:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex gap-12 items-start justify-between">
              {/* Social Share Sidebar - Left */}
              <aside className="hidden lg:block w-[100px] flex-shrink-0 pt-8">
                <div className="sticky top-6">
                  <SocialShare />
                </div>
              </aside>

              {/* Main Article Content */}
              <div className='flex gap-7.5 w-full lg:w-auto'>
                <article className="flex-1 w-full lg:max-w-[641px] bg-white">
                  {/* Static Markdown Content */}
                  <div className="prose-content">
                    {renderMarkdown(STATIC_MARKDOWN_CONTENT)}
                  </div>

                  {/* Mobile Social Share */}
                  <div className="lg:hidden mt-16">
                    <SocialShare />
                  </div>
                </article>

                {/* Most Viewed Sidebar - Right */}
                <aside className="hidden lg:block w-[300px] flex-shrink-0 pt-8">
                  <div className="sticky top-6">
                    <MostViewed posts={allPosts} />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <RelatedPosts posts={relatedPosts} />
      </main>

      <Footer />
    </div>
  );
}
