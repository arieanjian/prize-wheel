import "./index.css";

import { Button, Input, Modal } from "antd";
import React, { useRef, useState } from "react";

const Dashboard = () => {
  // const arr = [
  //   // // "rgb(254 242 242)", // 0~
  //   // "rgb(254 226 226)",
  //   // "rgb(254 202 202)",
  //   // "rgb(252 165 165)",
  //   // "rgb(248 113 113)",
  //   // "rgb(239 68 68)",
  //   // "rgb(220 38 38)",
  //   // "rgb(185 28 28)",
  //   // "rgb(153 27 27)",
  //   // "rgb(127 29 29)",
  //   // "rgb(69 10 10)",
  //   "skyblue",
  //   "yellow",
  //   "green",
  //   "pink",
  //   "black",
  //   "gray",
  //   "purple",
  //   "orange",
  //   "brown",
  // ];

  // 一個球友幾度
  const deg = 360 / s_friends.length;

  const wheel = useRef(null);
  const [s_string, set_s_string] = useState("");
  const [s_last, set_s_last] = useState("");
  const [s_lastDeg, set_s_lastDeg] = useState(0);

  const [s_friends, set_s_friends] = useState([]);

  // const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]

  // function getCharacter(index) {
  // 	return hexCharacters[index]
  // }

  // function generateJustOneColor(){

  // 	let hexColorRep = "#"

  //     for (let position = 0; position < 6; position++){
  //         hexColorRep += getCharacter( position )
  //     }

  // 	return hexColorRep

  // }

  const submit = () => {
    if (s_string === "") {
      Modal.error({
        title: "",

        content: "🚨請複製群組名單後再送出🚨",
        okText: "知道了",
      });
      return;
    }
    console.log("s_string = ", s_string);
    const textArr = s_string.split(" ");
    console.log("textArr = ", textArr);
    return;
    // // 找到指定元素的索引
    // const index = textArr.indexOf("🤜程度:新手歡樂🤛");
    // // 如果元素存在於陣列中，使用 slice 方法創建新陣列
    // const newArr = index !== -1 ? textArr.slice(index) : arr;
    // console.log("newArr = ", newArr);
  };

  const onClick = () => {
    // 中獎球友
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * s_friends.length);
    } while (s_last === s_friends[randomIndex]);
    console.log("randomIndex = ", randomIndex);
    console.log("arr[randomIndex] = ", s_friends[randomIndex]);
    // if (s_last === arr[randomIndex]) {
    //   randomIndex = Math.floor(Math.random() * arr.length);
    // }
    // 隨機轉的度數
    const randomDeg = randomIndex > 0 ? randomIndex * 360 : 360;

    // 轉向中獎球友的度數
    const aaa =
      s_friends.findIndex((item) => item === s_friends[randomIndex]) + 1;
    let targetDeg = 0;
    targetDeg = (s_friends.length - aaa) * deg + deg / 2;

    // if (randomIndex + 1 === arr.length) {
    //   targetDeg = 360 + deg / 2;
    // } else {

    // }
    // const targetDeg = randomIndex * deg - deg / 2;
    // const targetDeg =
    //   randomIndex === arr.length - 1 ? 0 : randomIndex * deg + deg;
    const _lasgDeg = randomDeg + targetDeg + s_lastDeg;
    wheel.current.style.transform = `rotate(${_lasgDeg}deg)`;
    const resetDeg = randomIndex * deg;
    set_s_lastDeg(_lasgDeg + deg / 2 + +resetDeg);
    set_s_last(s_friends[randomIndex]);
    // set_s_target(arr[randomIndex]);
  };

  const gen = () => {
    const persent = 100 / s_friends.length;
    const str = s_friends.map((item, index) => {
      return `${item} ${persent * index}% ${(index + 1) * persent}%`;
    });

    return `conic-gradient(${str.join(",")})`;
  };

  return (
    <section className="page flex flex-col mx-auto items-center h-screen w-full max-w-[450px]">
      <h1 className="text-3xl font-bold">🎉名人堂 - 抽球球🎉</h1>
      <section
        className={`
        container1 
        relative 
        w-[90vw] max-w-[400px]
        h-[90vw] max-h-[400px]
        flex justify-center items-center
        mt-7
        `}
      >
        <div
          className="spinBtn font-bold"
          onClick={onClick}
          style={{
            "--rotate": `-${deg / 2}deg`,
          }}
        >
          START
        </div>

        <div
          className="wheel"
          ref={wheel}
          style={{
            // transform: `rotate(${deg / 2}deg)`,
            background: gen(),
          }}
        ></div>
      </section>

      <section className="flex gap-2 mt-7 w-[90%]">
        <Input onChange={(e) => set_s_string(e.target.value)} />
        <Button type="primary" onClick={submit}>
          送出球友!
        </Button>
      </section>
    </section>
  );
};

export default Dashboard;
