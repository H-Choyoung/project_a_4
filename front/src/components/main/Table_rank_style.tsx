import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface bgProps {
    idx: number;
    name: string;
    close: number;
    riseNfall: number;
    riseNfallPer: string;
    market: string;
    code: string;
}
interface strProps {
    strData: string;
}
interface numProps {
    numData: number;
}

const RankStyleFont = ({ strData }: strProps) => {
    const [fontCol, setFontCol] = useState("#000000");
    useEffect(() => {
        if (typeof strData === "string" && strData.includes("-")) {
            setFontCol("#0057FF");
        } else if (strData === "0.0000") {
            setFontCol("#000000");
        } else {
            setFontCol("#FF0000");
        }
    });
    return (
        <span className="riseAndFall" style={{ color: fontCol }}>
            {strData}%
        </span>
    );
};

const RankStyleFontNum = ({ numData }: numProps) => {
    const [fontCol, setFontCol] = useState("#000000");
    useEffect(() => {
        if (typeof numData === "number" && Math.sign(numData) === -1) {
            // 값이 음수일 때
            setFontCol("#0057FF");
        } else if (typeof numData === "number" && Math.sign(numData) === 1) {
            // 값이 양수일 때
            setFontCol("#FF0000");
        } else {
            setFontCol("#000000");
        }
    });
    return (
        <span className="riseAndFall" style={{ color: fontCol }}>
            {numData}원
        </span>
    );
};
const RankStyle = ({
    idx,
    name,
    close,
    riseNfall,
    riseNfallPer,
    market,
    code,
}: bgProps) => {
    const [bgCol, setBgcol] = useState("#ffffff");
    const navigate = useNavigate();

    useEffect(() => {
        if (idx === 1) {
            setBgcol("#D7FF38");
        } else if (idx === 2) {
            setBgcol("#E7FF85");
        } else if (idx === 3) {
            setBgcol("#EFFFAD");
        }
    });

    console.log("ab");
    return (
        <div
            className="rows"
            style={{ backgroundColor: bgCol, cursor: "pointer" }}
            onClick={() => {
                console.log(market);
                navigate(
                    `/detail?market=${market.toLowerCase()}&code=${code}&company=${name}&day=month`
                );
            }}
        >
            <span className="leftStr">
                <span>{idx}</span>
                <span>{name}</span>
            </span>
            <span className="rightStr">
                <RankStyleFontNum numData={riseNfall} />
                <RankStyleFont strData={riseNfallPer} />
                <span>{close}원</span>
            </span>
        </div>
    );
};

export { RankStyle, RankStyleFont, RankStyleFontNum };
