import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

interface UserName {
  first: string;
  last: string;
  title: string;
}
interface UserPicture {
  thumbnail: string;
}
interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

const getFullName = (userInfo: UserInfo) => {
  const {
    name: { first, last }
  } = userInfo;
  return `${first} ${last}`;
};

const fetchRandomData = (pageNumber: number = 1) => {
  return axios
    .get(`https://randomuser.me/api?page={pageNumber}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};

export default function App() {
  const [randomUserDataJSON, setRandomUserDataJSON] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState<any>([]);

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      setRandomUserDataJSON(JSON.stringify(randomData, null, 2));
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };
  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button
        onClick={() => {
          fetchNextUser();
        }}
      >
        next
      </button>
      {userInfos.map((userInfo: UserInfo, idx: number) => (
        <div>
          <p>{getFullName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail}></img>
        </div>
      ))}
    </div>
  );
}
