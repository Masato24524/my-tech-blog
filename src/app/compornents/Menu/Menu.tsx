"use client";

import "./Menu.css";
import Link from "next/link";
import React, { useEffect } from "react";

type HeaderProps = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export const Menu: React.FC<HeaderProps> = ({ toggleMenu, menuOpen }) => {
  useEffect(() => {
    const hamburgermenu = document.querySelector(
      ".hamburgermenu"
    ) as HTMLElement;
    // const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const hamburgerMenuClose = document.querySelector(
      ".hamburger-menu-close"
    ) as HTMLElement;
    const sideMenu = document.querySelector(".sideMenu") as HTMLElement;

    const updateMenuDisplay = () => {
      if (window.innerWidth >= 1024) {
        hamburgermenu.style.display = "none";
        hamburgerMenuClose.style.display = "none";
        // sidebar.style.display = 'none';
      } else {
        if (!menuOpen) {
          hamburgermenu.style.display = "block";
          // sidebar.style.display = 'none'
          hamburgerMenuClose.style.display = "none";
          sideMenu.style.opacity = "0";
          // sideMenu.style.marginTop = '70px'
          sideMenu.style.transform = "translateY(40px)";
          sideMenu.style.transitionDuration = "300ms";

          // menuOpen = true;
        } else {
          hamburgermenu.style.display = "none";
          hamburgerMenuClose.style.display = "block";
          // sideMenu.style.display = 'block'
          sideMenu.style.opacity = "100";
          // sideMenu.style.marginTop = '70px'
          sideMenu.style.transform = "translateY(58px)";
          sideMenu.style.transitionDuration = "300ms";
          // mt-[70px]
          // setMenuOpen(false);
        }
      }
    };

    updateMenuDisplay();
    window.addEventListener("resize", updateMenuDisplay);

    //コンポーネントがアンマウントされたときに、イベントリスナーをクリーンアップする。
    return () => {
      window.removeEventListener("resize", updateMenuDisplay);
    };
  }, [menuOpen]);

  return (
    <>
      {/* // スマホの場合のみ表示する要素 */}
      <div className="">
        <div
          id="menu-container"
          className="absolute z-50 h-auto mt-2 mr-2 mb-0 ml-auto p-0 top-0 right-0"
        >
          <img
            src="/bars_24.svg"
            onClick={toggleMenu}
            className="hamburgermenu lg:hidden ml-auto z-40 h-12 bg-white rounded-md"
          />
          {/* <div className='sidebar hidden flex-col float-right text-center z-10 mr-10'> */}
          {/* <div className="flex h-auto m-0 ml-auto mb-0 p-0 top-0"> */}
          <img
            src="/bars_x.svg"
            onClick={toggleMenu}
            className="hamburger-menu-close lg:hidden ml-auto z-40 h-12 bg-white rounded-md"
          />{" "}
          {/* </div> */}
        </div>{" "}
        <ul className="sideMenu lg:hidden text-center mr-2 ml-auto z-20 w-28 bg-gray-700 text-white">
          <li className="ml-0 p-1 hover:bg-pink-200 border-b list-none">
            <Link href="/">Blog</Link>
          </li>
          <li className="ml-0 p-1 hover:bg-pink-200 border-b list-none">
            <Link href="/works">Works</Link>
          </li>
          <li className="ml-0 p-1 hover:bg-pink-200 border-b list-none">
            <Link href="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </div>

      {/* </div> */}
    </>
  );
};
