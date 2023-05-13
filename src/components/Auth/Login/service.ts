import { useRequest } from "ahooks";
import { API_PATH } from "../../../api/constant";
import { request } from "../../../api/request";

interface IOptionsRequest {
  onSuccess: (res: any) => void;
  onError: (error: { message: string }) => void;
}

export const useLogin = (options: IOptionsRequest) => {
  return useRequest(
    async (username: string) => {
      return request.post(API_PATH.AUTH_LOGIN, {
        data: {
          username,
        },
      });
    },
    {
      manual: true,
      ...options,
    }
  );
};
