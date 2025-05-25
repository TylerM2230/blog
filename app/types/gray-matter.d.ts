declare module 'gray-matter' {
  interface GrayMatterFile {
    data: { [key: string]: any }
    content: string
    excerpt?: string
    orig: string
  }

  interface Options {
    excerpt?: boolean | ((file: GrayMatterFile) => void)
    excerpt_separator?: string
    engines?: { [key: string]: any }
    language?: string
    delimiters?: string | [string, string]
  }

  function matter(
    input: string | Buffer,
    options?: Options
  ): GrayMatterFile

  export = matter
} 