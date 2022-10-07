import dynamic from "next/dynamic";

const MainHeader = dynamic(() => import("../components/MainHeader"));
const Footer = dynamic(() => import("../components/Footer"));

import styles from "./index.module.scss";

const MainLayout = ({ children }: any) => {
  return (
    <div className={styles.mainLayout}>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
