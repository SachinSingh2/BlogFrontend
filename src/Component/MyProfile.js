import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InfoContext } from '../Context/InfoProvider'

export default function MyProfile() {

      //handleOnAboutChange
      const initialState = {
        name:'',
        About:"",
        email:''
      }

   const {Account} = useContext(InfoContext)
  const [blog , setBlog] = useState()
  const [showForm , setShowForm] = useState(false)
  const [aboutInfo , setAboutInfo] = useState()
  const [counter , setCounter] = useState(1)
  const [About , setAbout] = useState(initialState)





    const handleOnAboutChange = (e)=>{
      setAbout({...About , [e.target.name]:e.target.value})
    }





    // This function will learn when the submit about function will work.
    const handleOnSubmitAbout = async (e) => {
      e.preventDefault();
      About.name = Account.name
      About.email = Account.email


      try {
        const token = sessionStorage.getItem("accessToken");
        const data = await fetch(`http://127.0.0.1:8000/Blog/UpdateAboutInfo/${Account.email}` , {
          method:"PATCH",
          headers:{
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(About), // Convert the data to JSON format
        })

        const res = await data.json()
        if(res.status==='Success'){
          setShowForm(false)
          setCounter(counter + 1)
          // setAbout(About.About === )
        }
      } catch (error) {
        console.log(error.message)
      }
    
    };
    


    // -----------------------------------------------Function to fetch about info 
    useEffect(()=>{
      const getAboutInfo = async()=>{

        const token = sessionStorage.getItem("accessToken");

        const data = await fetch(`http://127.0.0.1:8000/Blog/GetAbout/${Account.email}` , {
          method:"GET",
          headers:{
            Authorization: token,
          }
        })

        const res = await data.json()

        if(res.status==="Success"){
          setAboutInfo(res.data.about)
          setAbout((prevAbout) => ({
            ...prevAbout,
            About: res.data.about,
          }));
        }
      }
      getAboutInfo()
    },[counter])






    // ------------------------------------------------------To fetch all the information 
    useEffect(()=>{
      // console.log(About)
      const getUserInfoBlog = async()=>{

        const token = sessionStorage.getItem("accessToken");

        const data = await fetch(`https://blognewbackend.onrender.com/Blog/GetBlogWithEmail/${Account.email}` , {
          method:"GET",
          headers:{
            Authorization: token,
          }
        })

        const res = await data.json()

        if(res.status==="Success"){
          setBlog(res.data)
        }
      }
      getUserInfoBlog()
      
    } ,[])

    // console.log(blog)



    // ------------------------------------------------------Mapping ocer the blog -----------------------------------------
    const render = blog && blog.map((data , index) => (
      <div  className="col-md-6" key={index} >
          
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


                  

                  {/* About info  */}
                  {showForm ? null :<div>
                    <p>{aboutInfo ? aboutInfo : "No info"}</p>
                  </div>}



                  {/* Edit About */}
                  {showForm ? 
                  
                  <form method='POST' action='/AboutInfo'  onSubmit={handleOnSubmitAbout}>

                    <div className="aboutInputDiv">
                    <textarea  value={About.About} style={{width:"100%"}} onChange={handleOnAboutChange} className='p-2' name="About"  ></textarea>
                    </div>

                    <div  className="addBtnDiv ">
                  <button onClick={handleOnSubmitAbout} className='btn btn-dark w-100' >Add</button>
                    </div> 

                   {!showForm ? null :  <div style={{textAlign:"end"}} className='my-1' ><button className='btn btn-dark' onClick={()=>{setShowForm(true)}} >Back</button></div>}

                  </form>  : <div> <button className='btn btn-dark' onClick={()=>{setShowForm(true)}} > Edit About</button>    </div>}



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
