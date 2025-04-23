# Knowledge Transfer: Michael Warf's Thought Leadership Blog

This document provides an overview of the project structure, key technologies, and development practices for Michael Warf's thought leadership blog website. It's intended to help onboard new developers or contributors.

## 1. Project Setup

*   **Prerequisites:** Node.js v18+ and pnpm.
*   **Cloning:** `git clone --depth=1 https://github.com/AREA44/astro-shadcn-ui-template` (or the actual repo URL if different)
*   **Installation:** `cd <project-directory>` and run `pnpm install`.
*   **Development Server:** Run `pnpm dev` to start the local development server (usually at `http://localhost:4321`).

## 2. Key Technologies

*   **[Astro](https://astro.build):** The core framework used for building this static site. Handles routing, content collections, component integration, and build optimization.
*   **[React](https://react.dev/):** Used for interactive UI components (Astro Islands) via Astro's React integration.
*   **[Tailwind CSS](https://tailwindcss.com):** A utility-first CSS framework used for all styling. Configuration is in `tailwind.config.js`. Global styles are in `src/styles/global.css`.
*   **[Shadcn UI](https://ui.shadcn.com):** Provides the base components (built with Radix UI and Tailwind). Components are added individually to the `src/components/ui/` directory using the Shadcn CLI or manual copying. Key custom/Shadcn components currently include `Header1.tsx`, `Footer.tsx`, and `ThemeToggle.tsx`. See `README.md` for more details on adding components.
*   **[MDX](https://mdxjs.com/):** Used for writing blog post content (`.mdx` files), allowing the use of React components directly within Markdown.

## 3. Project Structure Overview

```
/
├── public/             # Static assets (images, fonts, favicon)
├── src/
│   ├── components/     # Reusable Astro/React components
│   │   ├── ui/         # Shadcn UI components
│   ├── content/        # Astro Content Collections
│   │   ├── blog/       # Blog posts (.mdx)
│   │   └── config.ts   # Schema definitions for collections
│   ├── layouts/        # Base page layouts (BaseLayout, BlogLayout)
│   ├── lib/            # Utility functions, constants (e.g., utils.ts)
│   ├── pages/          # Astro pages/routes (index.astro, about.astro, blog/[...slug].astro)
│   └── styles/         # Global CSS, fonts
├── astro.config.ts     # Astro configuration
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── README.md           # Project overview and setup
├── PRD.md              # Product Requirements Document
├── TODO.md             # Task tracking
└── knowledgetransfer.md # This file
```

*   **Layouts (`src/layouts/`):** Define the overall page structure (header, footer, main content area). `BaseLayout.astro` is the main layout, and `BlogLayout.astro` extends it for blog posts.
*   **Pages (`src/pages/`):** Define the site's routes. Files map directly to URL paths (e.g., `src/pages/about.astro` becomes `/about`). Dynamic routes like `src/pages/blog/[...slug].astro` handle individual blog posts.
*   **Components (`src/components/`):** Reusable UI elements. Astro components (`.astro`) are server-rendered by default. React components (`.tsx`) in `src/components/ui/` are often used as interactive islands (`client:load`, `client:idle`, etc.).
*   **Content Collections (`src/content/`):** Managed by Astro. `config.ts` defines the schema (metadata) for collections like 'blog'. `.mdx` files contain the actual content and frontmatter matching the schema.

## 4. Content Management

*   **Adding Blog Posts:** Create a new `.mdx` file in `src/content/blog/`.
*   **Frontmatter:** Ensure the frontmatter (the section between `---`) matches the schema defined in `src/content/config.ts`. Key fields include `title`, `pubDate`, `description`, `author`, `authorBio` (optional), `category`, and `tags` (optional array).
*   **Schema Updates:** If new metadata fields are needed, update the `blogSchema` in `src/content/config.ts`.

## 5. Styling Approach

*   **Tailwind CSS:** Primary styling method using utility classes directly in `.astro` and `.tsx` files.
*   **Global Styles:** Base styles and font imports are in `src/styles/global.css` and `src/styles/fonts.css`.
*   **Shadcn UI:** Components come pre-styled with Tailwind. Customizations can be made directly in the component files within `src/components/ui/`.
*   **Dark Mode:** Handled via Tailwind's `dark:` variant, configured in `tailwind.config.js` and typically toggled by a component like `ThemeToggle`.

## 6. Deployment

*   *(Add details here when deployment is configured - e.g., Vercel, Netlify, Cloudflare Pages)*
*   Build command: `pnpm build`
*   Output directory: `dist/`

---

*This document should be kept up-to-date as the project evolves.*
