import React, { useEffect, useState } from 'react'

export default function ContectMessage() {
  const [data , setData ] = useState()
  const [counter , setCounter] = useState(1)
  const [loading , setLoading] = useState(false)




  // Fetching all the messages 
  useEffect(()=>{
    try {
      
    const getAllMessage = async()=>{
      setLoading(true)
      const data = await fetch('https://blogserver-soqh.onrender.com/Blog/GetAllMessages' , {
        method:"GET"
      })

      const res = await data.json()
      setLoading(false)
      // console.log(res)
      if(res.status==="Success"){
        setData(res.data)
      }
    }
    getAllMessage()
    } catch (error) {
      setLoading(false)
    }
  },[counter])


  // HandleOnDelete
  const handleOnDelete = async (id)=>{
    try {
      setLoading(true)
      const data = await fetch(`https://blogserver-soqh.onrender.com/Blog/DeleteMessage/${id}` , {
        method:"DELETE"
      })
  
      const res = await data.json()
      setLoading(false)
      if(res.status==="Success"){
        setCounter((prevCounter) => prevCounter + 1);
      }
    } catch (error) {
      setLoading(false)
    }
  }
  
  return (
    <>

      <div className="container">

        
        <div className="row">

          {loading ? <div style={{textAlign:"center" , fontSize:"60px" , marginTop:"50px"}}><i className="fa-solid fa-2xl fa-spinner fa-spin " style={{color: "#111212"}}></i></div> :  data && data.length > 0 ? data.map((data)=>{
          return <div className='col-md-4 border my-1 p-2' key={data._id} >
            <ul style={{listStyle:"none"}} >
              <li style={{ wordWrap: "break-word" }} > <b> Name  </b>: {data.name}</li>
              <li style={{ wordWrap: "break-word" }} > <b> Email </b>: {data.email}</li>
              <li style={{ wordWrap: "break-word" }} > <b> Contact </b> : {data.contact}</li>
              <li style={{ wordWrap: "break-word" }} > <b> Message </b> : {data.message}</li>
              <button onClick={()=>{handleOnDelete(data._id)}} className='btn btn-dark my-2'  >Delete</button>
            </ul>
          </div>
        }):<h1>No Messages</h1>}



        </div>
      </div>


    </>
  )
}
