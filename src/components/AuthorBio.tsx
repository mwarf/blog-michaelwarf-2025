"use client"; // Mark as client component

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Instagram, Youtube } from 'lucide-react'; // Removed Twitter, Added Youtube
import { cn } from "@/lib/utils"; // Import cn utility if needed for combining classes

interface AuthorBioProps {
  author: string;
  authorBio: string;
  authorImage?: string;
  linkedinUrl?: string;
  // twitterUrl?: string; // Removed twitterUrl
  instagramUrl?: string;
  youtubeUrl?: string; // Added youtubeUrl
  className?: string;
}

export function AuthorBio({
  author,
  authorBio,
  authorImage,
  linkedinUrl,
  // twitterUrl, // Removed twitterUrl
  instagramUrl,
  youtubeUrl, // Added youtubeUrl
  className
}: AuthorBioProps) {

  // Get initials for Avatar fallback
  const initials = author
    .split(' ')
    .map(name => name[0])
    .slice(0, 2)
    .join('');

  const iconClass = "h-5 w-5 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <div className={cn("flex items-start gap-4 border-t pt-8 dark:border-gray-800", className)}>
      <Avatar className="h-16 w-16"> {/* Larger avatar */}
        {/* Conditional rendering inside the React component */}
        {authorImage ? (
          <AvatarImage src={authorImage} alt={author} />
        ) : null}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1">{author}</h3>
        {/* Use dangerouslySetInnerHTML or a markdown parser if bio contains HTML/Markdown */}
        {/* For plain text: */}
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line mb-3">
           {authorBio}
        </div>
        {/* Social Links */}
        <div className="flex items-center gap-3">
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author} on LinkedIn`}>
              <Linkedin className={iconClass} />
            </a>
          )}
          {/* Removed Twitter link */}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author} on Instagram`}>
              <Instagram className={iconClass} />
            </a>
          )}
          {youtubeUrl && ( // Added YouTube link
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author} on YouTube`}>
              <Youtube className={iconClass} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
