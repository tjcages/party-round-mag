import React, { useEffect } from "react";
import Head from "next/head";

import Desktop from "../components/Desktop";
import { listenToOrders } from "./api";
import useStore from "../store";

const Home = () => {
  const setOrders = useStore((state) => state.setOrders);

  useEffect(() => {
    listenToOrders(setOrders);
  }, [setOrders]);

  return (
    <div className="container">
      <Head>
        <title>Party Round Mag</title>
        <meta
          name="description"
          content="Your place for up to date, always true news."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Desktop />
    </div>
  );
};

export default Home;
