import "./Profile.css";

export function Profile(): React.ReactElement {
  return (
    <div
      id="profile-container"
      className="inline-flex float-right w-auto h-min top-0 mt-[0px] mr-4 ml-8 p-4 pb-8 text-gray-950 bg-white shadow-md"
    >
      <div className="p-2">
        {/* <p className='text-2xl'>&nbsp;</p> */}
        <br></br>
        <img src="/my-icon.jpg" className="rounded-full max-w-20" />
        <p className="text-2xl">Masato</p>
        <br></br>
        <p>元機械設計技術者。</p>
        <p>
          独学でNext.js、TypeScriptなどを学習し、未経験からITエンジニアへキャリアチェンジしました。
        </p>
        <br></br>
        <a
          id="profile"
          className="bg-black text-white mt-4 py-1 px-2 rounded-md"
          href="https://x.com/masato24524"
        >
          &nbsp;&#x1D54F;&nbsp;:&nbsp;masato24524
          {/* <img src="logo-handle.jpg" className='mt-5 ml-1 w-24 h-6'></img> */}
        </a>
        <br></br>
        <br></br>
        <p>JavaScript, TypeScript, React, Next.js, Python</p>
      </div>
    </div>
  );
}
