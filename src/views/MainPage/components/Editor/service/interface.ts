export interface IBlock {
  id: string;
  type: string;
}

export interface IData {
  container: {
    width: string;
    height: string;
  };
  blocks: IBlock[];
}

export interface IEditorProps {
  data: IData;
}
