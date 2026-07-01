import Fuse from "fuse.js";
import { PostMeta } from "./posts";

export function createSearchIndex(posts: PostMeta[]) {
  return new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "excerpt", weight: 0.3 },
      { name: "tags", weight: 0.2 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
}

export function searchPosts(posts: PostMeta[], query: string): PostMeta[] {
  if (!query.trim()) return posts;
  const fuse = createSearchIndex(posts);
  return fuse.search(query).map((r) => r.item);
}
