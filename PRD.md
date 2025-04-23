# Product Requirements Document: Michael Warf’s Thought Leadership Blog

Below is a detailed translation of the UX best practices outlined into specific requirements for implementing Michael Warf’s thought leadership blog. These requirements are tailored to his focus on video production, digital strategy, creative entrepreneurship, and photography, with a regional emphasis on Lethbridge. They include actionable implementation details using AstroJS, Tailwind CSS, Shadcn, and Cloudflare, ensuring a user-friendly, engaging, and authoritative platform.

---

## 1. Core Features

### 1.1 Video Integration
- **Purpose**: Embed videos (tutorials, behind-the-scenes, interviews) to leverage Michael’s video production expertise, as 72% of buyers prefer video over text.
- **Implementation**: Use AstroJS’s `<iframe>` support or `astro-embed` for YouTube/Vimeo integration. Ensure videos are responsive with Tailwind’s `aspect-video` class and lazy-loaded via Astro’s `loading="lazy"`.
- **Details**: Add captions or transcripts (WCAG compliance) and optimize with structured data (`VideoObject` schema) for SEO.

### 1.2 Author Visibility
- **Purpose**: Build trust by prominently displaying Michael’s bio, photo, and social media links.
- **Implementation**: Create an Astro component (`AuthorBio.astro`) for reuse in the sidebar or footer. Style with Tailwind (e.g., `flex items-center gap-4`) and Shadcn’s avatar component for the photo. **[Partially Implemented: Bio added to blog post frontmatter and displayed in `BlogLayout.astro`. Component creation pending.]**
- **Details**: Include links to LinkedIn, X (@warfeous), and Instagram, ensuring a consistent design across pages.

### 1.3 Categories and Tags
- **Purpose**: Organize content (e.g., "Video Storytelling," "Photography") for easy navigation.
- **Implementation**: Use AstroJS content collections to define categories and tags. Generate dynamic routes (e.g., `/category/video-storytelling`) and list pages with Tailwind-styled filters (e.g., `btn btn-outline`). **[Partially Implemented: Schema updated, first post tagged/categorized, display added to `BlogLayout.astro`. Dynamic routes/filtering pending.]**
- **Details**: Ensure clickable tags link to filtered post lists, enhancing usability.

### 1.4 Search Functionality
- **Purpose**: Allow users to quickly find relevant content.
- **Implementation**: Integrate `Pagefind` or `Fuse.js` for static site search. Style the search bar with Shadcn’s input component and Tailwind (e.g., `w-full max-w-md`).
- **Details**: Index post titles, excerpts, and tags for accurate results, optimized for Cloudflare delivery.

### 1.5 Newsletter Signup
- **Purpose**: Offer updates subtly without disrupting UX.
- **Implementation**: Embed a Mailchimp or ConvertKit form in the footer using Astro’s `<Fragment>`. Style with Tailwind (e.g., `p-4 bg-gray-100`) for a non-intrusive look.
- **Details**: Include a value proposition (e.g., "Stay updated on creative insights") and avoid pop-ups.

### 1.6 Social Sharing
- **Purpose**: Amplify reach on LinkedIn, X, and Instagram.
- **Implementation**: Add `astro-social-share` or custom buttons with Tailwind (e.g., `btn btn-sm`). Place at the end of posts and in the sidebar.
- **Details**: Ensure buttons open in new tabs (`target="_blank"`) and track shares if analytics are added.

### 1.7 Comments Section
- **Purpose**: Foster discussion and engagement.
- **Implementation**: Integrate Disqus or Hyvor Talk via Astro’s script injection. Enable moderation in the chosen platform’s dashboard.
- **Details**: Style with Tailwind to match the blog’s aesthetic and filter spam automatically.

