"use client";

import ReactMarkdown from "react-markdown";
import { truncateString } from "./stringUtils";

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
