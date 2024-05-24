interface Ilist {
  id: string;
  name: string;
  order: number;
  kanbanId: string;
}

interface IaddList {
  name: string;
  kanbanId: string;
}

interface IchangeListOrder {
  activeListId: string;
  overListId: string;
}
