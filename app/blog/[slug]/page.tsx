import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  let posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  }
}

export default function BlogPost({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="prose dark:prose-invert">
      <h1 className="font-mono text-2xl font-bold tracking-tight">
        {post.metadata.title}
      </h1>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
        {formatDate(post.metadata.publishedAt)}
      </div>
      <CustomMDX source={post.content} />
    </article>
  )
}
