import React, { useContext, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoContext } from '../../Context/InfoProvider';
import axios from 'axios';

export default function CreatePost() {

  const [about , setabout] = useState()

  const initialState = {
    title: '',
    description: '',
    picture: 'https://images.unsplash.com/photo-1523634921619-37ce98c1877f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Change from string to object
    username: '',
    categories: '',
    createdDate: '',
    pictureName:'',
    Time: new Date().toLocaleTimeString(),
    email:'',
    about:""
  };

  const [postData, setPostData] = useState(initialState);
  const { Account } = useContext(InfoContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading , setloading] = useState(false)
  const [showErr , setShowErr] = useState(false)


  // ---------------Handle For change
  const handleOnChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleOnSavePost = async (e) => {
    e.preventDefault();
    // Update postData fields
    postData.username = Account.name;
    postData.email = Account.email

    postData.createdDate = new Date().toLocaleDateString();
    postData.categories = location.search?.split("=")[1] || "All";
  
    const token = sessionStorage.getItem('accessToken');
  
    // Create FormData and append both file and JSON data
    const formData = new FormData();
  
    // Check if file is selected before appending

    formData.append('file', file);
    formData.append('postData', JSON.stringify(postData));
  
    setloading(true)
    try {
      // Make a single request for both file and JSON data
      const response = await axios.post('https://blogserver-soqh.onrender.com/Blog/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
  
      const res = response.data;
      // console.log(res);
      setloading(false)
      // console.log(res);
  
      if (response.msg === 'jwt expired') {
        alert('Please log in again, session expired');
        navigate('/login');
      }
  
      if (res.status === 'Success') {
        // console.log('Done');
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
      setloading(false)
      // Display error message
      setShowErr(true);
  
      // Hide error message after 2 seconds
      setTimeout(() => {
        setShowErr(false);
      }, 4000);
    }
  };
  




  // Function to handle image upload
  const handleOnAddImage = (e) => {
    if (e.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPostData({ ...postData, picture: imageUrl });
      setFile(e.target.files[0]);
    }
  };
  



  // Fetching the about data
    // Fetching the About the info of the user 
    useEffect(()=>{
      const getAbout = async()=>{
  
        const token = sessionStorage.getItem("accessToken");
        const data = await fetch(`https://blogserver-soqh.onrender.com/Blog/GetAbout/${Account.email}` , {
          method:"GET",
          headers:{
            Authorization: token,
          }
        })
  
        const res = await data.json()
        if(res.status === "Success"){
          setabout(res.data)
        }
  
      }
      getAbout()
    },[])





  return (
    <>




{file ?  <div className="CreatePost container text-center bg-image-CreatePost">
        <img className='my-4' src={postData.picture}  alt={postData.picture} />
      </div>  : null}

      <div className="container">

      {showErr ?<div style={{borderRadius:"0px"}} className="alert alert-danger my-3" role="alert">
 Please Fill all the Fields and  Add Image For the Blog Without adding a image you can not Create an Blog . Happy Blogging
</div> :null}

        <div className="row  my-2 p-2">
          <div className="col-md-1">
            <div className="my-1 p-1">
              <label style={{ cursor: 'pointer' }} htmlFor="fileinput">
                <i className="fa-solid mx-2 fa-upload fa-2x" style={{ color: 'gray' }}></i>
                <input
                  className="border border-primary"
                  id="fileinput"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleOnAddImage}
                />
              </label>
            </div>
          </div>
          <div className="col-md-10">
            <div>
              <input
                onChange={handleOnChange}
                style={{ borderRadius: '0px', width: '100%' }}
                name="title"
                placeholder="Title..."
                type="text"
                id="typeText"
                className="form-control"
              />
            </div>
          </div>
          <div className="my-2">
            <textarea
              onChange={handleOnChange}
              placeholder="Your Story here..."
              name="description"
              style={{ borderRadius: '0px', width: '100%' }}
              className="form-control bord"
              id="textAreaExample"
              rows="5"
            ></textarea>
          </div>
          <div className="col-md-1 my-1 px-2">
          {loading ? <div style={{textAlign:"center"}}><i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i></div> : <button   onClick={handleOnSavePost} type="submit" className="btn btn-primary ">Create</button> }
          </div>
        </div>
      </div>
    </>
  );
}
