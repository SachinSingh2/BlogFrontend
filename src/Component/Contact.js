import React, { useState } from 'react';
import '../css/Contact.css';
import { useNavigate } from 'react-router-dom';

export default function Contact() {

  const navigate = useNavigate()

  const initialState = {
    name: '',
    email: '',
    contact: '',
    message: '',
  };

  const [contactInfo, setContactInfo] = useState(initialState);
  const [errMsg , seterrMsg] = useState(null)

  const handleOnChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleOnSubmit =  async(e) => {
    e.preventDefault();
    console.log(contactInfo);

    const token = sessionStorage.getItem('accessToken');

    const data = await fetch('https://blognewbackend.onrender.com/Blog/AddMessage' , {
      method:"POST",
      body:JSON.stringify(contactInfo),
      headers:{
        "Content-Type":"application/json",
        'Authorization': `${token}`,
      }
    })

    const res = await data.json()
    console.log(res)

    if(res.status==='Success'){
      navigate('/contact')
      seterrMsg(null)
    }

    if(res.status==='Failed'){
      seterrMsg(res.message)
    }

    setContactInfo(initialState);
  };

  return (
    <>
      <div className="ContactHeading">
        <h1>Feel Free to Contact Us.</h1>
      </div>

      <div className="Map">
        <div className="container">
          <iframe
            width="100%"
            height="500px"
            src="https://maps.google.com/maps?q=cafepilkhwal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            style={{ border: "0" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="ContactText1">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et deleniti
          repudiandae magni doloremque aperiam placeat rerum accusamus qui fuga
          nam, sequi alias optio, consequatur repellendus cum dicta quae culpa
          suscipit? Facilis aliquid iure suscipit et fuga velit provident quos
          doloribus.
        </p>
      </div>

      <div className="ContactText2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          velit et qui ipsa quasi inventore dolores, quas nemo a cupiditate
          perferendis laborum libero perspiciatis mollitia blanditiis?
          Consectetur deleniti eum nulla quidem quia porro libero facere id
          nesciunt alias rerum ipsam architecto itaque iure accusantium, eaque
          in eius voluptas cupiditate dolorum.
        </p>
      </div>

      <div className="container ContactText-3">
        <div className="row">
          <div className="col-md-6">
            <h2>Where to Find Us.</h2>
            <p>
              Cafe Pilkhwal <br />
              Nangloi, New Delhi 110041
            </p>
          </div>

          <div className="col-md-6">
            <h2>Contact info</h2>
            <p>MyBlog@Gmail.com</p>
            <p>Phone: (+1) 123 456 789</p>
          </div>
        </div>
      </div>

      <h1 className="my-3" style={{ textAlign: "center", color: "black", fontFamily: "Libre Baskerville" }}>
        Say hello
      </h1>

      <p style={{textAlign:"center" , color:"Red"}} >{errMsg === null ? null : errMsg}</p>
      <div className=" my-5 container formContainer">
        <form action="/AddMessage" method="POST">
          <div className="row mb-4">
            <div className="col-md-12">
              <div>
                <input
                  value={contactInfo.name || ''}
                  onChange={handleOnChange}
                  type="text"
                  id="form6Example1"
                  name="name"
                  placeholder="Name"
                  className="form-control p-2"
                />
              </div>
            </div>
          </div>

          <div className=" mb-4">
            <input
              type="email"
              value={contactInfo.email || ''}
              onChange={handleOnChange}
              placeholder="Email"
              name="email"
              id="form6Example5"
              className="form-control p-2"
            />
          </div>

          <div className=" mb-4">
            <input
              type="number"
              value={contactInfo.contact || ''}
              onChange={handleOnChange}
              placeholder="Contact"
              name="contact"
              id="form6Example6"
              className="form-control p-2"
            />
          </div>

          <div className=" mb-4">
            <textarea
              className="form-control"
              value={contactInfo.message || ''}
              onChange={handleOnChange}
              name="message"
              placeholder="Your Message"
              id="form6Example7"
              rows="4"
            ></textarea>
          </div>

          <button
            onClick={handleOnSubmit}
            type="submit"
            className="btn btn-dark p-3 btn-block mb-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
