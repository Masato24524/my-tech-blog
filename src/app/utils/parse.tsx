"use client";

import parse from "html-react-parser";
import React from "react";

// Parseコンポーネント
const ParseHtml = ({ blogContent }: any) => {
  return (
    <div id="blog-doc" className="inline-block mb-10 pt-4">
      {parse(blogContent)}
    </div>
  );
};

export default ParseHtml;
