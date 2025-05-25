import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { cache } from 'react'
import sizeOf from 'image-size'
import type { Handler } from 'mdast-util-to-hast'

const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
  coverImage?: string
  coverImageSize?: {
    width: number
    height: number
  }
}

export interface BlogPostPreview {
  slug: string
  title: string
  date: string
  excerpt?: string
  coverImage?: string
  coverImageSize?: {
    width: number
    height: number
  }
}

// Cache the markdown processing with a more efficient implementation
const processMarkdown = cache(async (content: string) => {
  const processedContent = await remark()
    .use(html, {
      sanitize: false
    })
    .process(content)
  return processedContent.toString()
})

// Cache the file reading with error handling
const readFile = cache((filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return ''
  }
})

// Cache the directory reading with error handling
const readDir = cache(() => {
  try {
    return fs.readdirSync(postsDirectory)
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
})

// Get image dimensions if the image is local
async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number } | null> {
  try {
    if (imagePath.startsWith('http')) return null
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const buffer = fs.readFileSync(fullPath)
    const dimensions = sizeOf(new Uint8Array(buffer))
    if (!dimensions.width || !dimensions.height) return null
    return {
      width: dimensions.width,
      height: dimensions.height,
    }
  } catch (error) {
    console.error(`Error getting image dimensions for ${imagePath}:`, error)
    return null
  }
}

// Get post metadata without processing content
export async function getPostPreview(slug: string): Promise<BlogPostPreview> {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = readFile(fullPath)
  const { data } = matter(fileContents)

  let coverImageSize: { width: number; height: number } | undefined = undefined
  if (data.coverImage) {
    const dimensions = await getImageDimensions(data.coverImage)
    if (dimensions) {
      coverImageSize = dimensions
    }
  }

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    coverImageSize
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    let coverImageSize: { width: number; height: number } | undefined = undefined
    if (data.coverImage) {
      const dimensions = await getImageDimensions(data.coverImage)
      if (dimensions) {
        coverImageSize = dimensions
      }
    }

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      content: await processMarkdown(content),
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      coverImageSize
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPostPreview[]> {
  const fileNames = readDir()
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getPostPreview(slug)
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
} 