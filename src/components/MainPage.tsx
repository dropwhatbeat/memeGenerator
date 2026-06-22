import "./MainPage.scss";
import { useEffect, useState } from "react";
import Favourites from "./navigation/Favourites";
import { IFavList, IMemeType, SCROLL_TYPE, TabsState } from "../memeTypes";
import MemeContainer from "./page-content/MemeContainer";
import TopBar from "./navigation/TopBar";
import { Analytics } from "@vercel/analytics/react";

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState(TabsState.MAIN);
  const [favList, setFavList] = useState<any | IFavList>(
    JSON.parse(localStorage.getItem("favList") as string) || {}
  );
  const [checkMeme, setCheckMeme] = useState({});
  const [scroll, setScroll] = useState(SCROLL_TYPE.NONE);

  useEffect(() => {
    localStorage.setItem("favList", JSON.stringify(favList));
  }, [favList]);

  useEffect(() => {
    if (localStorage.getItem("favList")) {
      const parse = JSON.parse(localStorage.getItem("favList") as string);
      setFavList(parse);
    }
  }, []);

  const handleSave = (meme: IMemeType) => {
    const memeKey = Object.keys(meme)[0] as string;
    const memeValue = Object.values(meme)[0] as string;

    if (memeKey && memeValue) {
      if (Object.keys(favList).includes(memeKey)) {
        if (memeValue !== (favList[memeKey] as string)) {
          setScroll(SCROLL_TYPE.UP);
          let copy = { ...favList } as IMemeType;
          delete copy[memeKey];
          setFavList(() => ({ ...{ [memeKey]: memeValue }, ...copy }));
        } else {
          setScroll(SCROLL_TYPE.NONE);
        }
      } else {
        setFavList((favList: IFavList) => ({
          ...favList,
          ...{ [memeKey]: memeValue },
        }));
        setScroll(SCROLL_TYPE.DOWN);
      }
    }

    setCheckMeme("");
  };

  const handleDelete = (key: string) => {
    let copy = { ...favList } as IMemeType;
    delete copy[key];
    setFavList(() => ({ ...copy }));
    setScroll(SCROLL_TYPE.NONE);
  };

  return (
    <div className="main-page">
      <Favourites
        listData={favList}
        deleteData={(data) => {
          handleDelete(data);
        }}
        seeMeme={(meme) => setCheckMeme(meme)}
        scroll={scroll}
      />
      <TopBar
        tab={selectedTab}
        setSelectedTab={(state) => {
          setSelectedTab(state);
        }}
      />
      <div className="content">
        <MemeContainer
          saveMeme={(meme) => handleSave(meme)}
          selectedMeme={checkMeme}
        />
      </div>
      <Analytics />
    </div>
  );
};

export default MainPage;
