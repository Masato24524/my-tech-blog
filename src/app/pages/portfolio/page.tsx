import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
import React from "react";
import Link from "next/link";
import "./page.css";

const page = () => {
  return (
    <body>
      <Header />
      <div id="container" className="flex w-[90%] m-auto mt-48 text-center">
        <div
          id="household-app"
          className="w-[600px] h-1/3 mb-20 ml-20 rounded-lg shadow-md bg-white border-2 text-center"
        >
          <Link href="https://masato24524.github.io/household-app-temp/">
            <img
              className="w-[400px] h-[300px] m-auto mb-4 p-8 pb-4"
              src="/household.png"
              alt=""
            />
            <p className="pt-4 pb-2 font-bold bg-gray-200 text-center">
              　家計簿アプリ💰
              <br />
            </p>
            <p className="pb-4 text-gray-600 bg-gray-200">
              　日付ごとの収支が登録できる家計簿アプリです。
              <br />
              　<br />
            </p>
          </Link>
        </div>
        <div
          id="netflix-clone-app"
          className="w-[600px] h-1/3 mb-20 ml-20 rounded-lg shadow-md bg-white border-2 text-center"
        >
          <Link href="https://netflix-clone-app-smoky.vercel.app/">
            <img
              className="w-[400px] h-[300px] m-auto mb-4 p-8 pl-16 pb-4"
              src="/netflix-clone.png"
              alt="netflix-clone-app"
            />
            <p className="pt-4 pr-4 pb-2 font-bold bg-gray-200 text-center">
              　　　　　Nextflixクローンアプリ🎬
              <br />
            </p>
            <p className="pr-4 pb-4 text-gray-600 bg-gray-200">
              　Netflixのサイト構成を模倣したアプリです。
              <br />
              　映画をクリックすると、YouTubeのプロモーション映像が流れます。
              <br />
            </p>
          </Link>
        </div>
      </div>

      <p id="caution" className="pt-12 pb-20 pl-20 text-sm">
        【注意点】
        <br />
        　・本ページ内のアプリはポートフォリオ用のサンプルのため、データは予告なく削除される可能性があります。
        <br />
        　
        また、現在作成中のものがあり、仕様は予告なく変更される可能性があります。
        <br />
        　・アプリの使用において生じた直接的、間接的、偶発的、特別または結果的損害
        <br />
        　（利益の損失、データの喪失、業務の中断、コンピュータの故障など）について、当サイトは一切の責任を負いません。
        <br />
      </p>
      <Footer fetchedData={undefined} />
    </body>
  );
};

export default page;
