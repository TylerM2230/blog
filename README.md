# Minimal Blog

A minimal blog built with Next.js, featuring a clean homepage with clickable blog post links.

## Project Structure

```
.
├── app/
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx      # Individual blog post pages
│   ├── components/
│   │   └── posts.tsx         # Blog posts component
│   ├── global.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── content/
│   └── blog/                # Blog posts in MDX format
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## Adding New Blog Posts

1. Create a new MDX file in the `content/blog` directory with the following format:
   ```mdx
   ---
   title: "Your Post Title"
   publishedAt: "2024-02-20"
   ---

   Your post content here...
   ```

2. The post will automatically appear on the homepage as a clickable link, sorted by date (newest first).

## Features

- Clean homepage with clickable post links
- Individual blog post pages
- MDX support for rich content
- Dark mode support
- Responsive layout
- Minimal and clean design

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

- Next.js
- Tailwind CSS
- MDX
- TypeScript
