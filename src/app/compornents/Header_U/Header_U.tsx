"use client";

import "./Header_U.css";
import { Menu } from "../Menu/Menu";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Header_U: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ページ読み込み時のみ画像のIDとタイムスタンプを設定
  const [idPhoto, setIdPhoto] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setIdPhoto(Math.floor(Math.random() * 1000));
    setTimestamp(new Date().getTime());

    const handleScroll = () => {
      const isWide = window.innerWidth >= 1024;
      const scrolled = window.scrollY > 100;
      setShowHeader(isWide && scrolled); //100px以上スクロールしたら表示
    };

    window.addEventListener("scroll", handleScroll);

    // ルートが変更された時の処理
    setShowHeader(false);

    // コンポーネントがアンマウントされたときにリスナーをクリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setShowHeader, setMenuOpen]);

  const toggleMenu = () => {
    console.log("toggleMenu", toggleMenu);
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        id="header"
        className={`flex w-full h-20 bg-cover font-medium ${
          showHeader
            ? "fixed z-50 opacity-100 translate-y-[0px] duration-500"
            : "fixed opacity-0 pointer-events-none -translate-y-[100px] duration-500"
        }`}
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
          className="h-8 p-1 px-2 m-2 rounded-lg bg-white bg-opacity-80 text-gray-950"
        >
          {`Masato's tech Blog`}
        </Link>
        {/* 中央の余白 */}
        <div className="flex-grow w-12"></div>
        {/* PCの場合のみ表示する要素 */}
        <ul className="hidden lg:flex h-20 m-4 p-2 rounded-lg">
          <li className="list-none mr-1">
            <Link
              href="/"
              className="bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-1 rounded-lg"
            >
              {"Blog"}
            </Link>
          </li>
          <li className="list-none ml-2">
            <Link
              href="/works"
              className="bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-2 rounded-lg"
            >
              {"Works"}
            </Link>
          </li>
          <li className=" list-none mr-2 ml-2">
            <Link
              href="/portfolio"
              className="bg-white hover:bg-pink-200 flex m-auto p-1 px-7 mr-8 rounded-lg"
            >
              {"Portfolio"}
            </Link>
          </li>
        </ul>{" "}
      </div>
    </>
  );
};
