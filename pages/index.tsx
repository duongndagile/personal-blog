import type { NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import MainLayout from "../src/layout/MainLayout";
import HomePage from "../src/components/Home";

const Home = () => {
  return (
    <>
      <Head>
        <title>Duong&rsquo;s Blog</title>
      </Head>
      <HomePage />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export default Home;
