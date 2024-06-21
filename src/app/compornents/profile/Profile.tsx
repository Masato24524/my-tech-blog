import './Profile.css';


export function Profile(): React.ReactElement {
    return (
        <div className="inline-flex float-right w-1/5 max-h-44 top-0 mt-10 pb-12 border-2 border-gray-600">
            <div className="">
                <p className='text-2xl'>&nbsp;Profile</p>
                <br></br>
                <p className='text-2xl'>&nbsp; Masato</p>
                <br></br>
                <br></br>
                <a className='mt-4' href="https://x.com/masato24524">
                &nbsp;&#x1D54F;:masato24524
                    {/* <img src="logo-handle.jpg" className='mt-5 ml-1 w-24 h-6'></img> */}
                </a>

            </div>
        </div>
    )
}