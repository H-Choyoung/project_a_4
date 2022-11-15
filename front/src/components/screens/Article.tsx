import React from 'react'
import '../css/Article.css'

let testArr = [1,2,3,4,5,6,7,8,9,10]

const Article = () : any => {
  let articlebox = testArr.map((data,index)=>(
    <div className='articlebox' key={index}>{data}</div>
  ))
  return articlebox
}

export default Article

// export default LocationList = () => {
  
//   const locationArr = ["제주","강릉","부산","여수","가평","담양","전주"]

//   let localList = locationArr.map((data,index)=>(
//     <Pressable style={styles.locationBox} key={index}>
//       <ImageBackground 
//       style={styles.locationThum}
//       source={require('../../../asset/img/busan.jpg')}
//       imageStyle={{borderRadius : 10}}
//       />
//       <Text style={{fontSize : 12, fontWeight : "500"}}>{data}</Text>
//     </Pressable>
//   ))
//   return localList
// }