/**
 * Documentation Configuration
 * Add your markdown documentation files here
 */

export interface DocItem {
  /**
   * Title to display in the navigation
   */
  title: string;

  /**
   * Path to the markdown file (relative to project root or public/docs)
   * Example: 'docs/getting-started.md' or '/docs/authentication.md'
   */
  path: string;

  /**
   * Optional description for the document
   */
  description?: string;

  /**
   * Optional category for grouping documents
   */
  category?: string;
}

/**
 * Documentation files array
 * Add your markdown documentation files here
 */
export const docs: DocItem[] = [
  {
    title: "Getting Started",
    path: "SETUP_GUIDE.md",
    description: "Complete setup guide for Full Admin V1",
    category: "Setup",
  },
  {
    title: "Documentation",
    path: "DOCUMENTATION.md",
    description: "Complete project documentation",
    category: "Reference",
  },
  {
    title: "Environment Variables",
    path: "ENV_EXAMPLE.md",
    description: "Environment variables configuration guide",
    category: "Setup",
  },
  // Add more documentation files here
  // {
  //   title: 'Your Doc Title',
  //   path: 'path/to/your/doc.md',
  //   description: 'Description of the document',
  //   category: 'Category Name',
  // },
];

/**
 * Get all unique categories from docs
 */
export function getDocCategories(): string[] {
  const categories = docs
    .map((doc) => doc.category)
    .filter((cat): cat is string => !!cat);
  return Array.from(new Set(categories));
}

/**
 * Get docs by category
 */
export function getDocsByCategory(category: string): DocItem[] {
  return docs.filter((doc) => doc.category === category);
}

/**
 * Get doc by path
 */
export function getDocByPath(path: string): DocItem | undefined {
  return docs.find((doc) => doc.path === path);
}
