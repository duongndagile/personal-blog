import { useTranslation } from "next-i18next";
import ButtonCustom from "../UI/Button";
import AboutMe from "./AboutMe";
import styles from "./index.module.scss";
import { privateRequest, request } from "../../api/request";
import { useRequest } from "ahooks";
import MapComponent from "../UI/Map";

const Home = () => {
  const { t } = useTranslation("common");

  const requestGetPost = async () => {
    const params = {
      page: 1,
      title: "title",
      tags: "Html",
    };
    return privateRequest(request.get, "/posts", { params });
  };

  const useGetPost = () => {
    const { data, run } = useRequest(requestGetPost);
    const getPosts = () => {
      run();
    };
    return {
      posts: data,
      getPosts: getPosts,
    };
  };

  const { getPosts } = useGetPost();
  return (
    <div className={styles.homePage}>
      <h2>{t("home_page")}</h2>
      <ButtonCustom onClick={getPosts}>Get post</ButtonCustom>
      <div className={styles.mapContainer}>
        <MapComponent />
      </div>
      <AboutMe />
    </div>
  );
};

export default Home;
