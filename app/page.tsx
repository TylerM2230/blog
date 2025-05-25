import { BlogPosts } from './components/posts'
import { getAllPosts } from './lib/markdown'
import { Suspense } from 'react'
import type { Metadata } from 'next'

// Revalidate every hour
export const revalidate = 3600

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Blog',
  description: 'A collection of thoughts and ideas',
  openGraph: {
    title: 'Blog',
    description: 'A collection of thoughts and ideas',
    type: 'website',
  },
}

export default async function Page() {
  const posts = await getAllPosts()

  return (
    <section className="min-h-screen">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Blog
      </h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogPosts posts={posts} />
      </Suspense>
    </section>
  )
}
