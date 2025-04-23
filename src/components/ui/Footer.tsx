"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Updated import path
import type { LucideIcon } from "lucide-react"; // Use type-only import

interface SocialLink {
  name: string;
  href: string;
  Icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Added optional Icon
}

interface FooterLink {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
  description?: string; // Added optional description
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> { // Add export
  brand: {
    name: string;
    description: string;
  };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
  acknowledgement?: string; // Added new optional prop
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, acknowledgement, ...props }, ref) => { // Added acknowledgement to destructuring
    return (
      <div
        ref={ref}
        className={cn("pt-24", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          {/* Reordered grid: Brand (40%), Nav (30%), Coalbanks (30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-x-8">
            {/* Brand section (First - 40%) */}
            <div className="lg:col-span-4">
              <a href="#" className="text-xl font-semibold">
                {brand.name}
              </a>
              <p className="text-sm text-foreground/60">
                {brand.description}
              </p>

              <p className="text-sm font-light text-foreground/55 mt-3.5">
                {socialLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      className="hover:text-foreground/90"
                      target="_blank"
                      href={link.href}
                      rel="noopener noreferrer"
                    >
                      {/* Conditionally render icon */}
                      {link.Icon && <link.Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />}
                      {link.name}
                    </a>
                    {index < socialLinks.length - 1 && " • "}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Navigation Column (Middle - 30%) - Add border here */}
            {columns.length > 0 && (
              <div className="mt-16 lg:col-span-3 lg:mt-0 lg:border-r lg:pr-8 border-border/50">
                <h3 className="text-sm font-semibold">{columns[0].title}</h3>
                <ul className="mt-4 space-y-3">
                  {columns[0].links.map(({ name, Icon, href, description }) => (
                    <li key={name}>
                      <a
                        href={href || "#"}
                        className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group block"
                      >
                        <span className="inline-flex items-center font-semibold">
                          <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                          {name}
                        </span>
                      </a>
                      {description && (
                        <p className="text-xs text-foreground/70 mt-1 ml-[calc(1rem+0.375rem)]">
                          {description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Coalbanks Websites Column (Last - 30%) */}
            {columns.length > 1 && (
              <div className="mt-16 lg:col-span-3 lg:mt-0 lg:pl-8">
                 <h3 className="text-sm font-semibold">{columns[1].title}</h3>
                 <ul className="mt-4 space-y-3">
                   {columns[1].links.map(({ name, Icon, href, description }) => (
                     <li key={name}>
                       <a
                         href={href || "#"}
                         className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group block"
                       >
                         <span className="inline-flex items-center font-semibold">
                           <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                           {name}
                         </span>
                       </a>
                       {description && (
                         <p className="text-xs text-foreground/70 mt-1 ml-[calc(1rem+0.375rem)]">
                           {description}
                         </p>
                       )}
                     </li>
                   ))}
                 </ul>
              </div>
            )}
          </div>

          {/* Removed standalone acknowledgement section */}

          {(copyright || acknowledgement) && ( // Render this section if either exists
            <div className="mt-12 border-t pt-6 pb-8 text-center"> {/* Centered text */}
              {/* Added acknowledgement text here */}
              {acknowledgement && (
                <p className="text-sm text-foreground/60 mb-2">{acknowledgement}</p> // Added margin-bottom
              )}
              {copyright && (
                <p className="text-xs text-foreground/55">{copyright}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";
