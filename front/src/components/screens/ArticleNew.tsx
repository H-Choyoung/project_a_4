import React from 'react'
import '../css/Article.css'
import { Item } from 'App'
import { RootObject } from 'App'

const ArticleNew = ({data} : {data:RootObject}) : any => {
  console.log(data.items)
  let articlebox = data.items

  let article = articlebox.map((el,index)=> {
    console.log(el.title)
    return (
      <div>
        <a 
        target="_blank"
        href={`${el.link}`} 
        className='p' 
        dangerouslySetInnerHTML={{__html:el.title}} 
        key={index}></a>
      </div>
    )
  })
  return article  
}

export default ArticleNew