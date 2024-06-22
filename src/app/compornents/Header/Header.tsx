import React from 'react';
import './Header.css';

export function Header(): React.ReactElement {
    return (
        <div>
            <header className="fixed w-full h-20 top-0 bg-white pb-12 bg-[url(/unsplash.jpg)] font-medium">{`Masato's tech Blog`}
                {/* <div className="inline-flex float-right">
                </div> */}
            </header>
        </div>
    )
}