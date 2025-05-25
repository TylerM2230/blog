import fs from 'fs/promises'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error('Invalid frontmatter format')
  }
  
  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    if (!line.trim()) return // Skip empty lines
    let [key, ...valueArr] = line.split(': ')
    if (!key || !valueArr.length) return // Skip invalid lines
    
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  // Validate required fields
  if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
    throw new Error('Missing required frontmatter fields')
  }

  return { metadata: metadata as Metadata, content }
}

async function getMDXFiles(dir) {
  const files = await fs.readdir(dir)
  return files.filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath) {
  const rawContent = await fs.readFile(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

async function getMDXData(dir) {
  const mdxFiles = await getMDXFiles(dir)
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const { metadata, content } = await readMDXFile(path.join(dir, file))
      const slug = path.basename(file, path.extname(file))

      return {
        metadata,
        slug,
        content,
      }
    })
  )
  return posts
}

let cachedPosts: any[] | null = null

export async function getBlogPosts() {
  if (cachedPosts) {
    return cachedPosts
  }
  
  const posts = await getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
  cachedPosts = posts
  return posts
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
