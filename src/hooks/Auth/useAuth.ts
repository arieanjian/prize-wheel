import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// API
import instance from "@/service/instance";
// util
import { USER_INIT_VALUE } from "@/util/initValue";

const useAuth = () => {
  const navigate = useNavigate();
  const { data: user, ...rest } = useQuery<IUser, Error>({
    queryKey: ["useAuth"],
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/auth/verifyAuth");
      const { data, status } = res;

      if (status === "success") {
        const { userInfo, token } = data as IauthResponse;
        // 取得使用者資訊時更新token
        Cookies.set("cardify-token", token);
        return userInfo;
      }

      // message.error(msg);
      return USER_INIT_VALUE;
    },

    onSuccess: (user) => {
      console.log("useAuth onSuccess data = ", user);
      // 登入成功導轉到 workspace
      user._id.length > 0 ? navigate("/workspace") : navigate("/");
    },
  });

  return {
    ...rest,
    data: user || USER_INIT_VALUE,
  };
};

export default useAuth;
