import Link from 'next/link'
import type { BlogPost } from '../lib/markdown'

interface BlogPostsProps {
  posts: BlogPost[]
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="group flex gap-8">
          <time className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap font-mono w-24">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
          <div className="flex-1">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-medium tracking-tight font-mono">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 font-mono">
                {post.excerpt || ''}
              </p>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
} 