import React, { useEffect, useState } from 'react';
import './Footer.css';

export function Footer(): React.ReactElement {

    return (
        <div id='footer-container' className='bottom-0'>
            <footer className='relative block text-center w-full h-28 bg-gray-300 font-medium'>
                <p className='absolute inline bottom-0 p-1 px-2 rounded-lg bg-white bg-opacity-70'>{'XXXXXXXXXXXX'}</p>
                {/* <div className=' w-80 h-20 m-4 p-2 rounded-lg inline-flex float-right justify-center'>
                    <a href='/blogs' className='bg-white hover:bg-pink-200 flex m-auto p-1 px-8 mr-4 rounded-lg'>{'BLOG'}</a>
                    <a href='#' className='bg-gray-300 flex m-auto p-1 px-8 mr-10 rounded-lg'>{'WORKS'}</a>
                </div> */}

            </footer>
        </div>
    )
}