import { App } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  userId?: string;
}

const useWsByUserId = (props: Iprops) => {
  const { message } = App.useApp();
  const { data, ...rest } = useQuery<Iworkspace[], Error>({
    queryKey: ["useWsByUserId", props.userId],
    placeholderData: keepPreviousData,
    enabled: !!props.userId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/workspace/getByUserId", {
        params: props,
      });
      if (!res) {
        return [];
      }
      if (res.status === "success") {
        return res.data as Iworkspace[];
      }

      if (res.status === "error" || res.status === "fail") {
        message.error(res.msg);
        return [];
      }
      return [];
    },
  });

  return {
    ...rest,
    data: data || [],
  };
};

export default useWsByUserId;
