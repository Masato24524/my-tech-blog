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
        const sidebar = document.querySelector('.sidebar') as HTMLElement;

        if (!menuOpen) {
            hamburgermenu.style.display = 'block'
            sidebar.style.display = 'none'
            if (window.screenX >= 1024) {
                hamburgermenu.style.display = 'none'
                sidebar.style.display = 'none';
            }
            // menuOpen = true;
        } else {
            hamburgermenu.style.display = 'none'
            sidebar.style.display = 'block'
            // setMenuOpen(false);
        };
    }, [menuOpen])

    return (
        // スマホの場合のみ表示する要素
        <div>
            <img src='../bars_24.svg' onClick={toggleMenu} className='hamburgermenu lg:hidden flex float-right z-20 w-12 h-12 mr-10 bg-white rounded-md'/>
            <div className='sidebar hidden flex-col float-right text-center z-10 mr-10'>
                <img src='../bars_x.svg' onClick={toggleMenu} className='hamburger-menu-close lg:hidden float-right z-20 w-12 h-12 mb-2 bg-white rounded-md'/>
                <ul className='lg:hidden'>
                    <li className='w-20 h-auto mt-[55px] p-1 bg-white hover:bg-pink-200 border border-black'>
                        <Link href='/blogs'>BLOG</Link>
                    </li>
                    <li className='mt-1 p-1 bg-gray-300'>
                        <Link href='#'>WORKS</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}