import React, {  useContext, useState } from 'react'
import '../css/LoginSignUp.css'
import { useNavigate } from 'react-router-dom'
import { InfoContext } from '../Context/InfoProvider'

export default function FormLogin({ setIsUserAuth }) {
  const [form, setForm] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  // Creating a function which will handle the showlogin function
  const handleShowLoginSignup = () => {
    setShowLogin(!showLogin);
  };

  // Function to set the data
  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };





  // Function work whenever we click on signup
  const handleOnSignUp = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true

    // Now we will post the data
    const data = await fetch('https://blogbackend-ciog.onrender.com/Blog/SignUp', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-type': 'application/json',
      },
    });

    setLoading(false); // Set loading to false when the request completes

    // Here we are awaiting the res which we are getting from the backend and we are the one who is sending it.
    const res = await data.json();
    console.log('res');
    console.log(res);

    // This condition will work when the res will get success
    if (res.status === 'Success') {
      setShowLogin(true);
      setForm({});
      setErrMsg('');
    }

    // Here we are setting up all the errors according to the response from the backend.
    if (res.status === 'Failed') {
      if (res.message.startsWith('user validation failed')) {
        setErrMsg('Please fill up all the inputs');
      } else if (res.message.startsWith('E11000 duplicate key error collection')) {
        setErrMsg('User with this Email already exists');
      } else {
        setErrMsg('There is something wrong');
      }
    }
  };






  //----------------------------------------------------------------------------- LOGIN
  const initialLoginInfo = {
    email: '',
    password: '',
  };

  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const [loginError, setLoginError] = useState('');

  const { Account, setAccount } = useContext(InfoContext);

  const navigate = useNavigate();

  // Function to work when the input fields change
  const handleOnLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  // Function to work when the login features get clicked
  const handleOnLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true

    const data = await fetch('https://blogbackend-ciog.onrender.com/Blog/Login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-type': 'application/json',
      },
    });

    setLoading(false); // Set loading to false when the request completes

    // consoling the res data
    const res = await data.json();

    // If the req go success
    if (res.status === 'Success') {
      setLoginError('');
      navigate('/');
      setIsUserAuth(true);

      // Storing the accessToken in sessionStorage
      sessionStorage.setItem('accessToken', `Bearer ${res.data.AccessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${res.data.RefreshToken}`);

      setAccount({ email: res.data.email, name: res.data.userName });
    }

    // To handle errors
    if (res.status === 'Failed') {
      setLoginError(res.message);
    }
  };

  return (
    <>


{showLogin ? <div className="container">


<section  className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div data-aos="fade-right" className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <h1 style={{textAlign:"center"}}>Login</h1>
        {/* OnLogin */}
        <form data-aos="fade-left" onSubmit={handleOnLogin}>
          {/* <!-- Email input --> */}
          <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
    <input onChange={handleOnLoginChange} type="email" id="form3Example1c" required name='email' placeholder="Your Email" className="form-control " />
  </div>

          {/* <!-- Password input --> */}
          <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
      <input onChange={handleOnLoginChange} type="password" required id="form3Example4c" name='password' placeholder="Password" className="form-control " />
  </div>


  {/* Set error here */}
  {loginError ? <p style={{textAlign:"center" , color:"red"}}>{loginError}</p> : ''}

          {/* <!-- Submit button --> */}

          {loading ? <div style={{textAlign:"center"}}><i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i></div> : <button  type="submit" className="btn btn-primary btn-lg btn-block">Login in</button> }
          
          

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>

          <div className='my-3' style={{textAlign:"center" , width:"100%"}}>
          <button style={{width:"100%"}} onClick={handleShowLoginSignup} className='btn btn-primary'>Don't have account?</button>
          </div>


        </form>

      </div>
    </div>
  </div>
</section>
</div> : <div className="container">

{/* ----------------------------------------------------Signup starts here */}

<section className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{boxShadow:"none"}} >
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-1 mx-1 mx-md-4 ">Sign up</p>

   <form data-aos="fade-right" style={{textAlign:"center"}} onSubmit={handleOnSignUp} className="mx-1 mx-md-4">

  <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-user fa-lg me-3 fa-fw"></i>

    <input onChange={handleOnChange} type="text" required id="form3Example1c" name='firstname' placeholder="Your Name" className="form-control " />

  </div>

  <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
    <input onChange={handleOnChange} type="email"  required id="form3Example1c" name='email' placeholder="Your Email" className="form-control " />
  </div>

  <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
      <input onChange={handleOnChange} type="password" required id="form3Example4c" name='password' placeholder="Password" className="form-control " />
  </div>

  <div className="d-flex flex-row align-items-center mb-4">
    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
      <input onChange={handleOnChange} type="password" required id="form3Example4cd" name='confirmpassword' placeholder="Repeat your password" className="form-control" />
  </div>



  <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
  {loading ? <div style={{textAlign:"center"}}><i className="fa-solid fa-2xl fa-spinner fa-spin" style={{color: "#111212"}}></i></div> : <button  type="submit" className="btn btn-primary btn-lg btn-block">Register</button> }
  </div>


{errMsg ? <p style={{textAlign:"center" , color:"red"}}>{errMsg}</p> : ''}


  <div style={{ textAlign: "center", color: "#3B71D3" }} className="div">
    <hr />
    <button className='btn btn-primary' onClick={handleShowLoginSignup}>Already have an account?</button>
  </div>


</form>
{/* In this code, I've removed the <label> elements and added the placeholder attribute to each input element to specify the placeholder text. */}






              </div>
              <div data-aos="fade-left" className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</div> }



    </>
  )
}
