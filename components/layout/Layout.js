import React from "react";
import Head from "next/head";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";


export default function Layout ({ children, title = "رزرو بهترین هتل ها و اقاتگاه ها" })  {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

