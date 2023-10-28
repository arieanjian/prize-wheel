import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  workspaceId?: string;
}

interface Iresponse extends IapiResponse {
  data: Imember[];
}

const useMembers = (props: Iprops) => {
  const { data: response, ...rest } = useQuery({
    queryKey: ["useMembers", props],
    keepPreviousData: true,
    enabled: !!props.workspaceId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/workspace/getMembers", {
        params: props,
      });
      return res;
    },
    onSuccess: (res: Iresponse) => {
      const { status, msg, data } = res;

      if (data && data.length === 0) {
        message.error(msg);
      }

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

export default useMembers;

// const useMembers = (props: Iprops) => {
//   const { data: users, ...rest } = useQuery<Imember[], Error>({
//     queryKey: ["useMembers"],
//     queryFn: async () => {
//       if (!props.workspaceId) return [];

//       const res: IapiResponse = await instance.get("/workspace/getMembers", {
//         params: props,
//       });

//       const { data, status } = res;

//       if (status === "success") return data as Imember[];

//       return [];
//     },
//     onSuccess: (users: Imember[]) => {
//       console.log("useMembers onSuccess data = ", users);
//     },
//   });

//   return {
//     ...rest,
//     data: users,
//   };
// };

// export default useMembers;
