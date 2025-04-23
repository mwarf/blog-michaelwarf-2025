"use client";

import * as React from "react";
import type { CollectionEntry } from "astro:content";
import { Check, Filter } from "lucide-react"; // Import Check and Filter icons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Import cn utility

// Define the props the component will accept
interface BlogFilterControlsProps {
  posts: CollectionEntry<'blog'>[];
  uniqueCategories: string[];
  uniqueTags: string[];
}

export function BlogFilterControls({ posts, uniqueCategories, uniqueTags }: BlogFilterControlsProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Categories");
  const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false); // State for mobile filter visibility
  const [showAllTags, setShowAllTags] = React.useState<boolean>(false); // State for showing all tags
  const initialTagLimit = 7; // Number of tags to show initially

  // Handle category selection change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Handle tag selection toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = new Set(prevTags);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  // Handle clearing all filters
  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedTags(new Set());
    setIsFilterOpen(false); // Close filter on mobile after clearing
  };

  // Toggle mobile filter visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle tag visibility
  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  // Memoize the filtered posts based on selected category and tags
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = selectedCategory === "All Categories" || post.data.category === selectedCategory;
      const tagsMatch = selectedTags.size === 0 || (post.data.tags && post.data.tags.some(tag => selectedTags.has(tag)));
      // Logic: Match category (or all) AND match at least one selected tag (if any tags are selected)
      return categoryMatch && tagsMatch;
    });
  }, [posts, selectedCategory, selectedTags]);

  const tagsToShow = showAllTags ? uniqueTags : uniqueTags.slice(0, initialTagLimit);

  return (
    <div className="mb-12">
      {/* Filter Toggle Button (Mobile Only) */}
      <div className="mb-4 md:hidden">
        <Button onClick={toggleFilter} variant="outline" className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
          {(selectedCategory !== "All Categories" || selectedTags.size > 0) && !isFilterOpen && (
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary"></span> // Active filter indicator
          )}
        </Button>
      </div>

      {/* Filter Controls Section - Conditional rendering for mobile, removed border */}
      <div className={cn(
        "mb-8 flex-col md:flex-row gap-4 md:gap-6 items-start md:items-start p-4 md:p-0", // Adjusted padding for desktop
        isFilterOpen ? "flex border rounded-lg" : "hidden md:flex" // Control visibility and add border only when open on mobile
      )}>
        {/* Category Select */}
        <div className="w-full md:w-auto flex-shrink-0">
          <h3 className="text-sm font-medium mb-2">Category</h3>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-select" className="w-full md:w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags Section */}
        <div className="flex-grow w-full md:w-auto">
           <h3 className="text-sm font-medium mb-2">Tags</h3>
           <div className="flex flex-wrap gap-2">
            {tagsToShow.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.has(tag) ? "default" : "outline"}
                onClick={() => handleTagToggle(tag)}
                className="cursor-pointer transition-colors"
                role="checkbox"
                aria-checked={selectedTags.has(tag)}
                tabIndex={0} // Make it focusable
                onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => { if (e.key === 'Enter' || e.key === ' ') handleTagToggle(tag); }} // Keyboard activation
              >
                {selectedTags.has(tag) && <Check className="w-3 h-3 mr-1" />} {/* Add Check icon */}
                {tag}
              </Badge>
            ))}
            {uniqueTags.length > initialTagLimit && (
              <Button variant="link" size="sm" onClick={toggleShowAllTags} className="p-0 h-auto text-sm">
                {showAllTags ? "Show Less Tags" : `Show ${uniqueTags.length - initialTagLimit} More Tags`}
              </Button>
            )}
          </div>
        </div>

         {/* Clear Button */}
         {(selectedCategory !== "All Categories" || selectedTags.size > 0) && (
            <div className="w-full md:w-auto pt-4 md:pt-0 md:ml-auto md:self-end"> {/* Adjusted padding/margin */}
                <Button variant="ghost" onClick={clearFilters} className="w-full md:w-auto">
                Clear Filters
                </Button>
            </div>
         )}
      </div>

      {/* Active Filters Summary - Conditionally render based on filters being applied, not just visibility */}
      {(selectedCategory !== "All Categories" || selectedTags.size > 0) && (
         <div className="mb-6 text-sm text-muted-foreground">
           Filtering by:
           {selectedCategory !== "All Categories" && (
            <span className="font-medium text-foreground ml-1">Category "{selectedCategory}"</span>
          )}
          {selectedCategory !== "All Categories" && selectedTags.size > 0 && (
            <span className="mx-1">&</span>
          )}
          {selectedTags.size > 0 && (
             <span className="font-medium text-foreground ml-1">
               Tag(s) "{[...selectedTags].join('", "')}"
             </span>
          )}
        </div>
      )}

      {/* Filtered Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="h-full flex flex-col overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg border dark:border-gray-800 rounded-lg">
              {post.data.heroImage && (
                <a href={`/blog/${post.slug}/`} aria-label={`Read more about ${post.data.title}`} className="group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.data.heroImage.src}
                      alt={post.data.heroImageAlt || post.data.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={post.data.heroImage.width}
                      height={post.data.heroImage.height}
                    />
                  </div>
                </a>
              )}
              <CardHeader>
                <span className="inline-block bg-primary/10 text-primary dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                  {post.data.category}
                </span>
                <a href={`/blog/${post.slug}/`} className="hover:underline">
                  <CardTitle>{post.data.title}</CardTitle>
                </a>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <CardDescription className="mb-4">{post.data.description}</CardDescription>
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.data.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-secondary/10 text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-auto border-t pt-4 flex justify-between items-center">
                  <time className="text-sm text-gray-600 dark:text-muted-foreground" dateTime={post.data.pubDate.toISOString()}>
                    {new Date(post.data.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <a href={`/blog/${post.slug}/`} className="text-sm text-primary hover:underline font-medium group">
                    Read More <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-12">No posts found matching your criteria.</p>
      )}
    </div>
  );
}
