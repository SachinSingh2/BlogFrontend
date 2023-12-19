import React from 'react'
import '../../css/CategoryCard.css'

export default function CategoriesCard() {
  return (
    <>
<div style={{width:"15rem"}} className="card CategoryCard bg-dark text-white">
  <img width={"10%"} src="https://mdbcdn.b-cdn.net/img/new/slides/017.webp" className="card-img" alt="Stony Beach"/>
  <div style={{display:"flex" , textAlign:"center" , justifyContent:"center"}} className="card-img-overlay">
    <p style={{fontSize:"30px"}} >Music</p>
  </div>
</div>

    </>
  )
}
