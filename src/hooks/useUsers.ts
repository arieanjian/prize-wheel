import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  username?: string;
  _id?: string;
}

interface Iresponse extends IapiResponse {
  data: IUser[];
}

const useUsers = (props: Iprops) => {
  const { data: response, ...rest } = useQuery({
    queryKey: ["useUsers", props],
    keepPreviousData: true,
    enabled: !!props.username || !!props._id,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/user", {
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

export default useUsers;

// const useUsers = (props: Iprops) => {
//   const { data: users, ...rest } = useQuery<IUser[], Error>({
//     queryKey: ["useUsers", props],
//     keepPreviousData: true,
//     enabled: !!props.username || !!props._id,
//     queryFn: async () => {
//       const res: IapiResponse = await instance.get("/user", {
//         params: props,
//       });
//       const { data, status, msg } = res;

//       if (status === "success") return data as IUser[];
//       message.error(msg);
//       return [];
//     },
//     // onSuccess: (users: IUser[]) => {
//     //   console.log("useUsers onSuccess data = ", users);
//     // },
//   });

//   return {
//     ...rest,
//     data: users || [],
//   };
// };
