import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";

interface itemApi {
  name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  stargazers_count: number;
  language: string;
}

const App: React.FC = () => {
  const [itemsArray, setItemsArray] = useState<itemApi[]>([]);
  const [languageArray, setlanguageArray] = useState<itemApi[]>([]);
  const [textContent, settextContent] = useState("All");
  const [pageNum, setpageNum] = useState(1);
  const [itemCount, setitemCount] = useState(0);

  useEffect(() => {
    const fetchApi = async (): Promise<itemApi[]> => {
      try {
        const { items } = await (
          await fetch(
            "https://api.github.com/search/repositories?q=stars:>10000&sort=stars"
          )
        ).json();
        setItemsArray(items);
        return items;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    fetchApi();
  }, []);

  let totalPages =
    languageArray.length > 0
      ? Math.round(languageArray.length / 5)
      : Math.round(itemsArray.length / 5);
  totalPages === 0 && (totalPages = 1);
  // let filteredArr: string[] = [];
  // for (let i = 0; i < itemsArray.length; i++) {
  //   if (!filteredArr.includes(itemsArray[i].language)) {
  //     filteredArr.push(itemsArray[i].language);
  //   }
  // }
  const filteredArr = Array.from(
    new Set(itemsArray.map((val) => val.language))
  );

  const langHandler = (e: React.MouseEvent) => {
    // console.log(e.currentTarget.textContent);

    const updatedArray = itemsArray.filter((item) => {
      return item.language === e.currentTarget.textContent;
    });
    console.log(updatedArray);
    setlanguageArray((prevState) => {
      let updatedState = [...prevState];
      updatedState.length = 0;
      updatedState = [...updatedArray];
      return updatedState;
    });
    console.log(e.currentTarget.textContent)
    settextContent(e.currentTarget.textContent as string);
    setpageNum(1);
    setitemCount(0);
  };

  const PageDecrementHandler = (e: React.MouseEvent) => {
    setitemCount(itemCount - 5);
    setpageNum(pageNum - 1);
  };

  const pageIncremnentHandler = (e: React.MouseEvent) => {
    setitemCount(itemCount + 5);
    setpageNum(pageNum + 1);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="language">
        <span
          className={textContent === "All" ? "clicked" : ""}
          onClick={() => {
            setlanguageArray((prevState) => {
              let updatedState = [...prevState];
              updatedState.length = 0;
              return updatedState;
            });
            settextContent("All");
          }}
        >
          All
        </span>
        {filteredArr.sort().map((language, index) => (
          <span
            key={index}
            onClick={langHandler}
            className={textContent === language ? "clicked" : ""}
          >
            {language}
          </span>
        ))}
      </div>
      <div className="App">
        {languageArray.length > 0
          ? languageArray
              .slice(itemCount, itemCount + 5)
              .map((item: itemApi, index) => {
                return (
                  <div key={index} className="item">
                    <p>#{index + 1}</p>
                    <div className="image">
                      <img src={item.owner.avatar_url} alt="pic" />
                    </div>

                    <p>{item.name}</p>
                    <p>@{item.owner.login}</p>
                    <p>{item.stargazers_count} stars</p>
                  </div>
                );
              })
          : itemsArray
              .slice(itemCount, itemCount + 5)
              .map((item: itemApi, index) => {
                return (
                  <div key={index} className="item">
                    <p>#{index + 1}</p>
                    <div className="image">
                      <img src={item.owner.avatar_url} alt="pic" />
                    </div>

                    <p>{item.name}</p>
                    <p>@{item.owner.login}</p>
                    <p>{item.stargazers_count} stars</p>
                  </div>
                );
              })}
      </div>

      <div className="page">
        <button
          className="prev"
          onClick={() => {
            setitemCount(itemCount - 5);
            setpageNum(pageNum - 1);
          }}
          disabled={pageNum === 1 ? true : false}
        >
          Prev
        </button>
        <span>
          {/* {pageNum}/{totalPages} */}
          {pageNum > 1 ? (
            <button onClick={PageDecrementHandler}>{pageNum - 1}</button>
          ) : null}
          <button
            style={{
              color: "red",
              border: "2px solid red",
              margin: "5px",
            }}
          >
            {pageNum}
          </button>
          {pageNum !== totalPages && (
            <button onClick={pageIncremnentHandler}>{pageNum + 1}</button>
          )}
          <span> ... {totalPages}</span>
        </span>
        <button
          className="next"
          onClick={() => {
            setitemCount(itemCount + 5);
            setpageNum(pageNum + 1);
          }}
          disabled={pageNum >= totalPages ? true : false}
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default App;
