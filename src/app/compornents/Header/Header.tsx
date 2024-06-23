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
            <header className="fixed w-full h-28 top-0 bg-white bg-center bg-cover font-medium bg-[url(/bg-main-cut.jpg)]">
                <p className='bg-white inline-flex p-1 px-2 m-2 rounded-lg bg-opacity-70'>{`Masato's tech Blog`}</p>
                <p className='bg-white inline-flex float-right p-2 px-20 mr-10 mt-6 rounded-lg'>{'WORKS'}</p>
            </header>
            {/* {showBackground && (
                <div className='bg-[url(https://picsum.photos/2000/200)]'>
                </div>
            )}; */}
        </div>
    )
}