import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const getAccessToken = (req?: any, res?: any) => {
  if (req && res) {
    return getCookie("token", { req, res });
  }
  return getCookie("token") || "";
};

export const getRefreshToken = (req?: any, res?: any) => {
  if (req && res) {
    return getCookie("refreshToken", { req, res });
  }
  return getCookie("refreshToken") || "";
};

export const setAuthCookies = (
  {
    token,
    refreshToken,
  }: {
    token: string;
    refreshToken: string;
  },
  reqOnServer?: any
) => {
  setCookie("token", token, {
    res: reqOnServer?.res,
    req: reqOnServer?.req,
  });
  setCookie("refreshToken", refreshToken, {
    res: reqOnServer?.res,
    req: reqOnServer?.req,
  });
};

export const deleteAuthCookies = () => {
  deleteCookie("token");
  deleteCookie("refreshToken");
};
