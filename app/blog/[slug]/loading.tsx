export default function Loading() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <header className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </header>
      
      <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>

      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </article>
  )
} 