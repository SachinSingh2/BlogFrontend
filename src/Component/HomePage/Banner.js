import React from 'react';
import '../../css/Banner.css'

export default function Banner() {


  return (
    <>
      {/* Jumbotron */}
      <div className=" text-center bg-image " >
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">

              <h1  className="mb-3 BlogHeading">BLOG</h1>


              <h4 className="mb-3 BlogSubHeading">Write Your vlogs here</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Jumbotron */}
    </>
  );
}
