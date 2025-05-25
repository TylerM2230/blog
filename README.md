# Minimal Blog

A minimal blog built with Next.js, featuring a clean design and modern typography. The blog uses JetBrains Mono as its primary font for optimal readability and a distinctive monospace aesthetic.

## Project Structure

```
.
├── app/
│   ├── blog/
│   │   ├── posts/           # Blog post markdown files
│   │   └── [slug]/
│   │       └── page.tsx     # Individual blog post pages
│   ├── components/
│   │   ├── footer.tsx       # Footer component
│   │   └── posts.tsx        # Blog posts component
│   ├── global.css          # Global styles and typography
│   ├── layout.tsx          # Root layout with font configuration
│   └── page.tsx            # Homepage
├── public/
│   └── images/             # Blog post images
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## Adding New Blog Posts

1. Create a new markdown file in the `app/blog/posts` directory with the following frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   excerpt: "A brief description of your post"
   tags: ['tag1', 'tag2']
   coverImage: "/images/your-image.jpg"
   ---

   Your post content here...
   ```

2. Add any images referenced in your post to the `public/images` directory.

3. The post will automatically appear on the homepage, sorted by date (newest first).

### Post Formatting

The blog supports standard markdown formatting:

- Headings (H1-H4)
- Lists (ordered and unordered)
- Code blocks
- Blockquotes
- Images
- Links

### Typography

The blog uses a carefully tuned typography system:
- Primary font: JetBrains Mono
- Base font size: 1.125rem (18px)
- Line height: 1.75
- Responsive heading sizes
- Optimized spacing and margins

## Features

- Clean, minimal design
- Modern monospace typography
- Dark mode support
- Responsive layout
- Optimized image handling
- SEO-friendly
- Analytics integration
- Performance monitoring

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Technologies Used

- Next.js 14
- Tailwind CSS
- JetBrains Mono font
- TypeScript
- Vercel Analytics
- Vercel Speed Insights

## Styling

The blog uses a custom styling system with:
- CSS variables for consistent theming
- Responsive design patterns
- Optimized typography scales
- Dark mode support
- Custom prose styling for markdown content

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
