import React, { useEffect, useState } from 'react';
import PostsCard from './PostsCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Post() {

  // This component is being shown at home page where we can see a all the Blogs.

  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get('category');
  const navigate = useNavigate()
  const [loading , setLoading] = useState(false)


  // This function will fetch all the blogs from the database as soon as the page refreshed means at render.
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    console.log(searchCategory)
    setLoading(true)
    const fetchPosts = async (category) => {
      try {
        let url = 'http://127.0.0.1:8000/Blog/Post';

        if (category) {
          url = `http://127.0.0.1:8000/Blog/Post?category=${category}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        setLoading(false)
        const data = await response.json();



        if (data.status === 'Success') {
          setPosts(data.post);
          // console.log(data)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts(searchCategory); // Fetch posts based on the category in the URL or fetch all posts.

  }, [searchCategory ]);


  // ---------------------------------------------SortBy-------------------------------------

  const handleOnFilter = async (sortBy) => {

    
    try {
      // console.log(sortBy);
      if(searchCategory==null){
        console.log("null hai")

        const token = sessionStorage.getItem("accessToken");
        setLoading(true)
  
        let sortUrl = `http://127.0.0.1:8000/Blog/Filter/${sortBy}`
  
  
        const res = await fetch(sortUrl, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
  
    
        const data = await res.json();
  
        setLoading(false)
    
        if (data.status === "Success") {
          setPosts(data.data);
        }

      }else{

        // --------------------------------if there is category 
        console.log("null ni hai")
        const token = sessionStorage.getItem("accessToken");
        setLoading(true)
  
        let sortUrl = `http://127.0.0.1:8000/Blog/Filter/${sortBy}/${searchCategory}`
  
  
        const res = await fetch(sortUrl, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
  
    
        const data = await res.json();
  
        setLoading(false)
    
        if (data.status === "Success") {
          setPosts(data.data);
        }
      }
      
     
    } catch (error) {
      console.error(error);
    }
  };
  



  return (
    <>

    {/* Filter Box */}








    {loading ? <div style={{textAlign:"center" , fontSize:"50px" , marginTop:"150px"}} > <i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i> </div>  :  posts.length > 0 ? (
        <div className="row ">


          
    <div style={{textAlign:"end"}} className="FilterBox  p-3">

<div className="dropdown">
<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
Filter
</button>
<ul className="dropdown-menu">
<li onClick={()=>{handleOnFilter('asc')}} style={{cursor:"pointer"}} className='p-2 border' >Newest</li>
<li  onClick={()=>{handleOnFilter("desc")}} style={{cursor:"pointer"}} className='p-2 border' >Oldest</li>

</ul>
</div>

</div>

          {posts.map((data, index) => (
            <div className="col-md-4" key={index}>
              <Link to={`postDetail/${data._id}`}>
                <PostsCard data={data} /> 
              </Link>
            </div>
          ))}

{/* {posts.map((data, index) => (
  <Link to={`postDetail/${data._id}`} key={index}>
    <div className="col-md-4">
      <PostsCard data={data} />
    </div>
  </Link>
))} */}

        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", textAlign: "start" }}>
          <h1 className='my-5'>No Current Blogs</h1>
        </div>
      )} 


    </>
  );
}
