import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  userId?: string;
}

interface Iresponse extends IapiResponse {
  data: Iworkspace[];
}

const useWsByUserId = (props: Iprops) => {
  const { data: response, ...rest } = useQuery({
    queryKey: ["useWs", props],
    keepPreviousData: true,
    enabled: !!props.userId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/workspace/getByUserId", {
        params: props,
      });
      return res;
    },
    onSuccess: (res: Iresponse) => {
      const { status, msg } = res;

      if (status === "error") {
        message.error(msg);
      }
    },
  });

  if (!response) {
    return { ...rest, data: [] };
  }

  if (response.status === "success") {
    return { ...rest, data: response.data };
  }

  return { ...rest, data: [] };
};

export default useWsByUserId;
