import React, { setState } from "react";
import Head from "next/head";

import Desktop from "../components/Desktop"

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Party Round Mag</title>
        <meta name="description" content="Your place for up to date, always true news." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Desktop />
      </main>
    </div>
  );
};

export default Home;
