import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InfoContext } from '../Context/InfoProvider'

export default function MyProfile() {
  const [blog , setBlog] = useState()

    const {Account} = useContext(InfoContext)

    useEffect(()=>{
      const getUserInfoBlog = async()=>{

        const token = sessionStorage.getItem("accessToken");

        const data = await fetch(`https://blognewbackend.onrender.com/Blog/GetBlogWithEmail/${Account.email}` , {
          method:"GET",
          headers:{
            Authorization: token,
          }
        })

        const res = await data.json()
        // console.log(res.data)

        if(res.status==="Success"){
          setBlog(res.data)
        }
      }
      getUserInfoBlog()
      
    } ,[])

    // console.log(blog)
    const render = blog && blog.map((data) => (
      <div  className="col-md-6" key={data.id} >
          
         <Link to={`postDetail/${data._id}`} >
           <div className="card my-2 my-5" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <span style={{ color: "white", padding: "8px 15px", borderRadius: "15px 0 0 0", backgroundColor: "#2e2e2e" }} className="position-absolute top-0 start-50 translate-middle">
              <span>{data.categories}</span>
            </span>
            <img style={{ borderRadius: "0px", objectFit: "cover", height: "200px" }} className="card-img-top" src={`https://blognewbackend.onrender.com/${data.picture.replace(/\\/g, '/')}`} alt="Card image cap" />
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
     <section className="h-100 gradient-custom-2">
  <div className="container-fluid py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-9 col-xl-7">
        <div className="card">
          <div className="rounded-top text-white d-flex flex-row"  style={{backgroundColor:"#000" , height:"200px"}}>
            <div className="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                style={{width: "150px" , zIndex: "1"}}/>

            </div>
            <div className="ms-3" style={{marginTop: "130px"}}>
              <h5>{Account.name}</h5>
              <h6>{Account.email}</h6>
            </div>
          </div>
          <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>

          </div>
          <div className="card-body p-4 text-black">

            {/* About Card */}
            <div className="mb-5">
              <p className="lead fw-normal mb-1">About</p>
              <div className="p-4 d-flex" style={{backgroundColor: "#f8f9fa"}}>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><p className="font-italic mx-3 mb-1">Web Developer</p></div>
                        <div className="col-md-4"><p className="font-italic mx-3 mb-1">Lives in New York</p></div>
                        <div className="col-md-4"><p className="font-italic mx-3 mb-1">Photographer</p></div>
                    </div>
                </div>
              </div>
            </div>
            {/* ---------- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0">Recent Blogs</p>
            </div>

            <div className="container  ">
              <div className="row">
                {/* {render} */}
                {render}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</section> 
    </>
  )
}
