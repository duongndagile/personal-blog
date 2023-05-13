import React from "react";
import ButtonCustom from "../../../components/UI/Button";

import styles from "./index.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAuth } from "../../../../store/useAuth";
import { getAccessToken } from "../../../../store/auth";

const MainHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const token = getAccessToken();
  const { onLogout } = useAuth();
  const changeLanguage = () => {
    if (router.locale === "en") {
      router.push(router.pathname, router.asPath, {
        locale: "vi",
      });
    } else {
      router.push(router.pathname, router.asPath, {
        locale: "en",
      });
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>{t("title_page")}</div>
      <div className={styles.linkList}>
        <a href="#">{t("about_me")}</a>
        <a href="#">{t("project")}</a>
        <a href="#">{t("contact")}</a>
        {/* <ButtonCustom>{t("label_button_change_mode")}</ButtonCustom> */}
        <ButtonCustom typeDisplay="secondary" onClick={changeLanguage}>
          {t("label_button_change_language")}
        </ButtonCustom>
        {token ? (
          <ButtonCustom onClick={onLogout}>
            {t("label_button_logout")}
          </ButtonCustom>
        ) : (
          <ButtonCustom onClick={handleLogin}>
            {t("label_button_login")}
          </ButtonCustom>
        )}
      </div>
    </div>
  );
};
export default MainHeader;
