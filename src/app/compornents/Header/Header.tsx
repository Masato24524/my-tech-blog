"use client";

import "./Header.css";
import Link from "next/link";
import { Menu } from "../Menu/Menu";
import { useState, useEffect } from "react";

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
    <div>
      <header
        id="header"
        className="fixed flex z-0 w-full h-40 top-0 bg-center bg-cover font-medium"
        style={{
          backgroundImage: `url(
            "https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}"
          )`,
        }}
      >
        {/* url(/OIG2-cut.jpg) */}
        {/* <img
          className="max-w-sm min-w-[150px] mr-4"
          src={`https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}`}
          alt="No image"
        /> */}
        <Link
          href="/"
          className="h-8 p-1 px-2 m-2 rounded-lg bg-white bg-opacity-70 text-gray-950"
        >
          {`Masato's tech Blog`}
        </Link>
        <div className="flex-grow w-12"></div>
        <ul className="hidden lg:flex h-20 m-4 p-2 rounded-lg">
          <li className="list-none mr-1">
            {/* PCの場合のみ表示する要素 */}
            <Link
              href="/"
              className="bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-1 rounded-lg"
            >
              {"Blog"}
            </Link>
          </li>
          <li className=" list-none mr-2 ml-2">
            <Link
              href="/pages/portfolio"
              className="bg-white hover:bg-pink-200 flex m-auto p-1 px-8 rounded-lg"
            >
              {"Portfolio"}
            </Link>
          </li>
          <li className="list-none ml-2">
            <Link
              href="#"
              className="bg-gray-300 flex m-auto p-1 px-8 mr-8 rounded-lg"
            >
              {"Works"}
            </Link>
          </li>
        </ul>

        <Menu toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </header>
    </div>
  );
};
