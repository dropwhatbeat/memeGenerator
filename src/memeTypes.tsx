export interface ITabsProps {
  tab: TabsState;
  setSelectedTab: (value: TabsState) => void;
}

export enum TabsState {
  MAIN = "MAIN",
  GENERATE = "GENERATE",
}

export interface IFavProps {
  listData: IMemeType;
  deleteData: (text: string) => void;
  seeMeme: (meme: IMemeType) => void;
  scroll: SCROLL_TYPE;
}

export interface IMemeProps {
  saveMeme: (meme: IMemeType) => void;
  selectedMeme: IMemeType;
}

export interface IFavList {
  favlist: IMemeType;
}
export interface IMemeType {
  [key: string]: string
}

export enum SCROLL_TYPE {
  UP = "UP",
  DOWN = "DOWN",
  NONE = "NONE"
}