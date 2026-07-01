import Fuse from "fuse.js";

export interface PostMeta {
  slug: string;
  title: string;
  date?: string | Date;
  excerpt?: string;
  coverImage?: string | null;
  readingTime?: number | string;
  tags?: string[];
  [key: string]: any;
}

export function createSearchIndex(posts: PostMeta[]) {
  return new Fuse(posts, {
    keys: ["title", "excerpt", "tags"],
    threshold: 0.3,
  });
}

export function searchPosts(posts: PostMeta[], query: string) {
  if (!query) return posts;
  const index = createSearchIndex(posts);
  return index.search(query).map((result) => result.item);
}