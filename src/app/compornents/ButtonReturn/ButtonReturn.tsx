"use client";

import React, { useEffect, useState } from "react";
import "./ButtonReturn.css";
import { usePathname } from "next/navigation";

const ButtonReturn = () => {
  const pathname = usePathname();
  const [showButton, setShowButton] = useState(false);

  //スクロールボタンの表示を管理する関数
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); //100px以上スクロールしたら表示
    };

    window.addEventListener("scroll", handleScroll);

    // ルートが変更された時の処理
    setShowButton(false);

    // コンポーネントがアンマウントされたときにリスナーをクリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setShowButton, pathname]);

  //トップへのスクロールを実行する関数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // if (showButton === null) return null;
  //クライアントサイドのレンダリングが確定するまで何も表示しない

  return (
    <div
      className={`fixed z-50 text-center justify-center right-16 bottom-20 transition-opacity duration-300 ${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="scroll-smooth absolute -translate-x-1/3 -translate-y-1/3 w-14 h-14 border-blue-500 border bg-white bg-opacity-80 rounded-full"
      >
        <span
          // onClick={scrollToTop}
          className="scroll-smooth absolute top-[23px] left-[21px] rotate-45 w-3 h-3 border-blue-500 border-t-2 border-l-2"
        ></span>
      </button>
    </div>
  );

  // return showButton ? (
  //   <div className="fixed z-50 text-center justify-center right-16 bottom-20">
  //     <button
  //       onClick={scrollToTop}
  //       className="scroll-smooth absolute -translate-x-1/3 -translate-y-1/3 w-14 h-14 border-blue-500 border bg-white bg-opacity-80 rounded-full"
  //     ></button>
  //     <button
  //       onClick={scrollToTop}
  //       className="scroll-smooth absolute top-[5px] left-[3px] rotate-45 w-3 h-3 border-blue-500 border-t-2 border-l-2"
  //     ></button>
  //   </div>
  // ) : null;
};

export default ButtonReturn;
