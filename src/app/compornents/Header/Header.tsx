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
            <header id='header' className='fixed flex z-0 w-full h-28 top-0 bg-white bg-center bg-cover font-medium bg-[url(/OIG2-cut.jpg)]'>
                <Link href='/' className='bg-white h-8 p-1 px-2 m-2 rounded-lg bg-opacity-70'>
                    {`Masato's tech Blog`}
                </Link>
                <div className='flex-grow'></div>
                    <ul className='hidden lg:flex h-20 m-4 p-2 rounded-lg '>
                        <li className=''>
                            {/* PCの場合のみ表示する要素 */}
                            <Link href='/' className='bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-4 rounded-lg'>
                                {'BLOG'}
                            </Link>
                        </li>
                        <li className=''>
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

