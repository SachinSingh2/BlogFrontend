import React, { useEffect, useState } from 'react'

export default function ContectMessage() {
  const [data , setData ] = useState()
  const [counter , setCounter] = useState()




  // Fetching all the messages 
  useEffect(()=>{
    const getAllMessage = async()=>{
      const data = await fetch('http://127.0.0.1:8000/Blog/GetAllMessages' , {
        method:"GET"
      })

      const res = await data.json()
      if(res.status==="Success"){
        setData(res.data)
      }
    }
    getAllMessage()
  },[counter])


  // HandleOnDelete
  const handleOnDelete = async (id)=>{
    const data = await fetch(`http://127.0.0.1:8000/Blog/DeleteMessage/${id}` , {
      method:"DELETE"
    })

    const res = await data.json()
    if(res.status==="Success"){
      setCounter(counter+1)
    }
  }
  
  return (
    <>

      <div className="container">
        <div className="row">

        {data && data.length > 0 ? data.map((data)=>{
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
