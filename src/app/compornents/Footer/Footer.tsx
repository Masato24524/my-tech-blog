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
  const [getTagName, setGetTagName] = useState<string[]>([]);

  // タグデータを取得
  // useEffect(() => {
  //   const getBlogs = async ({ fetchedData }: FooterProps) => {
  //     console.log("Fetching started"); // デバッグ用：fetch開始
  //     try {
  //       const API_URL = process.env.API_URL;

  //       const response = await fetch(`${API_URL}/api/microcms`, {
  //         cache: "no-store", //暫定的に毎回読み込ませる
  //       });
  //       console.log("Response received:", response); // デバッグ用：レスポンス確認

  //       const datas = fetchedData;
  //       // const datas = await response.json();
  //       console.log("dataF", datas);

  //       if (datas) {
  //         const tags: string[] = Array.from(
  //           new Set<string>(
  //             datas.flatMap((item: any) => item.tag.map((t: any) => t.tag))
  //           )
  //         );
  //         setGetTagName(tags);
  //         console.log("tagsF", tags);
  //       }
  //     } catch (error) {
  //       console.error("Fetching error:", error);
  //     }
  //     // const tags = await client.get<TagData>({
  //     //   endpoint: `tags`,
  //     // });
  //   };
  //   getBlogs({ fetchedData });
  // }, []);

  return (
    <div id="footer-container" className="w-screen mt-2 z-0">
      <footer className="relative block w-full h-auto bg-gray-600">
        <div className="p-4 pb-32">
          <span className="m-4 text-white border-b-2">カテゴリー</span>
          {/* タグの表示 */}
          <div className="mt-2 flex flex-wrap">
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
              <span>タグがありません</span> // fetchedData が空または undefined の場合の表示
            )}
          </div>
        </div>

        <p className="absolute right-10 bottom-1 p-1 px-2 text-white text-sm">{`©Copyright2024 Masato's tech Blog All Rights Reserved.`}</p>
      </footer>
    </div>
  );
}
