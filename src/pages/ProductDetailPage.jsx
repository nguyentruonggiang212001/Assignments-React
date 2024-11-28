import React, { useEffect, useState } from 'react'
import {data, useParams} from 'react-router-dom'


const ProductDetailPage = () => {
    const {id} = useParams();
    useEffect(()=>{
      //  fetch(`https://dummyjson.com/products/${id}`)
      //  .then((res)=>res.json())
      //  .then((data)=>{
      //   console.log("Chi tiest san pham ",data);
      //   Setdata(data)
      //  })
       

      //Cach 1
      (async ()=>{
          try{
          const res = await fetch(`https://dummyjson.com/products/${id}`)
          const data = await res.json();
          setData(data)
          console.log(data);
          } catch{
           console.log("Co loi",error);
          }
      })();
      

        // fetchAPI();
    },[])

    const [data,setData] = useState([])
  return (
    <div className='Shop'>
        <img src={data.thumbnail} alt={data.title} /> 
         <div >
          <p>Tên Sản Phẩm:{data.title}</p>
          <span>Giá:{data.price}$</span>
          <p>Mô tả sản phẩm:{data.description}</p>
         </div>
    </div>

  );
  
  
}

export default ProductDetailPage