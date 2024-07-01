import React, { useEffect, useState } from 'react';
import './Footer.css';

export function Footer(): React.ReactElement {

    return (
        <div id='footer-container' className='mt-2'>
            <footer className='relative block w-full h-24 bg-gray-500'>
                <p className='absolute right-1 bottom-1 p-1 px-2 text-white font-light'>{`©Copyright2024 Masato's teck Blog All Rights Reserved.`}</p>
            </footer>
        </div>
    )
}