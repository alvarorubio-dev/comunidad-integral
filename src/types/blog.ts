export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  author: string;
  category: string;
  tags: string[];
  keywordPrincipal: string;
  pillarRelacionada?: string;
  ciudadesRelacionadas?: string[];
}

export interface BlogHeading {
  text: string;
  id: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number;
  headings: BlogHeading[];
}
