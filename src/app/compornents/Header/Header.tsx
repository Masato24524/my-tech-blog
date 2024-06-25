'use client';

import { CSSProperties, useEffect, useState } from 'react';
import './Header.css';
import Link from 'next/link';

export function Header(): React.ReactElement {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        const hamburgermenu = document.querySelector('.hamburgermenu') as HTMLElement;
        if (menuOpen == false) {
            sidebar.style.display = 'block'
            hamburgermenu.style.display = 'none'
            setMenuOpen(true);
        } else {
            sidebar.style.display = 'none'
            hamburgermenu.style.display = 'block'
            setMenuOpen(false);
        };
    }

    // const style: CSSProperties = {
    //     display: 'hidden'
    // }

    return (
        <div>
            <header className='fixed z-0 w-full h-28 top-0 bg-white bg-center bg-cover font-medium bg-[url(/bg-main-cut.jpg)]'>
                <Link href='/blogs' className='bg-white inline-flex p-1 px-2 m-2 rounded-lg bg-opacity-70'>
                    {`Masato's tech Blog`}
                </Link>

                <ul className='hidden lg:flex select-none w-80 h-20 m-4 p-2 rounded-lg float-right justify-center'>
                    <li>
                        {/* PCの場合のみ表示する要素 */}
                        <Link href='/blogs' className='bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-4 rounded-lg'>
                            {'BLOG'}
                        </Link>
                    </li>
                    <li>
                        <Link href='#' className='bg-gray-300 flex m-auto p-1 px-8 mr-10 rounded-lg'>
                            {'WORKS'}
                        </Link>
                    </li>
                </ul>
                <Menu toggleMenu={toggleMenu} menuOpen={menuOpen} />
            </header>
        </div>
    )
}

export const Menu = ({toggleMenu, menuOpen}: { toggleMenu: () => void, menuOpen: boolean}) => {
    // const closeMenu = () => {
    //     toggleMenu();
    // }
    
    // useEffect(() => {
    //     const hamburgermenu = document.querySelector('.hamburgermenu') as HTMLElement;
    //     const sidebar = document.querySelector('.sidebar') as HTMLElement;
    //     const handleTransitionEnd = () => {
    //         if (menuOpen == true) {
    //             hamburgermenu.style.display = 'none';
    //             // sidebar.style.display = 'none';
    //         };
    //     };
    //     sidebar.addEventListener('transitionend', handleTransitionEnd);

    //     return () => {
    //         sidebar.addEventListener('transitionend', handleTransitionEnd);
    //     };
    // }, [menuOpen])

    return (
        // スマホの場合のみ表示する要素
        <div>
            <img src='bars_24.svg' onClick={toggleMenu} className='hamburgermenu lg:hidden flex float-right z-20 w-12 h-12 mr-10 bg-white rounded-md'/>
            <div className='sidebar hidden flex-col float-right text-center z-10 mr-10'>
                <img src='bars_x.svg' onClick={toggleMenu} className='hamburger-menu-close lg:hidden float-right z-20 w-12 h-12 mb-2 bg-white rounded-md'/>
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