### 1.8 Accessibility Features
- **Purpose**: Ensure inclusivity per WCAG 2.1 AA standards.
- **Implementation**: Use semantic HTML (`<nav>`, `<article>`), Tailwind’s contrast utilities (e.g., `text-gray-900 bg-white`), and ARIA labels. Test with Lighthouse.
- **Details**: Support keyboard navigation and screen readers, with alt text for all visuals.

---

## 2. Architecture

### 2.1 Home Page
- **Purpose**: Welcome visitors and showcase recent content.
- **Implementation**: Use AstroJS to fetch recent posts from the content collection. Design a hero section with Tailwind (e.g., `bg-cover h-96`) and a CTA button (Shadcn’s `button`).
- **Details**: List 3–5 recent posts with thumbnails, titles, and excerpts in a grid layout.

### 2.2 About Page
- **Purpose**: Establish Michael’s credibility.
- **Implementation**: Create a static Astro page with MDX for rich content (e.g., embedded photos). Use Tailwind for layout (e.g., `prose max-w-3xl`). **[Implemented: Page exists at `src/pages/about.astro`, content added.]**
- **Details**: Include bio, Coalbanks Creative background, and blog mission, with social links.

### 2.3 Blog Page
- **Purpose**: Provide an overview of all posts.
- **Implementation**: Generate a dynamic page with Astro’s content collections. Use Tailwind’s grid (e.g., `grid grid-cols-1 md:grid-cols-3`) and Shadcn cards for posts.
- **Details**: Add category/tag filters above the list, styled as buttons.

### 2.4 Individual Post Pages
- **Purpose**: Deliver full content with engagement options.
- **Implementation**: Use Astro’s static generation for each post. Include related posts via tag matching and social sharing buttons.
- **Details**: Format with MDX, optimize with meta tags (e.g., Open Graph), and suggest 2–3 related posts.

### 2.5 Video Page
- **Purpose**: Centralize video content.
- **Implementation**: Create a dynamic page filtering video-tagged posts or a separate collection. Use Tailwind’s video grid (e.g., `grid gap-6`).
- **Details**: Categorize by type (e.g., tutorials, interviews) with thumbnails and descriptions.

### 2.6 Contact Page
- **Purpose**: Facilitate reader inquiries.
- **Implementation**: Build a form with Shadcn components (e.g., `input`, `textarea`) and handle submissions via Cloudflare Workers or Formspree.
- **Details**: Keep fields minimal (name, email, message) and confirm submission with a success message.

### 2.7 Resources Page (Optional)
- **Purpose**: Share valuable tools or guides.
- **Implementation**: Use a static Astro page with Tailwind-styled sections (e.g., `card p-6`). Link to downloadable PDFs or external tools.
- **Details**: Organize by topic (e.g., "Video Editing Tools") with brief descriptions.

---

## 3. Layout and Design

### 3.1 Responsive Design
- **Purpose**: Ensure usability across devices.
- **Implementation**: Leverage Tailwind’s responsive prefixes (e.g., `sm:`, `md:`) for adaptive layouts. Test with browser dev tools.
- **Details**: Prioritize mobile-first design with breakpoints at 640px, 768px, and 1024px.

### 3.2 Clean and Minimalist Layout
- **Purpose**: Enhance readability and focus on content.
- **Implementation**: Use Tailwind’s spacing utilities (e.g., `p-6`, `my-8`) and a simple typography scale (e.g., `text-base`, `text-2xl`).
- **Details**: Limit colors to a brand palette (e.g., 3–4 shades) and avoid excessive decorations.

### 3.3 High-Quality Imagery
- **Purpose**: Reflect Michael’s photography and video skills.
- **Implementation**: Optimize images with Astro’s `<Image>` component or Cloudflare’s resizing. Use `srcset` for responsive delivery.
- **Details**: Ensure images are 72–96 DPI, compressed, and paired with descriptive alt text.

