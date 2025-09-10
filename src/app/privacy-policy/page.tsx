export const runtime = "edge";

import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
import React from "react";
import "./page.css";
import PrivacyPolicy from "app/compornents/PrivacyPolicy/PrivacyPolicy";

const page = () => {
  return (
    <body>
      <Header />
      <div id="container" className="flex w-[90%] mx-auto mt-20">
        <div
          id="household-app"
          className="h-1/3 mb-20 ml-20 rounded-lg shadow-md bg-white border-2"
        >
          <PrivacyPolicy />
        </div>
      </div>

      <Footer fetchedData={undefined} />
    </body>
  );
};

export default page;
