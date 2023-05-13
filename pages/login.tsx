import Head from "next/head";
import Login from "../src/components/Auth/Login";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SignInPage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("title_login")}</title>
      </Head>
      <Login />
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default SignInPage;
