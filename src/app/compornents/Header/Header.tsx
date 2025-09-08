"use client";

import "./Header.css";
import { Menu } from "../Menu/Menu";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ページ読み込み時のみ画像のIDとタイムスタンプを設定
  const [idPhoto, setIdPhoto] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect(() => {
    setIdPhoto(Math.floor(Math.random() * 1000));
    setTimestamp(new Date().getTime());
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        id="header"
        className="flex flex-col items-center w-full h-32 top-0 bg-center bg-cover bg-white font-medium"
        // style={{
        //   backgroundImage: `url(
        //       "https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}"
        //     )`,
        // }}
      >
        {/* url(/OIG2-cut.jpg) */}
        {/* <img
          className="max-w-sm min-w-[150px] mr-4"
          src={`https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}`}
          alt="No image"
        /> */}
        <Link
          href="/"
          className="w-fit h-12 mt-4 p-1 px-2 rounded-lg bg-white bg-opacity-80 text-gray-950 text-xl font-bold"
        >
          {`Masato's tech Blog`}
        </Link>
        {/* // 間を埋める場合 */}
        {/* <div className="flex-grow w-12"></div> */}

        <ul className="hidden lg:flex h-12 m-6 p-2 rounded-lg">
          <li className="list-none mr-1">
            {/* PCの場合のみ表示する要素 */}
            <Link
              href="/"
              className="bg-white hover:underline flex m-auto p-1 px-8 mr-1 rounded-lg"
            >
              {"Blog"}
            </Link>
          </li>
          <li className="list-none ml-2">
            <Link
              href="/works"
              className="bg-white hover:underline flex m-auto p-1 px-8 mr-2 rounded-lg"
            >
              {"Works"}
            </Link>
          </li>
          <li className=" list-none mr-2 ml-2">
            <Link
              href="/portfolio"
              className="bg-white hover:underline flex m-auto p-1 px-7 mr-8 rounded-lg"
            >
              {"Portfolio"}
            </Link>
          </li>
        </ul>
      </div>

      {/* モバイルでのハンバーガーメニュー */}
      <div className="absolute m-0 ml-auto p-0 top-0 right-0 h-auto duration-300">
        <Menu toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>
    </>
  );
};
