export interface MicrocmsPost {
  contents: [
    source: "microcms",
    id: string,
    title: string,
    body: string,
    publishedAt: string,
    updatedAt: string
  ];
}

export interface GithubPost {
  source: "github";
  id: string;
  title: string;
  content: string;
  date: string;
  topics: string[];
}
