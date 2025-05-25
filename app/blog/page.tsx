import { getAllPosts } from '../lib/markdown'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

// Revalidate every hour
export const revalidate = 3600

// Enable incremental static regeneration
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'blog',
  description: 'Read my thoughts on programming, technology, and more.',
  openGraph: {
    title: 'blog',
    description: 'Read my thoughts on programming, technology, and more.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="text-gray-600 mt-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {post.excerpt && (
              <p className="mt-4 text-gray-700">{post.excerpt}</p>
            )}
            {post.coverImage && (
              <div className="mt-4 relative w-full h-48">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                  priority={false}
                  quality={85}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
