import React, { useState, useEffect } from "react";
// import axios from "axios";

interface st{
  name: string;
  c_prc: string;
  chg_rt: string;
  close: string;
}


// const TableMaker =({name, c_prc, chg_rt, close})=> {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key = {column}>{column}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(({''}))}
//       </tbody>
//     </table>
//   )
// }