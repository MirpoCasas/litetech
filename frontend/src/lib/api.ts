const LITETECH_API = process.env.NEXT_PUBLIC_LITETECH_API;
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

export interface Post {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    topic: string;
    author: string;
    readTime: number;
    body: string;
    createdAt: string | null;
    updatedAt: string;
    publishedAt: string;
    coverImg: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      } | null;
    };
  };
}

export interface RelatedPost {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface PostResponse {
  data: Post;
}

export async function getPosts(): Promise<PostsResponse> {
  const res = await fetch(`${LITETECH_API}/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export async function getPost(id: string): Promise<PostResponse> {
  const res = await fetch(`${LITETECH_API}/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export async function getRelatedPosts(): Promise<RelatedPost[]> {
  try {
    const res = await fetch(`${BACKEND_API}/posts/related`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    // Backend not available, return empty array
    return [];
  }
}

export async function createRelatedPost(
  formData: FormData,
  signal?: AbortSignal,
): Promise<RelatedPost> {
  const res = await fetch(`${BACKEND_API}/posts/related`, {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!res.ok) {
    throw new Error('Failed to create post');
  }

  return res.json();
}

export function getCoverImageUrl(coverImg: Post['attributes']['coverImg']): string {
  const coverImgUrl = coverImg?.data?.attributes?.url;
  if (!coverImgUrl) return '/placeholder.jpg';
  if (coverImgUrl.startsWith('http')) return coverImgUrl;
  const baseUrl = (LITETECH_API || 'https://lite-tech-api.litebox.ai/api').replace(/\/api\/?$/, '');
  return `${baseUrl}${coverImgUrl}`;
}
