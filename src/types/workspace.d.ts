interface Iworkspace {
  _id: string;
  name: string;
  ownerId: string;
  userIds: string[];
  kanbanIds: string[];
  memberIds: string[];
}

interface IaddWorkspace {
  name: string;
  members: Imember[];
}
