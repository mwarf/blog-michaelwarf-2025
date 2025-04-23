# Blog Implementation TODO List

This list tracks the features and tasks required to implement Michael Warf's Thought Leadership Blog based on the `PRD.md`.

## Core Features

- [ ] **1.1 Video Integration**:
    - [ ] Choose and implement video embedding method (`<iframe>` or `astro-embed`).
    - [ ] Ensure responsiveness (`aspect-video`) and lazy loading (`loading="lazy"`).
    - [ ] Add captions/transcripts for videos.
    - [ ] Implement `VideoObject` schema markup.
- [x] **1.2 Author Visibility**: **[Complete]**
    - [x] Create `src/components/AuthorBio.astro` component.
    - [x] Style with Tailwind and Shadcn Avatar.
    - [x] Include bio, photo, and social links (LinkedIn, X, Instagram).
    - [x] Integrate Author Bio display into `BlogLayout.astro`.
    - [x] Integrate `AuthorBio.astro` into relevant layouts/pages (e.g., sidebar, footer, About page). -> Added to About page.
- [x] **1.3 Categories and Tags**: **[Partially Complete]**
    - [x] Update `src/content/config.ts` to include `category` and `tags` fields in the blog schema.
    - [x] Add category/tags to the first blog post.
    - [x] Display category/tags in `BlogLayout.astro`.
    - [x] Implement dynamic routes for category/tag archive pages (e.g., `/category/[category].astro`, `/tag/[tag].astro`). **[Complete]**
    - [x] Add filtering UI to the main Blog page (`/blog`). **[Complete - See 2.3]**
    - [x] Ensure tags on post pages link to tag archive pages. **[Complete]**
- [ ] **1.4 Search Functionality**:
    - [ ] Choose search solution (`Pagefind` or `Fuse.js`).
    - [ ] Integrate the chosen search library.
    - [ ] Create and style a search input component (using Shadcn Input).
    - [ ] Configure indexing (titles, excerpts, tags).
- [ ] **1.5 Newsletter Signup**:
    - [ ] Choose newsletter provider (Mailchimp/ConvertKit).
    - [ ] Create signup form component.
    - [ ] Embed form in the footer using `<Fragment>`.
    - [ ] Style form non-intrusively with Tailwind.
    - [ ] Add value proposition text.
- [ ] **1.6 Social Sharing**: **[In Progress - Custom Buttons]**
    - [x] Choose implementation (`astro-social-share` or custom buttons). -> Chose Custom
    - [x] Add sharing buttons to individual post pages (end of post, sidebar?). -> Added after content
    - [x] Style buttons with Tailwind.
    - [ ] Ensure links open in new tabs.
    - [ ] (Optional) Implement share tracking if analytics are used.
- [ ] **1.7 Comments Section**:
    - [ ] Choose comment platform (Disqus/Hyvor Talk).
    - [ ] Integrate platform using script injection in post layout.
    - [ ] Configure moderation settings on the chosen platform.
    - [ ] Style comment section to match blog theme.
- [ ] **1.8 Accessibility Features**:
    - [ ] Review semantic HTML usage across all components and pages.
    - [ ] Add necessary ARIA labels.
    - [ ] Test keyboard navigation thoroughly.
    - [ ] Test with screen readers (NVDA/VoiceOver).
    - [ ] Ensure all images have descriptive alt text.
    - [ ] Run Lighthouse accessibility audits and address issues.

## Architecture

- [x] **2.1 Home Page (`src/pages/index.astro`)**: **[Complete]**
    - [x] Implement custom Hero section (background image, title, subtitle, CTA button).
    - [x] Fetch and display 3-5 recent posts.
    - [x] Implement grid layout for recent posts (using Tailwind/Shadcn cards).
    - [x] Add thumbnails, titles, excerpts to post previews.
    - [ ] (Consider adding `AuthorBio` here or in footer).
- [x] **2.2 About Page (`src/pages/about.astro`)**:
    - [x] Update content: Add full bio.
    - [ ] Embed relevant photos using MDX.
    - [ ] Ensure social links are present (possibly via `AuthorBio`).
    - [x] Style with Tailwind `prose`.
- [x] **2.3 Blog Page (`src/pages/blog/index.astro`)**: **[Complete]**
    - [x] Implement grid layout (e.g., `grid-cols-1 md:grid-cols-3`).
    - [x] Use Shadcn Card components for post previews.
    - [x] Add category/tag filtering UI above the post list. (Implemented via `BlogFilterControls.tsx`)
- [ ] **2.4 Individual Post Pages (`src/layouts/BlogLayout.astro`)**:
    - [ ] Implement "Related Posts" section (based on tags).
    - [x] Integrate Social Sharing buttons (see 1.6).
    - [ ] Integrate Comments section (see 1.7).
    - [ ] Ensure Open Graph and other meta tags are optimized in `HeadSEO`.
- [ ] **2.5 Video Page**:
    - [ ] Create new page (e.g., `src/pages/videos.astro`).
    - [ ] Implement logic to filter posts tagged as 'video' or from a dedicated 'video' collection.
    - [ ] Create grid layout for videos.
    - [ ] Add categorization/filtering if needed (tutorials, interviews).
- [ ] **2.6 Contact Page**:
    - [ ] Create new page (e.g., `src/pages/contact.astro`).
    - [ ] Build contact form using Shadcn components (`input`, `textarea`, `button`).
    - [ ] Choose and implement form submission backend (Cloudflare Workers/Formspree).
    - [ ] Add submission success message.
