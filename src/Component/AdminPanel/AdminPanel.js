import React, { useState } from 'react'
import InfoPanel from './InfoPanel'
import '../../css/Categories.css'

export default function AdminPanel() {

  const [info , setInfo] = useState()

  const data = [ 
    {id:1 , type:"Users"},
    {id:2 , type:"Blogs"},
    {id:3 , type:"Messages"},
 ]

 const handleOnSetInfo = (type)=>{
  setInfo(type)
  console.log(type)
 }

  return (
    <>
    <div className="container  p-2">
      <div className="row">

        <div className="col-md-3 border CategoryBox  py-2 my-5">
        <table className="table table-hover">
        <tbody>
            {data.map((data , index)=>{
                return <tr  key={index} >
                <th  scope='row' >
                    <button onClick={()=>{handleOnSetInfo(data.type)}} className='btn btn-dark w-100'>{data.type}</button>
                </th>
            </tr>
            })}
        </tbody>
      </table>
        </div>



        {/* -------------------------------Info------------------------------- */}
        <div className="col-md-9 border  p-2 my-5">
          <InfoPanel info={info} />
        </div>



      </div>
    </div>
    </>
  )
}
