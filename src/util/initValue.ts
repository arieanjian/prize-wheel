export const USER_INIT_VALUE: IUser = {
  username: "",
  email: "",
  avatar: "",
  _id: "",
};

export const WS_INIT_VALUE: Iworkspace = {
  _id: "",
  name: "",
  ownerId: "",
  userIds: [],
  kanbanIds: [],
  memberIds: [],
};

export const KANBAN_INIT_VALUE: Ikanban = {
  _id: "",
  workspaceId: "",
  name: "",
  isPinned: false,
  listIds: [],
};

export const QUERY_KANBANS_INIT_VALUE: IqueryKanbans = {
  kanbans: [],
  kanbanMap: {},
};

export const ROLE_DEFAULT_VALUE: Imember["role"][] = [
  "Owner",
  "Member",
  "Admin",
];
