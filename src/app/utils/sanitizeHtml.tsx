"use client";

// import DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
import ReactMarkdown from "react-markdown";

// HTMLタグを安全に表示する関数
export const sanitizeHtml = (htmlString: string): string => {
  // DOMPurifyを使用してHTMLをサニタイズする
  const sanitized = DOMPurify.sanitize(htmlString, {
    // 必要に応じてオプションを設定
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "em",
      "strong",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
    // URLを正規化
    ADD_ATTR: ["rel:noopener noreferrer"],
    // 外部リンクに target="_blank" を追加
    FORCE_BODY: true,
  });

  return sanitized;
};

// 文字列を指定の文字数でカットする関数
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

// SafeHtmlコンポーネント
const SafeHtml = ({ blogBody }: any) => {
  return (
    <div>
      <div className="text-sm leading-relaxed mt-2 mb-1">
        <ReactMarkdown>{truncateString(blogBody, 200)}</ReactMarkdown>
      </div>
      <div className="text-sm leading-relaxed mt-2 mb-1">
        {/* 危険なHTMLを安全に表示  */}
        {/* <div
          className="break-words"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(truncateString(blogBody, 200)),
          }}
        /> */}
      </div>
    </div>
  );
};

export default SafeHtml;
