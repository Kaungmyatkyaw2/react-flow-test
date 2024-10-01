declare interface TableNodeData {
  label: string;
  columns: {
    id: string;
    name: string;
    type: string;
  }[];
}

declare interface TableNode {
  id: string;
  data: TableNodeData;
}
