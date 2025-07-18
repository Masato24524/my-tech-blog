"use client";

// HTMLタグをparseするためのライブラリ
import parse from "html-react-parser";
import React, { useEffect } from "react";

// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-jsx";

// Parseコンポーネント
const ParseHtml = ({ blogContent }: any) => {
  // すべてのコードブロックにJavaScriptのクラスを適用
  const enhancedHTML = blogContent.replace(
    /<pre><code(?:\s+class="[^"]*")?>([^<]+)<\/code><\/pre>/g,
    (match: any, code: any) => {
      return `<pre class="language-javascript"><code class="language-javascript">${code}</code></pre>`;
    }
  );

  // Prims.jsの初期化
  useEffect(() => {
    // Prism.jsをクライアントサイドのみインポート
    const Prism = require("prismjs");

    // 言語定義を明示的に読み込む
    require("prismjs/components/prism-javascript");

    // シンタックスハイライトを適用
    Prism.highlightAll();
  }, [enhancedHTML]); // 依存配列にenhancedHTMLを追加

  return (
    <div id="blog-doc" className="inline-block mb-10 pt-4">
      {parse(enhancedHTML)}
      {/* {parse(blogContent)} */}
    </div>
  );
};

export default ParseHtml;
