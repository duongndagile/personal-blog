import { useTranslation } from "next-i18next";

const AboutMe = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("about_me")}</h2>
    </>
  );
};

export default AboutMe;
