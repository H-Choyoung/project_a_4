import React from "react";

//컴포넌트명은 대문자로 써야한다!
function DrawTable(){  
    interface ex {
        header: string[],
        data: any[]
    }
    const a:ex = {
    header :["종목명","증가률","종가(현재가)"],
    data  :[
        {name:"삼성", incre_rate:"5",close:"65,000"},
        {name:"카카오", incre_rate:"15",close:"15,000"},
        {name:"현대", incre_rate:"25",close:"55,000"},
        {name:"lg", incre_rate:"-5",close:"55,000"},
        {name:"동아", incre_rate:"-15",close:"75,000"}
    ]
    };

    return(
        <table>
            <thead>
                <tr>{a.header.map((item)=>{
                    return <th>{item}</th>
                })}</tr>
            </thead>
            <tbody>
               {a.data.map((item)=>{
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.incre_rate}</td>
                        <td>{item.close}</td>
                    </tr>
                )
               })}
            </tbody>
        </table>  


    )
}
export default DrawTable;
    