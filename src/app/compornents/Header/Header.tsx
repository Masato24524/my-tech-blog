import React from 'react';
import './Header.css';

export function Header(): React.ReactElement {
    return (
        <header className="sticky w-full h-10 top-0 bg-white pb-12">{`Masato's tech Blog`}
            <div className="inline-flex float-right">

            </div>
        </header>
    )
}