import { getAllPosts } from '../lib/markdown'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on programming, technology, and more.',
  openGraph: {
    title: 'Blog',
    description: 'Read my thoughts on programming, technology, and more.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="text-gray-600 mt-2">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </div>
            {post.excerpt && (
              <p className="mt-4 text-gray-700">{post.excerpt}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