- [ ] **2.7 Resources Page (Optional)**:
    - [ ] Create new static page if desired.
    - [ ] Add content (links, descriptions).
    - [ ] Style with Tailwind sections/cards.

## Layout and Design

- [ ] **3.1 Responsive Design**:
    - [ ] Test all pages and components across different screen sizes (mobile, tablet, desktop).
    - [ ] Adjust Tailwind classes (`sm:`, `md:`, `lg:`) as needed.
- [ ] **3.2 Clean and Minimalist Layout**:
    - [ ] Review spacing, typography, and element usage for consistency and readability.
    - [ ] Ensure adherence to the defined brand palette.
- [ ] **3.3 High-Quality Imagery**:
    - [ ] Implement Astro `<Image>` component or Cloudflare resizing for all site images (logo, thumbnails, content images).
    - [ ] Ensure `srcset` is used effectively.
    - [ ] Compress images appropriately.
    - [ ] Add descriptive `alt` text to all images.
- [ ] **3.4 Consistent Branding**:
    - [ ] Update `tailwind.config.js` with specific brand colors (e.g., `primary: #1a3c34`) and fonts (e.g., Inter).
    - [ ] Add the site logo to the Header component (`src/components/ui/Header1.tsx`).
    - [ ] Update the Footer component (`src/components/ui/Footer.tsx`) with correct branding, links, and copyright info.
    - [ ] Ensure buttons, links, and other elements use brand styles consistently.
- [ ] **3.5 Fast Loading Times**:
    - [ ] Configure Cloudflare caching and minification.
    - [ ] Leverage Astro's built-in asset optimization.
    - [ ] Ensure lazy loading is applied to images and videos.
    - [ ] Audit performance with Lighthouse and aim for 90+.
- [ ] **3.6 Dark Mode Option**:
    - [ ] Implement theme toggle switch (likely using Shadcn Toggle/Switch in Header/Footer).
    - [ ] Ensure all components and pages have appropriate `dark:` styles in Tailwind.
    - [x] Implement logic to store preference in local storage and respect system preference. (Added inline script to BaseLayout.astro head to prevent FOUC)
    - [ ] Test thoroughly in both light and dark modes.
- [ ] **3.7 SEO Optimization**:
    - [ ] Review and enhance meta tags (`title`, `description`) in `HeadSEO` for all page types.
    - [x] Set default site title and description in `HeadSEO.astro`.
    - [ ] Implement JSON-LD structured data (`BlogPosting`, `VideoObject`, `Person`/`Organization`).
    - [ ] Ensure keyword usage in titles, headings, and alt text is natural and relevant.
    - [ ] Validate structured data.
- [ ] **3.8 Accessibility**: (Covered mostly by 1.8)
    - [ ] Double-check contrast ratios (aim for 4.5:1).

---

## Phase 2: Potential Enhancements

This section outlines features and improvements to consider after the initial core functionality is stable.

### Content & Engagement

- [ ] **Video Integration (Full)**: Implement robust video embedding, potentially with custom player controls or integration with a video hosting platform beyond basic YouTube/Vimeo embeds. Add transcripts/captions.
- [ ] **Search Functionality (Full)**: Implement and refine site-wide search using Pagefind or Fuse.js.
- [ ] **Newsletter Signup (Full)**: Integrate with Mailchimp/ConvertKit and potentially add more prominent signup points.
- [ ] **Social Sharing (Full)**: Add polished social sharing buttons.
- [ ] **Comments Section (Full)**: Integrate Disqus/Hyvor Talk or another comment system.
- [ ] **Related Posts**: Implement logic in `BlogLayout.astro` to show posts with similar tags.
- [ ] **Series/Playlists**: Group related posts or videos into series.
- [ ] **Featured Posts**: Allow specific posts to be marked as "featured" for display on the homepage or elsewhere.

### Architecture & UX

- [ ] **Category/Tag Archive Pages**: Create dynamic pages listing all posts for a specific category or tag (e.g., `/category/video-production`, `/tag/lethbridge`).
- [ ] **Filtering/Sorting UI**: Add controls to the main blog page (`/blog`) to filter by category/tag and sort by date/title.
- [ ] **Dedicated Video Page**: Create `src/pages/videos.astro` to showcase video content specifically.
- [ ] **Contact Page (Full)**: Build the contact form and backend submission logic.
- [ ] **Resources Page**: Create and populate the optional resources page.
- [ ] **Pagination**: Add pagination to the main blog page (`/blog`) if the number of posts grows large.
- [ ] **Author Component**: Create a dedicated `AuthorBio.astro` component for reuse.

### Design & Branding

- [ ] **Homepage Hero Section**: Implement the custom hero section design.
- [ ] **Consistent Branding (Full)**: Update `tailwind.config.js`, add logo to Header, update Footer details.
- [ ] **Image Optimization (Full)**: Ensure all images use Astro's `<Image>` component or similar optimization techniques.
- [ ] **Dark Mode Toggle**: Implement the UI toggle for light/dark mode.

### Technical & SEO

- [ ] **Advanced SEO**: Implement JSON-LD structured data (`BlogPosting`, `VideoObject`, `Person`) and refine meta tags.
- [ ] **Performance Optimization**: Continuously monitor Lighthouse scores and optimize assets/loading strategies.
- [ ] **Analytics Integration**: Add web analytics (Plausible, Matomo, GA) if desired.
- [ ] **Deployment Setup**: Configure deployment pipeline (Vercel/Netlify/Cloudflare Pages).
