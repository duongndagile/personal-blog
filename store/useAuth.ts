import { useRouter } from "next/router";
import { deleteAuthCookies, getAccessToken, setAuthCookies } from "./auth";
import request from "umi-request";
import { API_PATH } from "../src/api/constant";
import { useRequest } from "ahooks";
import { PREFIX_API } from "../src/api/request";

export interface IAuth {
  loading?: boolean;
  token: string | null;
  refreshToken?: string | null;
}

export const useAuth = () => {
  const router = useRouter();

  const onLogin = async (data: IAuth) => {
    try {
      setAuthCookies({
        token: `${data.token}`,
        refreshToken: `${data.refreshToken}`,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const requestLogout = useRequest(
    async (token: string) => {
      return request.post(`${PREFIX_API}${API_PATH.AUTH_LOGOUT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      manual: true,
    }
  );

  const onLogout = async () => {
    try {
      const token = getAccessToken();
      requestLogout.run(`${token}`);

      deleteAuthCookies();
      router.replace("/");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return {
    onLogin,
    onLogout,
  };
};
