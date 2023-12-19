import React from "react";
import "../../css/Navbar2.css";
import {Link} from 'react-router-dom'

export default function Navbar2() {
    const handleOnLogout = () => {
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      };
    
  return (
    <>
      <nav className="NavMain">

      <div className="BeyondLines">
            <h1>BeyondLines</h1>
          </div>

          
        <div className="navHeading ">

{/* OffCanvas btn */}

<button style={{border:"none" , backgroundColor:"black" , boxShadow:"none"}} className="btn btn-primary OffCanVasBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
<i className="fa-solid fa-bars fa-2xl " style={{color: "white"}}></i>
</button>

        </div>

{/* Second */}
<div className="hr px-5">
        <hr style={{color:"white"}} />
</div>


{/* Third */}
<div className="navMainBox">
    <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={"/about"} >About</Link></li>
        <li><Link to={"/contact"} >Contact</Link></li>
        <li><Link onClick={handleOnLogout}>Logout</Link></li>
    </ul>
</div>


      </nav>




{/* ------------------------------------------------------------------------------------------------------------------------ */}



<div className="offcanvas offcanvas-start" data-bs-backdrop="static"  id="staticBackdrop" aria-labelledby="staticBackdropLabel">


    <div style={{textAlign:"center"}} className="crossBtnBox my-3">
    <i className="fa-solid fa-x fa-2xl " data-bs-dismiss="offcanvas" aria-label="Close" style={{color: "#ffffff"}}></i>
  </div>

  
  <div className="offcanvas-body OffCanvasBody">

  <div className="Logo">
      <h1>BeyondLines</h1>
    </div>

    <div className="Links">

        <li data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><Link to={'/'}>Home</Link></li>
        <hr style={{border :"solid white 1px"}} />
        <li data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><Link to={"/about"} >About</Link></li>
        <hr style={{border :"solid white 1px"}} />
        <li data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><Link to={"/contact"} >Contact</Link></li>
        <hr style={{border :"solid white 1px"}} />
        <li data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><Link onClick={handleOnLogout}>Logout</Link></li>
        <hr style={{border :"solid white 1px"}} />
    </div>

    <div className="socialsBox">
    <a target="blank" href="https://www.facebook.com/"><i className="fab fa-facebook-f fa-xl mx-2"></i></a>
    <a target="blank" href="https://twitter.com/home?lang=en"><i className="fab fa-twitter fa-xl  mx-2"></i></a>
    <a  target="blank" href="https://www.google.com/"><i className="fab fa-google fa-xl mx-2"></i></a>
     <a target="blank" href="https://www.instagram.com/"><i className="fab fa-instagram fa-xl mx-2"></i></a>       
            
            
          </div>

  </div>

</div>




    </>
  );
}
