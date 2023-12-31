import React, { useState } from 'react'
import InfoPanel from './InfoPanel'
import '../../css/Admin.css'

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

        <div className="col-md-3 border AdminCategoryBox  py-2 ">
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
        <div className="col-md-9 border  p-2 ">
          <InfoPanel info={info} />
        </div>



      </div>
    </div>
    </>
  )
}
