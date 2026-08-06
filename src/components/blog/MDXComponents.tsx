import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 text-3xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-brand-green-700 underline hover:text-brand-green-800">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal pl-6 space-y-2 text-gray-700">{children}</ol>
    ),
    ...components,
  };
}
