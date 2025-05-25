'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function BlogImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height,
  priority = false 
}: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate the aspect ratio from the original dimensions
  const aspectRatio = width && height ? (height / width) * 100 : 56.25

  if (!mounted) {
    return (
      <figure className="my-8">
        <div className="relative w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
          <div 
            className="relative" 
            style={{ 
              paddingBottom: `${aspectRatio}%`,
              maxWidth: width ? `${width}px` : '100%',
              margin: '0 auto'
            }}
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
        <div 
          className="relative" 
          style={{ 
            paddingBottom: `${aspectRatio}%`,
            maxWidth: width ? `${width}px` : '100%',
            margin: '0 auto'
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            quality={100}
            priority={priority}
            className={`
              object-contain
              transition-opacity duration-300
              ${isLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoadingComplete={() => setIsLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
} 