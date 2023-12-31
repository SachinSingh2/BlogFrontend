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

    const token = sessionStorage.getItem('accessToken');

    const data = await fetch('http://127.0.0.1:8000/Blog/AddMessage' , {
      method:"POST",
      body:JSON.stringify(contactInfo),
      headers:{
        "Content-Type":"application/json",
        'Authorization': `${token}`,
      }
    })

    const res = await data.json()

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

      <div data-aos="fade-up"  className="Map border">
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

      <div data-aos="fade-up" className="ContactText1">
        <p>
        Thank you for reaching out to InspireHub. We value your feedback, inquiries, and the opportunity to connect with our community. Please feel free to use the contact form below or reach us through the provided contact details..
        </p>
      </div>

      <div data-aos="fade-up" className="ContactText2">
        <p>
        We appreciate your thoughts on how we can improve InspireHub. Share your suggestions and ideas with us; your input is invaluable..
        </p>
      </div>

      <div className="container ContactText-3">
        <div className="row">
          <div data-aos="fade-up" className="col-md-6">
            <h2>Where to Find Us.</h2>
            <p>
              Cafe Pilkhwal <br />
              Nangloi, New Delhi 110041
            </p>
          </div>

          <div data-aos="fade-up" className="col-md-6">
            <h2>Contact info</h2>
            <p>ss0985211g@gmail.com</p>
            <p>Phone: (+91) 9821628507</p>
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
                data-aos="fade-left"
                  value={contactInfo.name || ''}
                  onChange={handleOnChange}
                  type="text"
                  id="form6Example1"
                  name="name"
                  placeholder="Name"
                  className="form-control p-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className=" mb-4">
            <input
              type="email"
              data-aos="fade-left"
              value={contactInfo.email || ''}
              onChange={handleOnChange}
              placeholder="Email"
              name="email"
              id="form6Example5"
              required
              className="form-control p-2"
            />
          </div>

          <div className=" mb-4">
            <input
              type="number"
              data-aos="fade-left"
              value={contactInfo.contact || ''}
              onChange={handleOnChange}
              placeholder="Contact"
              name="contact"
              id="form6Example6"
              className="form-control p-2"
              required
            />
          </div>

          <div className=" mb-4">
            <textarea
              className="form-control"
              data-aos="fade-left"
              value={contactInfo.message || ''}
              onChange={handleOnChange}
              name="message"
              placeholder="Your Message"
              id="form6Example7"
              required
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
