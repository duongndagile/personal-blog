import "../styles/settings.scss";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { AppProps } from "next/app";
import { useEffect, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import dayjs from "dayjs";
import nextI18nConfig from "../next-i18next.config";
import { useRouter } from "next/router";
import Script from "next/script";
import { ENV } from "../src/constant/env";

const locales: any = {
  en: import("dayjs/locale/en"),
  vi: import("dayjs/locale/vi"),
};

const setDayJsLocale = (language: string) => {
  locales[language].then(() => {
    dayjs.locale(language);
  });
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    setDayJsLocale(router.locale as string);
  }, [router.locale]);

  const getLayout = Component.getLayout
    ? Component.getLayout
    : (page: any) => page;
  return getLayout(<Component {...pageProps} />);
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default appWithTranslation(MyApp, nextI18nConfig);
