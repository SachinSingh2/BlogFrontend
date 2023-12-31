import React, { useState } from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import Post from '../Blogs/Post'
import '../../css/Categories.css'
export default function Categories() {

  const [showAlert , setShowAlert] = useState(false)

    const data = [
        {id:1 , type:'Music'},
        {id:2 , type:'Movies'},
        {id:3 , type:'Sports'},
        {id:4 , type:'Tech'},
        {id:5 , type:'Fashion'},
        {id:6 , type:'Food'},
        {id:7 , type:'Entertainment'},
        {id:8 , type:'Games'}, 
    ]

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') 



    const handleShowAlert = ()=>{
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1000);
    }



  return (
    <>
     <div style={{textAlign:"start"}} className="btnDiv container ">
      <Link to={`/create?category=${category || ''}`} >
    <button style={{ fontSize:"20px" , fontWeight:"600" , letterSpacing:"3px",backgroundColor:"#2e2e2e" ,  width:"100%",borderRadius:"3px" , color:"white" , padding:"15px 0px"}} className='my-3 btn '>
  CREATE BLOG
</button>
</Link>
    </div>




{/* Table Component */}

<div className="container-fluid">

<div className="row">

{/* Box-1 */}
<div className="CategoryBox col-md-3 ">
<div>
      <table className="table table-hover">
      <thead>
  <tr>
    <th scope="col">
    <div>
  <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
    <span style={{ fontSize: '30px' }}>All Categories</span>
  </Link>
</div>

{showAlert ? <div style={{borderRadius:"none"}} className="alert alert-success" role="alert">
  Done 
</div> : null}


    </th>
  </tr>
</thead>

  <tbody>

  {data.map((data) => (
    <tr key={data.id}>
        <th data-aos="slide-down" scope="row">
          
           <Link onClick={()=>{handleShowAlert()}}  hrefLang='blogs' to={`/?category=${data.type}`}  style={{ textDecoration: "none", color: "black", display: "block" }}>
                {data.type}
            </Link> 
        </th>
        
    </tr>
    
))}


  </tbody>
</table>
      </div>
</div>


{/* Box-1 */}


{/* --------------------------------Box-2 */}
<div id='blogs' className="col-md-9">
<Post  />
</div>


</div>


</div>

      
    </>
  )
}
