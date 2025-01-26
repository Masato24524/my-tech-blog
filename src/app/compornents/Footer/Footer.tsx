"use client";

import React, { useEffect, useState } from "react";
import "./Footer.css";
import { client, Tag, TagData } from "app/api/microcms/route";
// import { client, Tag, TagData } from "app/libs/client";
import Link from "next/link";

export function Footer(): React.ReactElement {
  const [getTagId, setGetTagId] = useState<Tag[]>([]);

  // タグデータを取得
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await client.get<TagData>({
        endpoint: `tags`,
      });
      setGetTagId(tags.contents);
    };
    fetchTags();
  }, []);

  return (
    <div id="footer-container" className="w-screen mt-2 z-0">
      <footer className="relative block w-full h-auto bg-gray-600">
        <div className="p-4 pb-32">
          <span className="m-4 text-white border-b-2">カテゴリー</span>
          {/* タグの表示 */}
          <div className="mt-2">
            {getTagId.map((tagId: Tag) => (
              <span
                key={tagId.id}
                className="ml-2 p-[2px] text-sm rounded-xl  bg-white"
              >
                <Link href={`/category/${tagId.tag}`}>
                  &nbsp;&nbsp;{tagId.tag}&nbsp;&nbsp;
                </Link>
              </span>
            ))}
          </div>
        </div>

        <p className="absolute right-10 bottom-1 p-1 px-2 text-white text-sm">{`©Copyright2024 Masato's tech Blog All Rights Reserved.`}</p>
      </footer>
    </div>
  );
}
