export const runtime = "edge";

import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
import React from "react";
import Link from "next/link";
import "./page.css";
import ContactForm from "app/compornents/ContactForm/ContactForm";

const page = () => {
  return (
    <body>
      <Header />
      <div id="container" className="flex w-[90%] m-auto mt-48 text-center">
        <div
          id="household-app"
          className="w-[600px] h-1/3 mb-20 ml-20 rounded-lg shadow-md bg-white border-2 text-center"
        >
          <ContactForm />
        </div>
      </div>

      <Footer fetchedData={undefined} />
    </body>
  );
};

export default page;
