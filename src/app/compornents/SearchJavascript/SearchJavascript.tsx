import React from "react";
import Script from "next/script";
import { fetchAllGithubArticles } from "app/lib/github/posts";
// import "./SearchJavascript.css";

import path from "path";
import fs from "fs";

export interface Props {
  posts: string;
}

export async function createJsonPosts() {
  const allPostsData = await fetchAllGithubArticles();

  // public/data/search.jsonとして保存
  const publicDir = path.join(process.cwd(), "public", "data");
  console.log("publicDir", publicDir);

  fs.writeFileSync(
    path.join(publicDir, "search.json"),
    JSON.stringify(allPostsData, null, 2)
  );
}

(async () => {
  await createJsonPosts();
})();

const searchJavascript = ({ posts }: Props) => {
  // console.log("posts of SearchJS", posts);

  return (
    <>
      <h2>Vanilla JSによる検索</h2>
      <div className="flex w-auto h-8 mb-4">
        <div id="javascript-search-container" className="w-full shadow-md">
          検索窓確認用
        </div>

        {/* JavaScript実行 */}
        <Script src="/js/javascript-search.js" strategy="afterInteractive" />
      </div>
    </>
  );
};

export default searchJavascript;
