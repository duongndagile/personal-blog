import type { NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";
// import MainLayout from "../src/layout/MainLayout";
import Home from "../src/components/Home";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ENV } from "../src/constant/env";
const MainLayout = dynamic(() => import("../src/layout/MainLayout"), {
  ssr: false,
});
declare const window: any;
const HomePage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("title_page")}</title>
      </Head>
      <Home />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

<Script
  src={`https://maps.googleapis.com/maps/api/js?key=${ENV.GOOGLE_API_KEY}&libraries=geometry&callback=initMap`}
/>;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default HomePage;
