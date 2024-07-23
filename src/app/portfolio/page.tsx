import { Footer } from 'app/compornents/Footer/Footer'
import { Header } from 'app/compornents/Header/Header'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <body>
        <Header />
            <div>
                <p className="p-40 pb-10 ">
                【家計簿アプリ】
                </p>
                <Link href="https://masato24524.github.io/household-app-temp/">
                    <img className="w-[35%] h-[35%] ml-40 mb-80" src="/household.png" alt="" />
                </Link>

            </div>
            <Footer />

    </body>

  )
}

export default page
