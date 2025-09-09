// microCMSから取得したデータ型
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

// Githubから取得したデータ型にsourceを加えたもの
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

// Githubから取得したデータ型の簡易型（現在は未使用？）
export interface GithubPost {
  source: "github";
  id: string;
  title: string;
  content: string;
  date: string;
  topics: string[];
}

// microCMS/Githubを統合後のデータ型
export interface Blog {
  source: "microcms" | "github";
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
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
  tag?: { id?: string; tag: string }[];
}

// Tag(GithubのTopics整形後？)のデータ型
export interface Tag {
  id?: string;
  tag: string;
}
