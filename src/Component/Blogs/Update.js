import React, { useContext, useState, useEffect } from 'react';
import '../../css/CreatePost.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { InfoContext } from '../../Context/InfoProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
  const InitialState = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: '',
  };

  const [postData, setPostData] = useState(InitialState);
  const location = useLocation();
  const { Account } = useContext(InfoContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [imgType , setImageType] = useState("FirstRefresh")
  const [loading , setloading] = useState(false)



  const handleOnChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };



// ----------------------This function will work as soon as we click the page to see the detail and it works.
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    setloading(true)
    const getInfoWithId = async () => {
      try {
        const response = await fetch(`https://blognewbackend.onrender.com/Blog/postDetail/${id}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const res = await response.json();
        // console.log(res.info)

        setPostData(res.info);
        setloading(false)

      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    getInfoWithId();
  }, [id]);


  // This function will work if we update it. 

  const handleOnUpdatePost = async (e) => {
    e.preventDefault();
  
    postData.username = Account.name;
    postData.createdDate = new Date().toLocaleDateString();
    postData.categories = location.search?.split('=')[1] || 'All';
  
    const token = sessionStorage.getItem('accessToken');
  
    const formData = new FormData();
    
    // Only append the file if a new file is selected

    formData.append('file', file);
    formData.append('postData', JSON.stringify(postData));
  
    setloading(true)
    try {
      const response = await axios.put(
        `https://blognewbackend.onrender.com/Blog/UpdatePost/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Done');
        navigate(`/postDetail/${id}`);
      }
    } catch (error) {
      if (error.message.startsWith('Request failed with status code 500')) {
        alert('Please Update the image too');
      }
      console.error('Error updating post:', error);
    }

    setloading(false)
  };
  


  // This function will work when we upload a new file.
  const handleOnAddImage = (e) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImageType("SecondUpload")
    setPostData({ ...postData, picture: imageUrl });
  };


  return (
    <>
{loading ? <div style={{textAlign:"center"}}><i  className="fa-solid my-5 fa-6x  fa-spinner fa-spin" style={{color: "#111212"}}></i></div> :       <div className="CreatePost container text-center bg-image-CreatePost">
        <img className="my-2" src={imgType.startsWith('FirstRefresh') ? `https://blognewbackend.onrender.com/${postData.picture.replace(/\\/g, '/')}`:postData.picture}  />
      </div>  }



      <form>
        <div className="container">
          <div className="row my-2 p-2">
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
                  value={postData.title || ''}
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
                value={postData.description || ''}
              ></textarea>
            </div>
            <div className="col-md-1 my-1 px-2">
              {loading ? <i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i> : <button onClick={handleOnUpdatePost} className="btn btn-primary my-1">
                Update
              </button> } 
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
