import React from "react";
import ButtonCustom from "../../../components/UI/Button";

import styles from "./index.module.scss";

const MainHeader = () => {
  return (
    <div className={styles.header}>
      <div>This is Logo</div>
      <div className={styles.linkList}>
        <a href="#">About me</a>
        <a href="#">Project</a>
        <a href="#">Contact</a>
        <ButtonCustom>Change Mode</ButtonCustom>
        <ButtonCustom typeDisplay="secondary">Change Language</ButtonCustom>
      </div>
    </div>
  );
};
export default MainHeader;