### 3.4 Consistent Branding
- **Purpose**: Reinforce Coalbanks Creative’s identity.
- **Implementation**: Customize Tailwind’s config with brand colors (e.g., `primary: #1a3c34`) and fonts (e.g., Inter). Add the logo in the header.
- **Details**: Apply branding to buttons, links, and headers consistently.

### 3.5 Fast Loading Times
- **Purpose**: Improve UX and SEO.
- **Implementation**: Enable Cloudflare’s caching and minification. Use Astro’s asset optimization and lazy-loading for media.
- **Details**: Aim for a Lighthouse performance score of 90+ with compressed assets.

### 3.6 Dark Mode Option
- **Purpose**: Enhance reader comfort.
- **Implementation**: Use Tailwind’s `dark:` prefix (e.g., `dark:bg-gray-900`) and a Shadcn toggle switch for mode switching.
- **Details**: Store preference in local storage and default to system settings.

### 3.7 SEO Optimization
- **Purpose**: Boost visibility for terms like "video production Lethbridge."
- **Implementation**: Add meta tags via Astro’s `<head>` (e.g., `<meta name="description">`) and JSON-LD structured data (e.g., `BlogPosting`). **[Partially Implemented: Default site title/description set in `HeadSEO.astro`. Page-specific tags and structured data pending.]**
- **Details**: Use keyword-rich titles and alt text, validated with an SEO tool.

### 3.8 Accessibility
- **Purpose**: Meet WCAG standards.
- **Implementation**: Ensure 4.5:1 contrast ratios (e.g., Tailwind’s `text-black` on `bg-white`), use semantic HTML, and add ARIA where needed.
- **Details**: Test with screen readers (e.g., NVDA) and keyboard-only navigation.

---

## Example Implementation: Home Page Template

Here’s a sample AstroJS template for the home page to illustrate the requirements:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro'; // Assuming Layout is BaseLayout
import AuthorBio from '../components/AuthorBio.astro'; // Needs creation

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
).slice(0, 5);
---

<Layout title="Michael Warf | Creative Insights from Lethbridge">
  <!-- Hero Section -->
  <section class="bg-cover h-96 flex items-center justify-center text-white" style="background-image: url('/hero-image.jpg')">
    <div class="text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Insights on Video, Creativity, and Digital Strategy</h1>
      <p class="text-xl mb-6">From Lethbridge, by Michael Warf</p>
      <a href="/blog" class="btn btn-primary px-6 py-3">Read Latest Posts</a>
    </div>
  </section>

  <!-- Recent Posts -->
  <section class="container mx-auto my-12 px-4">
    <h2 class="text-3xl font-semibold mb-8">Recent Posts</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map(post => (
        <article class="card bg-base-100 shadow-md p-4 border border-base-300 rounded-lg"> {/* Adjusted classes for Shadcn/Tailwind */}
          {post.data.thumbnail && (
            <img src={post.data.thumbnail} alt={post.data.title} class="w-full h-48 object-cover mb-4 rounded-md" loading="lazy" />
          )}
          <h3 class="text-xl font-medium mb-2">{post.data.title}</h3>
          <p class="text-base-content/80">{post.data.excerpt}</p> {/* Adjusted text color */}
          <a href={`/blog/${post.slug}`} class="text-primary mt-2 inline-block hover:underline">Read More</a>
        </article>
      ))}
    </div>
  </section>

  <!-- Author Bio -->
  <!-- <AuthorBio /> --> {/* Uncomment when component exists */}
</Layout>

<style>
  .btn-primary {
    @apply bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition px-6 py-3; /* Shadcn button style */
  }
</style>
```

---

## Conclusion

These requirements ensure Michael Warf’s blog is user-friendly, engaging, and optimized for his audience of creative professionals, business owners, and community stakeholders. By integrating video content, maintaining a clean and accessible design, and leveraging his regional expertise, the blog will establish him as a thought leader in his niches. The AstroJS, Tailwind, Shadcn, and Cloudflare stack supports a fast, modern implementation aligned with these goals.
