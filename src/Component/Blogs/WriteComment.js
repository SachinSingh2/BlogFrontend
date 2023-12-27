import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { InfoContext } from "../../Context/InfoProvider";

export default function CommentSection() {

  const [count, setCount] = useState(1);
  const [post, setPost] = useState([]);
  const {id} = useParams()
  const {Account} = useContext(InfoContext)
  const [loading , setloading] = useState(false)

  const getComments = async () => {
    const token = sessionStorage.getItem('accessToken');
    const data = await fetch(`https://myblogserver-sabe.onrender.com/Comments/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `${token}`
      }
    });
    const res = await data.json();
    // console.log(res)

    if (res.status === "Success") {
      setPost(res.comments);
    }
  };

  useEffect(() => {
    getComments();
    console.log("Comments");
    // console.log(post);
  }, [count]);





  


  // ---------------------------------------------------------------Creating comments



  const initialComment = {
    name:Account.name,
    comment: "",
    postId:id
  };

  const [comment, setComment] = useState(initialComment);

  const handleOnCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleOnPostComment = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('accessToken');

    setloading(true)
    const data = await fetch('https://myblogserver-sabe.onrender.com/Blog/Post/Comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json",
        "Authorization": `${token}`
      }
    });
    setloading(false)
    const res = await data.json();
    console.log(res);

    if (res.status === "Success") {
      console.log("Comment success");
      setComment(initialComment);
      setCount(count + 1); // Trigger re-fetch of comments
    }
  };

// ----------------------------------------------Delete Comment
const handleOnCommentDelete = async (ID) => {
  const token = sessionStorage.getItem("accessToken");
  setloading(true)
  try {
    const data = await fetch(`https://myblogserver-sabe.onrender.com/Blog/DeleteComment/${ID}`, {
      method: "DELETE", // Corrected method to "DELETE"
      headers: {
        Authorization: token,
      },
    });

    const res = await data.json();
    setloading(false)

    // Handle success or navigate if needed
    if (res.status === "Success") {
      setCount(count + 1)
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
  





// Rendering the posts 
const render = post.map((data, index) => {
  return (
    <div key={index}>
      <div>
        {post && post.length > 0 ? (
          <div className="my-4 ">
            <div className="row ">
              <div className="col-md-2 card-img-top ProfileDiv">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  width={"80px"}
                  className=" rounded-circle shadow-4"
                  alt="Avatar"
                />
              </div>

              <div className="col-md-10">
                <div className="d-flex justify-content-between">
                <h3>{data.username}</h3>

                
                {Account.name === data.username ? (
  loading ? (
    <div style={{ textAlign: "center" }}>
      <i className="fa-solid fa-2xl fa-spinner fa-spin" style={{ color: "#111212" }}></i>
    </div>
  ) : (
    <i onClick={() => { handleOnCommentDelete(data._id) }} className="fa-solid fa-trash fa-xl my-2 mx-4" style={{ color: "#050505" }}></i>
  )
) : null}



                </div>
                <p style={{ fontSize: "12px", fontFamily: "monospace" }}>{data.createdAt}</p>
                <p style={{ fontFamily: "monospace" }} className="px-1 CommentUserComment">
                  {data.comment}
                </p>
              </div>
            </div>
          </div>
        ) : <h2>No Comments</h2>}
      </div>
    </div>
  );
});

  return (
    <>
      <div className="container-fluid border bg-light my-5 p-5">
        <div style={{ fontFamily: "Libre Baskerville" }} className="container">
          <h1>Comments</h1>
          {render}
        </div>

        <div style={{ marginTop: "150px" }} className="bg-light container">
          <div className="container my-5">
            <h2 style={{ fontFamily: "Libre Baskerville" }}>Add Comment</h2>
          </div>

          <div className="my-5">
            <form onSubmit={handleOnPostComment}>
              <div className="form-outline border-dark border-bottom p-2 my-5">
                <label className="form-label">
                  Comment
                </label>
                <textarea
                  onChange={handleOnCommentChange}
                  name="comment"
                  style={{ borderRadius: "0px", width: "100%" }}
                  className="form-control bord"
                  id="textAreaExample"
                  rows="5"
                  value={comment.comment || ''}
                ></textarea>
              </div>

             {loading ? <div style={{textAlign:"center"}}><i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i></div> :<button type="submit" className="btn btn-primary w-100 py-3">Submit</button> } 
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
