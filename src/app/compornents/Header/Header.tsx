import React, { useEffect, useState } from 'react';
import './Header.css';
// import { Router, useLocation } from 'react-router-dom';

export function Header(): React.ReactElement {
        // const location = useLocation();

        // useEffect(() => {
        //     if (typeof window !== 'undefined' && location.pathname === '/blogs' ) {
        //         const bgDiv = document.createElement('div');
        //         bgDiv.className = "bg-[url(https://picsum.photos/2000/200)]";
        //         document.body.appendChild(bgDiv);
    
        //         return () => {
        //             document.body.removeChild(bgDiv);
        //         };
        //     }
        // }, [location.pathname]);

    return (
        <div>
            <header className='fixed w-full h-28 top-0 bg-white bg-center bg-cover font-medium bg-[url(/bg-main-cut.jpg)]'>
                <a href='/blogs' className='bg-white inline-flex p-1 px-2 m-2 rounded-lg bg-opacity-70'>{`Masato's tech Blog`}</a>
                <div className=' w-80 h-20 m-4 p-2 rounded-lg inline-flex float-right justify-center'>
                    <a href='/blogs' className='bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-4 rounded-lg'>{'BLOG'}</a>
                    <a href='#' className='bg-gray-300 flex m-auto p-1 px-8 mr-10 rounded-lg'>{'WORKS'}</a>
                </div>

            </header>
            {/* {showBackground && (
                <div className='bg-[url(https://picsum.photos/2000/200)]'>
                </div>
            )}; */}
        </div>
    )
}