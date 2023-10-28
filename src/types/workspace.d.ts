interface Iworkspace {
  _id: string;
  name: string;
  boardIds: string;
}

interface IaddWorkspace {
  name: string;
  members: Imember[];
}
