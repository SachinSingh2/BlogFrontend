import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Blogs() {


  const [Blogs , setBlogs] = useState()
  const [counter , setCounter] = useState(1)
  

  const data = [
    {id:1 , type:'All'},
      {id:2 , type:'Music'},
      {id:3 , type:'Movies'},
      {id:4 , type:'Sports'},
      {id:5 , type:'Tech'},
      {id:6 , type:'Fashion'},
      {id:7 , type:'Food'},
      {id:8 , type:'Entertainment'},
      {id:9 , type:'Games'}, 
  ]



  // Fetching all Blogs auto
  useEffect(()=>{
    try {
      const getAllBlogs = async()=>{
        const data = await fetch('http://127.0.0.1:8000/Blog/GetAllBlogsAdmin' , {
          method:"GET"
        })

        const res = await data.json()

        if(res.status==="Success"){
          setBlogs(res.data)
        }

      }
      getAllBlogs()
    } catch (error) {
      console.log(error.message)
    }
  },[counter])

  // Filterning the Blogs old and new 
  const handleOnFilterBlogs = async(By)=>{
    try {
      // console.log(By)
      const data = await fetch(`http://127.0.0.1:8000/Blog/FilterBlogs/${By}` , {
        method:"GET"
      })
  
      const res = await data.json()
      // console.log(res.data)

      if(res.status==="Success"){
        setBlogs(res.data)
      }
      

    } catch (error) {
      console.log(error.message)
    }    
  }


  // -----------Deleting the Blog--------------
  const handleOnDeleteBlogs = async (id)=>{
    
    console.log(id)
    const data = await fetch(`http://127.0.0.1:8000/Blog/DeleteBlogs/${id}` , {
      method:"DELETE"
    })
    
    const res = await data.json()
    if(res.status==="Success"){
      setCounter(counter+1)
    }
  }



  // -----------------------Blog with categories---------------
  const handleOnBlogType = async (type)=>{
    console.log(type)
    const data = await fetch(`http://127.0.0.1:8000/Blog/GetBlogWithCategory/${type}` , {
      method:"GET"
    })

    const res = await data.json()

    if(res.status==="Success"){
      setBlogs(res.data)
    }
  }


  // -------------------------------------------Searcg Blogs with name
  const handleOnSearchByName = async(e)=>{
    try {
      const By = e.target.value
      if(By.length>0){
        const data = await fetch(`http://127.0.0.1:8000/Blog/GetBlogWithSearch/${By}`, {
          method:"GET"
        })      
  
        const res = await data.json()
        if(res.status==="Success"){
          setBlogs(res.data)
        }
      }


    } catch (error) {
      console.log(error.message)
    }
  }


  // -----------------------Edit Blogs--------------------------------
  const handleOnEditBlog = async(id)=>{
    console.log(id)
    // const data = await fetch(`http://127.0.0.1:8000/Blog/AdminEditBlog/${id}` , )/
  }

  return (
    <>

      <div className="container">
        <div style={{textAlign:"center"}} >
      <h1>Get Blogs with Given Categories</h1>
        </div>
        <div className="row my-2">
          {data.map((data)=>{
            return <div className='col-md-2' key={data.id}>
              <p onClick={()=>{handleOnBlogType(data.type)}} style={{backgroundColor:"whitesmoke" , borderRadius:"2px" , textAlign:"center" , fontWeight:"600" , cursor:"pointer" }}   className='p-2' >{data.type}</p>
               </div>
          })}
        </div>
      </div>



    {/* Search and filter option for the blogs */}

    <div className="SearchAndFilterBox my-3  p-1">
      <div className="row">


        <div className="container">
          <hr />
        </div>

        
      <div style={{textAlign:"center"}} className='col-md-4 dropdown'>
        <button className='btn btn-secondary dropdown-toggle my-1' type='button' data-bs-toggle="dropdown" aria-expanded="false" >Blogs Available categories</button>
        <ul className="dropdown-menu">
          {Blogs && Blogs.length > 0
             ? Blogs.filter((item, index, self) => self.findIndex(d => d.categories === item.categories) === index)
           .map((uniqueData) => (
              <div key={uniqueData._id}>
                <li  className='p-2 border'>{uniqueData.categories}</li>
              </div>
            ))
         : null}
      </ul>
        </div>

        {/* Search */}

        <div className="col-md-4">
          <input onChange={handleOnSearchByName} type="text" placeholder='Search By username' className='w-100 p-2 my-1'  style={{borderRadius:"2px" , border:"none" , backgroundColor:"whitesmoke" , color:"black" , outline:"lightgray solid 1px"}}/>
        </div>


        <div style={{textAlign:"center"}}  className="col-md-4">
          <div className="dropdown">
            <button className='btn btn-secondary dropdown-toggle my-1' type='button' data-bs-toggle="dropdown" aria-expanded="false" >Filter Blogs By</button>
            <ul className='dropdown-menu'>
              <li className='p-2 border' onClick={()=>{handleOnFilterBlogs("asc")}} style={{cursor:"pointer"}} >Latest</li>
              <li className='p-2 border' onClick={()=>{handleOnFilterBlogs('desc')}} style={{cursor:"pointer"}} >Oldest</li>
            </ul>
          </div>
        </div>

      </div>
    </div>



    {/* Here we will render all the Blogs  */}
    <div className="container  my-2 p-2">
      <div className="row">

        {/* We will map here */}
        {Blogs && Blogs.length > 0 ? Blogs.map((data,index)=>{
          return <div key={data._id} data-aos="slide-up" className='col-md-4'  > 

<div className="card my-2 my-5" style={{borderBottomLeftRadius:"0px"  , borderBottomRightRadius:"0px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <span style={{ color: "white", padding: "8px 15px", borderRadius: "15px 0 0 0", backgroundColor: "#2e2e2e" }} className="position-absolute top-0 start-50 translate-middle">
        <span>{data.categories}</span>
      </span>



      <img style={{ borderRadius: "0px", objectFit: "cover", height: "200px" }} className="card-img-top" src={`http://127.0.0.1:8000/${data.picture.replace(/\\/g, '/')}`} alt={`${data.title}  Blog Image`} />
      <div className="card-body">
        <h5 style={{textAlign:"center"}} className="card-title">{data.title}</h5>


       <Link to={`/postDetail/${data._id}`}> <button className="btn btn-dark w-100">Read More</button> </Link>

        <div className="mt-3 d-flex justify-content-between">
          <p className="card-text"><small className="text-muted">By: {data.username}</small></p>
          <p className="card-text"><small className="text-muted">{data.createdAt}</small></p>
        </div>
      </div>


      <div  className='p-2 d-flex justify-content-between' >
       <Link to={`/update/${data._id}`} > <button  className='btn btn-dark' >Edit</button> </Link>
         <button onClick={()=>{handleOnDeleteBlogs(data._id)}} className='btn btn-dark' >Delete</button>
      </div>

    </div>   




          </div>
        }) :<h1 className='my-4' style={{textAlign:"center"}} >No Blogs</h1>}

      </div>
    </div>
    </>
  )
}

