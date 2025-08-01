import { GithubPost, md_datas } from "app/types/type";
import matter from "gray-matter";

// imageタグをhttpのパスに変換する関数
const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/Masato24524/Zenn-contents/main";

const convertImagePaths = (content: string) => {
  let convertedContent = content;

  // Markdown記法の画像を変換
  convertedContent = convertedContent.replace(
    /!\[([^\]]*)\]\(\/images\/([^)]+)\)/g,
    (match, alt, imagePath) => {
      const newPath = `![${alt}](${GITHUB_BASE_URL}/images/${imagePath})`;
      console.log("Markdown変換:", match, "→", newPath);
      return newPath;
    }
  );
  // HTML用
  convertedContent = convertedContent.replace(
    // return htmlContent.replace(
    /<img src="\/images\/([^"]+)"/g,
    `<img src="${GITHUB_BASE_URL}/images/$1"`
  );

  return convertedContent;
};

//
export async function fetchAllGithubArticles() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Masato24524/Zenn-contents/contents/articles/",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json", //github APIのバージョン指定
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Github API error:, ${res.status}`);
    }

    const zennArticles = await res.json();
    // const data = zennArticles;
    // console.log("dataZenn", data);

    // 上記のメタ情報の中の「記事の名前：article.name」からファイルデータを取得;
    const datas: md_datas[] = await (async (zennArticles: any) => {
      if (!zennArticles) return []; // zennArticleが存在しない場合は空配列とする→datasがundefinedのケースはないことを証明

      return await Promise.all(
        zennArticles.map(async (article: any) => {
          const md_data = await fetch(
            "https://api.github.com/repos/Masato24524/Zenn-contents/contents/articles/" +
              article.name,
            {
              headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          )
            .then((res) => {
              return res.json();
            })
            .catch((err) => {
              console.log(err);
              return null;
            });
          // console.log("md_data", md_data);

          // 取得したデータ(md_data)のうち、contentプロパティをbase64形式からutf-8の文字列に変換する
          const buffer = Buffer.from(md_data.content, "base64");
          // console.log("buffer", buffer);
          const fileContents = buffer.toString("utf-8");
          // console.log("fileContents", fileContents);

          // mdファイルの構文を解析してメタ情報(data:{title, topics, date等)とcontentをオブジェクトに格納する
          const matterResult: any = matter(fileContents);
          // console.log("matterResult", matterResult);

          if (!matterResult.data.published) {
            return null; // published でない場合は null を返す
          }

          return {
            source: "github", // githubの記事であることを示す
            id: article.name.replace(/\.md$/, ""), // 拡張子.mdを空欄にしてidとする
            ...(matterResult.data as {
              title: string;
              date: string;
              topics: string;
            }),
            content: convertImagePaths(matterResult.content),
          };
        })
      );
    })(zennArticles);
    // console.log("datasZenn", datas);

    const removeFlasyDatas = datas.filter(Boolean);
    console.log("removeFlasyDatas", removeFlasyDatas);

    return removeFlasyDatas;
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<md_datas | null> {
  const articles = await fetchAllGithubArticles();
  console.log("articles of posts.ts", articles);
  return articles.find((article) => article.id === id) || null;
}
