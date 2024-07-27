import { Footer } from 'app/compornents/Footer/Footer'
import { Header } from 'app/compornents/Header/Header'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <body>
        <Header />
            <div className="w-1/2 h-2/3 mt-40 mb-20 ml-20 rounded-lg shadow-md bg-white border-2 text-center">
              <Link href="https://masato24524.github.io/household-app-temp/">
                <img className="w-[100%] h-auto mb-4 p-4 pb-4" src="/household.png" alt="" />

                <p className="pt-4 pb-2 font-bold bg-gray-100">
                　　　　　　　家計簿アプリ💰（仮リリース版）<br />
                </p>
                <p className="pb-4 text-gray-600 bg-gray-100">
                　日付ごとの収支が登録できる家計簿アプリです。<br />
                　※スマホ画面のレイアウトは未対応<br />
                </p>
              </Link>
            </div>
            <p className="pt-12 pb-20 pl-20 text-sm">
                【注意点】<br />
                　・本ページ内のアプリはポートフォリオ用のサンプルのため、データは予告なく削除される可能性があります。<br />
                　 また、現在作成中のものがあり、仕様は予告なく変更される可能性があります。<br />
                　・アプリの使用において生じた直接的、間接的、偶発的、特別または結果的損害<br />
                　（利益の損失、データの喪失、業務の中断、コンピュータの故障など）について、当サイトは一切の責任を負いません。<br />
                </p>
            <Footer />

    </body>

  )
}

export default page
