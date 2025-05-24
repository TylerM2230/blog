import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-mono tracking-tighter">
        Blog
      </h1>
      <BlogPosts />
    </section>
  )
}
