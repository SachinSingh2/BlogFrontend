import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function LatestBlogs() {
const [blog , setblog] = useState()
const [loading , setloading] = useState(false)

useEffect(()=>{
  const getLatestBlog =async ()=>{
    try {
      const token = sessionStorage.getItem("accessToken");
      setloading(true)
      const res = await fetch(`https://blogserver-soqh.onrender.com/Blog/Filter/asc`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
  
      const data = await res.json();
      // console.log(data);
      setloading(false)
  
      if (data.status === "Success") {
        setblog(data.data);
      }
    } catch (error) {
      console.error(error);
      setloading(false)
    }
  }
  getLatestBlog()
},[])



// Rendering the blogs
const render = blog && blog.map((data) => (
  <div data-aos="fade-up" className="col-md-4" key={data.id} >
      
     <Link to={`postDetail/${data._id}`} >
       <div className="card my-2 my-5" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <span style={{ color: "white", padding: "8px 15px", borderRadius: "15px 0 0 0", backgroundColor: "#2e2e2e" }} className="position-absolute top-0 start-50 translate-middle">
          <span>{data.categories}</span>
        </span>
        <img style={{ borderRadius: "0px", objectFit: "cover", height: "200px" }} className="card-img-top" src={`https://blogserver-soqh.onrender.com/${data.picture.replace(/\\/g, '/')}`} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">
            {data.description.toString().split(' ').length > 15
              ? data.description.toString().split(' ').slice(0, 15).join(' ') + '...'
              : data.description}
          </p>
          <button className="btn btn-dark">Read More</button>
          <div className="mt-3">
            <p className="card-text"><small className="text-muted">By: {data.username}</small></p>
            <p className="card-text"><small className="text-muted">Created: {data.createdAt}</small></p>
          </div>
        </div>
      </div></Link>

  </div>


  
));
  return (
    <>
     <div className="container">
      {loading ? <div style={{textAlign:"Center"}} > <i className="fa-solid fa-spinner fa-6x fa-spin my-4" style={{color: "#050506"}}></i> </div> :      <div className="row">
        {render} 
      </div> }

      </div> 
    </>
  )
}
