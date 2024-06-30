'use client';

import Link from "next/link";
import React, { useEffect } from "react";

type HeaderProps = {
    toggleMenu: () => void;
    menuOpen: boolean;
};

export const Menu: React.FC<HeaderProps> = ({ toggleMenu, menuOpen}) => {
    useEffect(() => {
        const hamburgermenu = document.querySelector('.hamburgermenu') as HTMLElement;
        // const sidebar = document.querySelector('.sidebar') as HTMLElement;
        const hamburgerMenuClose = document.querySelector('.hamburger-menu-close') as HTMLElement;
        const sideMenu = document.querySelector('.sideMenu') as HTMLElement;
        
        const updateMenuDisplay = () => {
            if (window.innerWidth >= 1024) {
                hamburgermenu.style.display = 'none'
                hamburgerMenuClose.style.display = 'none'
                // sidebar.style.display = 'none';
            } else {
                if (!menuOpen) {
                    hamburgermenu.style.display = 'block'
                    // sidebar.style.display = 'none'
                    hamburgerMenuClose.style.display = 'none'
                    sideMenu.style.opacity = '0'
                    // sideMenu.style.marginTop = '70px'
                    sideMenu.style.transform = 'translateY(55px)'
                    // menuOpen = true;
                } else {
                    hamburgermenu.style.display = 'none'
                    hamburgerMenuClose.style.display = 'block'
                    // sideMenu.style.display = 'block'
                    sideMenu.style.opacity = '100'
                    // sideMenu.style.marginTop = '70px'
                    sideMenu.style.transform = 'translateY(115px)'
                    sideMenu.style.transitionDuration = '300ms'
                    // mt-[70px] 
                    // setMenuOpen(false);
                }
            }
        };

        updateMenuDisplay();
        window.addEventListener('resize', updateMenuDisplay);

        //コンポーネントがアンマウントされたときに、イベントリスナーをクリーンアップする。
        return () => {
            window.removeEventListener('resize', updateMenuDisplay);
        };
    }, [menuOpen]);

    return (
        // スマホの場合のみ表示する要素
        // <div>

            <div className="relative flex flex-col justify-end mb-4">
                <ul className='sideMenu lg:hidden relative text-center h-16 z-20 w-28 mr-8 bg-gray-700 text-white'>
                    <li className='p-1 hover:bg-pink-200 border-b'>
                        <Link href='/'>BLOG</Link>
                    </li>
                    <li className='p-1'>
                        <Link href='#'>WORKS</Link>
                    </li>
                </ul>
                <img src='../bars_24.svg' onClick={toggleMenu} className='hamburgermenu lg:hidden float-right ml-auto z-40 w-12 h-12 mr-8 bg-white rounded-md'/>
                {/* <div className='sidebar hidden flex-col float-right text-center z-10 mr-10'> */}
                <img src='../bars_x.svg' onClick={toggleMenu} className='hamburger-menu-close lg:hidden float-right ml-auto z-40 w-12 h-12 mr-8 bg-white rounded-md'/>

                {/* </div> */}
            </div>
        // </div>
    )
}