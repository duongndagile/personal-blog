import AboutMe from "./AboutMe";
import styles from "./index.module.scss";
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h2>Home Page</h2>
      <AboutMe />
    </div>
  );
};

export default HomePage;
