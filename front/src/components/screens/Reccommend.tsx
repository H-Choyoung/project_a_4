import React, { useState, useEffect } from "react";

interface rec {
  data : number;
}

const Reccomm = ({data}:rec) => {
  const [backCol, setBackCol] = useState("#bdbdbd");
  useEffect(() => {
      if (data >= 1 && data <= 5 && Math.sign(data) === 1) {
        // 기준가(등락율)이 양수고 1보다 크고 5보다 작으면 추천
          setBackCol("#ff7676");
      }
  });
  return (
    <div className="recommend" >
      <button style={{backgroundColor: backCol}}>매수 적극 추천</button>
    </div>
  );
};

export default Reccomm;