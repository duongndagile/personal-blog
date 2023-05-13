import { extend } from "umi-request";
import { ENV } from "../constant/env";
import TokenManagement, { parseJwt } from "./tokenManagement";
import {
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
} from "../../store/auth";
import { API_PATH } from "./constant";
import dayjs from "dayjs";

export const PREFIX_API = ENV.API_URL;
const REQ_TIMEOUT = 30 * 1000;

const request = extend({
  prefix: PREFIX_API,
  timeout: REQ_TIMEOUT,
  errorHandler: (error) => {
    throw error;
  },
});

const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  if (configs?.headers?.Authorization) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
      },
    };
  }
  if (configs?.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const TokenManager = new TokenManagement({
  isTokenValid: () => {
    try {
      const token = getAccessToken();

      const decoded = parseJwt(token);
      const { exp } = decoded;
      console.log("isValidToken");
      // const currentTime = Date.now() / 1000;
      const currentTimeNextDay = dayjs().add(1, "day").unix() - 65;

      if (exp - 30 > currentTimeNextDay) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
  getAccessToken: () => {
    return getAccessToken() as string;
  },
  onRefreshToken(done) {
    const refreshToken = getRefreshToken();
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      return done(null);
    }
    request
      .post(API_PATH.AUTH_REFRESH_TOKEN, {
        data: {
          refreshToken,
        },
      })
      .then((result) => {
        console.log("result", result);
        if (result.accessToken && result.refreshToken) {
          setAuthCookies({
            token: result?.accessToken,
            refreshToken: result?.refreshToken,
          });
          done(result.accessToken);
          return;
        }
        done(null);
      })
      .catch(() => {
        done(null);
      });
  },
});

const privateRequest = async (request: any, suffixUrl: any, configs?: any) => {
  const token: string = configs?.token
    ? configs?.token
    : ((await TokenManager.getToken()) as string);
  return request(suffixUrl, injectBearer(token, configs));
};

export { request, privateRequest };
