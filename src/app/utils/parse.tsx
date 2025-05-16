"use client";

import parse from "html-react-parser";
import React, { useEffect } from "react";

// Parseコンポーネント
const ParseHtml = ({ blogContent }: any) => {
  // console.log("blogContent", JSON.stringify(blogContent, null, 2)); // デバッグ用ログ

  // すべてのコードブロックにJavaScriptのクラスを適用
  const enhancedHTML = blogContent.replace(
    /<pre><code(?:\s+class="[^"]*")?>([^<]+)<\/code><\/pre>/g,
    (match: any, code: any) => {
      return `<pre class="language-javascript"><code class="language-javascript">${code}</code></pre>`;
    }
  );
  console.log("enhancedHTML", JSON.stringify(enhancedHTML, null, 2)); // デバッグ用ログ

  // Prims.jsの初期化
  useEffect(() => {
    // 動的importでPrims.jsを読み込み
    const loadPrism = async () => {
      // Prism.jsをクライアントサイドのみインポート
      const Prism = (await import("prismjs")).default;
      // const Prism = require("prismjs");

      // 言語定義を明示的に読み込む
      await import("prismjs/components/prism-javascript" as any);
      // require("prismjs/components/prism-javascript");

      // シンタックスハイライトを適用
      Prism.highlightAll();
    };

    loadPrism();
  }, [enhancedHTML]); // 依存配列にenhancedHTMLを追加

  return (
    <div id="blog-doc" className="inline-block mb-10 pt-4">
      {parse(enhancedHTML)}
    </div>
  );
};

export default ParseHtml;
