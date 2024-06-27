'use client';

import './Header.css';
import Link from 'next/link';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
    
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

