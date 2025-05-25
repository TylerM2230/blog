import { BlogPosts } from './components/posts'
import { getAllPosts } from './lib/markdown'

export default async function Page() {
  const posts = await getAllPosts()

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Blog
      </h1>
      <BlogPosts posts={posts} />
    </section>
  )
}
