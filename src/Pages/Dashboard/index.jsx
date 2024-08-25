import "./index.css";

import { Button, InputNumber, Modal } from "antd";
import React, { useRef, useState } from "react";

const Dashboard = () => {
  const wheel = useRef(null);
  const [s_number, set_s_number] = useState("");
  const [s_last, set_s_last] = useState("");
  const [s_lastDeg, set_s_lastDeg] = useState(0);

  const [s_friends, set_s_friends] = useState([]);

  // 一個球友幾度
  const deg = 360 / s_friends?.length || 0;

  const hexCharacters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  function getCharacter(index) {
    return hexCharacters[index];
  }

  function generateNewColor() {
    let hexColorRep = "#";

    for (let index = 0; index < 6; index++) {
      const randomPosition = Math.floor(Math.random() * hexCharacters.length);
      hexColorRep += getCharacter(randomPosition);
    }

    return hexColorRep;
  }

  const submit = () => {
    if (!s_number) {
      Modal.error({
        title: "",

        content: (
          <div className="flex flex-col text-gray-400">
            <span className="text-black">🚨請輸入尚未離開的球友數量🚨</span>
            {/* <span className="mt-1">EX: </span>
            <span>1. Ariean 🚗 BPR-3892</span>
            <span>2. Ariean1 車 BBB-0001</span>
            <span>3. Ariean2</span>
            <span>4. Briean</span>
            <span>5. Criean</span>
            <span>...</span>
            <span></span> */}
          </div>
        ),
        okText: "知道了",
      });
    }

    const _friends = new Array(Number(s_number)).fill(0).map((item, index) => ({
      name: `編號: ${index + 1}`,
      color: generateNewColor(),
    }));

    set_s_friends(_friends);
    return;
  };

  const onClick = () => {
    // 中獎球友
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * s_friends.length);
    } while (s_last === s_friends[randomIndex]);

    // 隨機轉的度數
    const randomDeg = randomIndex > 0 ? randomIndex * 360 : 360;

    // 轉向中獎球友的度數
    const _target =
      s_friends.findIndex((item) => item === s_friends[randomIndex]) + 1;
    let targetDeg = 0;
    targetDeg = (s_friends.length - _target) * deg + deg / 2;

    const _lasgDeg = randomDeg + targetDeg + s_lastDeg;
    wheel.current.style.transform = `rotate(${_lasgDeg}deg)`;
    const resetDeg = randomIndex * deg;
    set_s_lastDeg(_lasgDeg + deg / 2 + +resetDeg);
    set_s_last(s_friends[randomIndex]);

    // alert(s_friends[randomIndex].name);
    setTimeout(() => {
      Modal.info({
        title: <span>中獎人員</span>,

        content: (
          <div className="flex flex-col text-gray-400">
            <span className="text-black text-[15px] flex items-center">
              🚨{" "}
              <div
                className="w-[15px] h-[15px] rounded-md inline-block ml-3 mr-1"
                style={{ backgroundColor: s_friends[randomIndex].color }}
              ></div>
              <span className="mr-3">{s_friends[randomIndex].name}</span>🚨
            </span>
          </div>
        ),
        okText: "給他羽毛球",
      });
    }, 2500);
  };

  const gen = () => {
    if (s_friends.length === 0) return "";
    const persent = 100 / s_friends.length;
    const str = s_friends.map((item, index) => {
      return `${item.color} ${persent * index}% ${(index + 1) * persent}%`;
    });

    return `conic-gradient(${str.join(",")})`;
  };

  return (
    <section className="page flex flex-col mx-auto items-center h-screen w-full max-w-[450px]">
      <h1 className="text-3xl font-bold">🎉名人堂 - 抽球球🎉</h1>

      {s_friends.length > 0 && (
        <section
          className={`
        container1 
        relative 
        w-[85vw] max-w-[400px]
        h-[85vw] max-h-[400px]
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
      )}

      <section className="flex gap-2 mt-7 w-[90%]">
        <InputNumber
          className="w-full"
          placeholder="請輸入今日的球友數量"
          onChange={(value) => set_s_number(value)}
        />
        <Button type="primary" onClick={submit}>
          送出球友!
        </Button>
      </section>

      {s_friends.length > 0 && (
        <div className="grid grid-cols-4 gap-2 w-full mt-4 ml-3">
          {s_friends.map((item, index) => (
            <div key={index} className="flex gap-[3px]">
              <div
                className="w-[15px] h-[15px] rounded-md"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-[14px]">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
