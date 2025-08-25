import "./Profile.css";

export function Profile(): React.ReactElement {
  return (
    <div
      id="profile-container"
      className="inline-flex float-right h-min top-0 mt-[0px] p-4 pb-8 text-gray-950 bg-white shadow-md"
    >
      <div className="p-2">
        {/* <p className='text-2xl'>&nbsp;</p> */}
        <br></br>
        <img src="/my-icon3.jpg" className="rounded-full max-w-20 mx-auto" />
        <p className="text-2xl text-center">Masato</p>
        <br></br>

        <p className="text-sm">
          元機械設計技術者。
          <br />
          独学でNext.js、TypeScriptなどを学習し、未経験からITエンジニアへキャリアチェンジしました。
        </p>
        <br></br>

        <p className="text-sm">
          技術スタック：
          <br />
          JavaScript, TypeScript, React, Next.js, Python, Java
        </p>

        <div className="flex w-full mx-auto justify-center">
          <a
            id="profile"
            className="text-black mt-4 mr-2 py-1 px-[12px] rounded-full text-2xl border border-black"
            href="https://x.com/ma_sato2024"
          >
            &#x1D54F;
            {/* <img src="logo-handle.jpg" className='mt-5 ml-1 w-24 h-6'></img> */}
          </a>
          <a
            id="zenn"
            className="bg-white w-10 mt-4 mr-2 py-1 px-[8px] rounded-full border border-black"
            href="https://zenn.dev/masato24524"
          >
            <img src="/logo-zenn.png" className="mt-1 h-6"></img>
          </a>
        </div>
        <br></br>
        <p className="text-sm">
          お仕事のご相談を受け付けています。 <br />
          下記の問い合わせフォームよりご連絡ください。
        </p>
        <a
          id="contact"
          className="flex mt-4 text-sm justify-center text-decoration-line: underline"
          href="/contact"
        >
          お問い合わせフォーム
        </a>
      </div>
    </div>
  );
}
