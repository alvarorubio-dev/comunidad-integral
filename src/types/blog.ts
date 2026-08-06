export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  keywordPrincipal: string;
  pillarRelacionada: string;
  ciudadesRelacionadas: string[];
  readingTime: number;
}
