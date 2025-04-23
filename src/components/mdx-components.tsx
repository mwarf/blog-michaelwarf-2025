import React from 'react';
import type { MDXComponents } from 'mdx/types';

export const MDX: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h2>
  ),
  a: ({ children, ...props }) => (
    <a className="text-primary hover:underline" {...props}>
      {children}
    </a>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" {...props}>
      {children}
    </code>
  ),
};
