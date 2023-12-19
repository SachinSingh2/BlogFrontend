import React, { useEffect, useState , useContext } from "react";
import { useParams } from "react-router-dom";
import "../css/PostDetail.css";
import WriteComment from '../Component/Blogs/WriteComment'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../Context/InfoProvider";

export default function PostDetail() {

  // This component is the detail page of the blogs where we can see the detailed information of a blog.


  const navigate = useNavigate()
  const { id } = useParams();
  const [post, setPost] = useState(null); // Initialize post as null
  const [loading, setLoading] = useState(true); // Introduce loading state
  const {Account} = useContext(InfoContext)



  // Function as to fetch all the detail as soon as we enter the page so we dont have to click on any button .s
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const getInfoWithId = async () => {
      try {
        const data = await fetch(`https://blognewbackend.onrender.com/Blog/postDetail/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const res = await data.json();
        setPost(res.info);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching post data:", error.message);
      }
    };

    getInfoWithId();
  }, [id]);

  if (loading) {
    // Render loading state or placeholder UI
    return <div style={{textAlign:"center"}}><i  className="fa-solid my-5 fa-6x  fa-spinner fa-spin" style={{color: "#111212"}}></i></div>; // You can customize this based on your design
  }

  if (!post) {
    // Render a message or redirect if post is not found
    return <p>Post not found!</p>;
  }



  // HandleOnDelete
  const HandleOnDelete = async ()=>{
    setLoading(true)
    const token = sessionStorage.getItem("accessToken")
    const data = await fetch(`https://blognewbackend.onrender.com/Blog/DeletePost/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      }
    })
    setLoading(false)

    const res = await data.json()
    if(res.status==="Success"){
      navigate('/')
    }
  }

  return (
    <>
        
      <div className="container my-4">
        <h1
          className="my-5"
          style={{
            color: "black",
            fontWeight: "900",
            textAlign: "center",
            fontSize: "45px",
            fontFamily: "Libre Baskerville",
          }}
        >
          This Is A Standard Format Post.
        </h1>
        {post ? ( // Only render when post data is available
          <img
            style={{ height: "300px", objectFit: "cover" }}
            className="card-img-top PostDetailContainerImage"
            src={`https://blognewbackend.onrender.com/${post.picture.replace(/\\/g, '/')}`}
            alt="PostImages"
          />
        ) : null}
      </div>

      {/* Description */}
      <div className="container my-4">
  {post ? (
    <div className="container">
      <h1 style={{ fontFamily: "Libre Baskerville", color: "black" }}>
        {post.title}
      </h1>

      <div
        style={{
          color: "gray",
          fontFamily: "Metrophobic",
          textAlign: "start",
        }}
        className="p-4"
      >
        {/* Render description text with line breaks */}
        {post.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  ) : null}
</div>

      {/* Image 2 */}
      <div className="container">
        {post ? ( // Only render when post data is available
          <img
            style={{ height: "300px", objectFit: "cover" }}
            className="card-img-top PostDetailContainerImage"
            src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        ) : null}
      </div>

      {/* Delete edit button */}
      <div className="p-2 container ">
        {post ? ( // Only render when post data is available
          <>
            {/* Edit delete */}
            <div className="my-5 container" style={{ display: "flex", justifyContent: "end" }}>

            {post.username === Account.name ? <i
              onClick={()=>{HandleOnDelete()}}
                className="fa-solid fa-trash fa-2xl my-2 mx-4"
                style={{ color: "#050505" }}
              ></i> : null }

              {post.username === Account.name ? <Link to={`/update/${post._id}`} > <i
                className="fa-solid fa-pencil fa-2xl my-2 mx-2"
                style={{ color: "#050505" }}
              ></i> 
              </Link> : null}
            </div>
          </>
        ) : null}
      </div>

      {/* About the person who wrote the blog  */}
      <div className="container PostDetailContainer ">
        <hr />
        {post ? (
          <div className="container">
            <div className="row">
              <div className="col-md-2 card-img-top ProfileDiv">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  width={"80px"}
                  className=" rounded-circle shadow-4"
                  alt="Avatar"
                />
              </div>

              <div className="col-md-10">
                <h2 className="px-1 py-2 PostDetailUser">{post.username}</h2>
                <p className="px-1 PostDetailUserAbout">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam tempore similique pariatur ullam, quaerat, vero cumque
                  deserunt accusantium obcaecati iure perferendis saepe placeat
                  assumenda veritatis. Ut aliquam illum nesciunt ullam impedit
                  minima vel reprehenderit fugiat .
                </p>

                <div
                  style={{ textAlign: "start" }}
                  className="container   SocialContainer"
                >
                  {/* <!-- Facebook --> */}
                  <i className="fab fa-facebook-f mx-2"></i>

                  {/* <!-- Twitter --> */}
                  <i className="fab fa-twitter mx-2"></i>

                  {/* <!-- Instagram --> */}
                  <i className="fab fa-instagram mx-2"></i>

                  {/* <!-- Linkedin --> */}
                  <i className="fab fa-linkedin-in mx-2"></i>

                  {/* <!-- Github --> */}
                  <i className="fab fa-github mx-2"></i>
                </div>
                <hr />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Category and date  */}
      <div className="p-2 container ">
        {post ? ( // Only render when post data is available
          <>
            <div className="container dateCategoryBox">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  <b> Date : </b> {post.createdAt}
                </p>
                <p>
                  <b> Category: </b> {post.categories}{" "}
                </p>
              </div>

            </div>
          </>
        ) : null}
      </div>

      {/* ------------------------------------------------------- Comment Section ---------------*/}
      <WriteComment  />
    </>
  );
}
