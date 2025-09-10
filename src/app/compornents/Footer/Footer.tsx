"use client";

import React, { useEffect, useState } from "react";
import "./Footer.css";
// import { client, Tag, TagData } from "app/api/microcms/utils";
// utilsをインポートするとセキュリティ問題があるため使わない

// import { client, Tag, TagData } from "app/libs/client";

import Link from "next/link";
import { get } from "http";
import { MicrocmsPost } from "app/types/type";

interface FooterProps {
  fetchedData?: string[];
}

export function Footer({ fetchedData }: FooterProps): React.ReactElement {
  // console.log("Footer_fetchedData", fetchedData);

  const [getTagName, setGetTagName] = useState<string[]>([]);

  return (
    <div id="footer-container" className="w-screen mt-2 z-0">
      <footer className="relative block w-full h-auto bg-gray-600">
        <div className="p-4 pb-32">
          <span className="m-4 text-white border-b-2">カテゴリー</span>
          {/* タグの表示 */}
          <div className="mt-2 mb-4 ml-2 flex flex-wrap">
            {fetchedData && fetchedData.length > 0 ? (
              fetchedData.map((tagId: any) => (
                <span
                  key={tagId}
                  className="ml-2 mb-1 p-[2px] pb-[4px] text-sm rounded-xl bg-white hover:bg-blue-500"
                >
                  <Link className="cursor-pointer" href={`/category/${tagId}`}>
                    &nbsp;&nbsp;{tagId}&nbsp;&nbsp;
                  </Link>
                </span>
              ))
            ) : (
              <span className="ml-4 mb-4 text-white">タグがありません</span> // fetchedData が空または undefined の場合の表示
            )}
          </div>{" "}
          <p className="ml-4 text-white underline">リンク</p>
          <Link
            href={`/privacy-policy`}
            className="mt-4 ml-4 text-white hover:underline"
          >
            プライバシーポリシー
          </Link>
        </div>
        <div className="block mb-2 ">
          <p className="absolute right-10 bottom-1 p-1 px-2 text-white text-sm">{`©Copyright2024 Masato's tech Blog All Rights Reserved.`}</p>
        </div>
      </footer>
    </div>
  );
}
