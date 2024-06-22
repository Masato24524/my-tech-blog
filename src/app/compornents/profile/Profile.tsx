import './Profile.css';


export function Profile(): React.ReactElement {
    return (
        <div className="inline-flex float-right w-1/4 max-h-60 top-0 mt-44 mr-10 pb-10 border border-gray-300">
            <div id='profile-container' className="p-2">
                {/* <p className='text-2xl'>&nbsp;</p> */}
                <br></br>
                <p className='text-2xl'>Masato</p>
                <br></br>
                <p>未経験からフロントエンジニアを目指し学習中です。</p>
                <a className='mt-4' href="https://x.com/masato24524">
                &nbsp;&#x1D54F;:masato24524
                    {/* <img src="logo-handle.jpg" className='mt-5 ml-1 w-24 h-6'></img> */}
                </a>
            </div>
        </div>
    )
}