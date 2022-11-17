import React from 'react'
import '../css/Article.css'
import { Item } from 'App'
import { RootObject } from 'App'

// let TestArr = ["제주","강릉","부산","여수","가평","담양","전주"]

const Article = ({data} : {data:RootObject}) : any => {
  let articlebox =data.items
  console.log(articlebox)
  console.log(typeof articlebox) 
  articlebox.map((data,index)=> {
    console.log(data)
    return (
      <div className='articlebox' key={index}></div>
    )
  })
  // let arr = []
  // for(let i =0; i<articlebox.length; i++){
  //   arr.push(articlebox[i])
  // }

  // console.log(arr)
  // let articlebox = data((data:string,index:number)=>(
  //   <div className='articlebox' key={index}>{data}</div>
  // ))
  // return articlebox
}

export default Article