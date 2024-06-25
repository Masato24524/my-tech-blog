import React, { useEffect, useState } from 'react';
import './Footer.css';

export function Footer(): React.ReactElement {

    return (
        <div id='footer-container' className=''>
            <footer className='relative block text-center w-full h-28 bg-gray-300 font-medium'>
                <p className='absolute inline bottom-0 p-1 px-2 rounded-lg bg-white bg-opacity-70'>{'XXXXXXXXXXXXXXXXXXXX'}</p>
            </footer>
        </div>
    )
}