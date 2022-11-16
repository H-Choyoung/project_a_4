import React from 'react'
import '../css/Article.css'

let TestArr = ["제주","강릉","부산","여수","가평","담양","전주"]

const Article = (props:any) : any => {
  let articlebox = props.data.map((data:string[],index:number)=>(
    <div className='articlebox' key={index}>{data}</div>
  ))
  return articlebox
}

export default Article