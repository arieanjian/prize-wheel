import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

const useAddWs = () => {
  return useMutation({
    mutationFn: async (mutation_data: IaddWorkspace) => {
      const res: IapiResponse = await instance.post(
        "/workspace/addWorkspace",
        mutation_data
      );
      const { data, msg, status } = res;

      if (status === "success") {
        message.success(msg);
        return data as IauthResponse;
      }

      message.error(msg);
    },
    // onSuccess: async (res) => {
    //   if (!res) return;
    //   const { userInfo, token } = res as IauthResponse;
    //   // set cookie
    //   Cookies.set("cardify-token", token);
    //   // set useAuth 的 data
    //   queryClient.setQueryData(["useAuth"], userInfo);
    //   // 導轉到 workspace
    //   navigate("/workspace");
    //   onSuccess();
    // },
  });
};

export default useAddWs;
