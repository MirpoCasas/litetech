import { getPosts } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroPost from '@/components/HeroPost';
import MostRead from '@/components/MostRead';
import TopicsFilter from '@/components/TopicsFilter';
import ArticleGrid from '@/components/ArticleGrid';
import Newsletter from '@/components/Newsletter';

export default async function Home() {
  const { data: posts } = await getPosts();
  const heroPost = posts[0];
  const mostReadPosts = posts.slice(1, 4);
  const gridPosts = posts.slice(1, 9);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          {/* Today Story Section */}
          <section className="pt-0 md:pt-8 pb-9 md:pb-16">
            <h2 className="text-white font-semibold text-lg mb-6 hidden md:block">Today story</h2>
            <HeroPost post={heroPost} />
          </section>

          {/* Topics Filter */}
          <TopicsFilter />

          {/* Content Section with Sidebar */}
          <section className="py-8 md:py-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-[29px]">
              {/* Main Content */}
              <div className="flex-1">
                <ArticleGrid posts={gridPosts} newsletter={<Newsletter />} />

                {/* Load More Button */}
                <div className="flex justify-center mt-9 md:mt-14">
                  <button className="btn-base btn-primary w-full md:w-auto">
                    Load more
                  </button>
                </div>
              </div>

              {/* Most viewed Sidebar - Hidden on mobile */}
              <aside className="hidden md:block md:w-[304px] md:flex-shrink-0">
                <h2 className="text-white font-semibold text-lg mb-10">Most viewed</h2>
                <MostRead posts={mostReadPosts} />
              </aside>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
