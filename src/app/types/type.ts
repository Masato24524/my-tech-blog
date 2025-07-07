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

export interface md_datas {
  source: "github";
  id: string;
  title: string;
  date?: string;
  content: string;
  description?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  meta?: {
    title: string;
    description: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
  topics?: {
    id?: string;
    tag: string;
  }[];
}
