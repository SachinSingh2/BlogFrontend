import React from 'react';
import { Link } from 'react-router-dom';

export default function PostsCard({ data }) {

  return (
    <div data-aos="slide-up" className="card my-2 my-5" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <span style={{ color: "white", padding: "8px 15px", borderRadius: "15px 0 0 0", backgroundColor: "#2e2e2e" }} className="position-absolute top-0 start-50 translate-middle">
        <span>{data.categories}</span>
      </span>



      <img style={{ borderRadius: "0px", objectFit: "cover", height: "200px" }} className="card-img-top" src={`http://127.0.0.1:8000/${data.picture.replace(/\\/g, '/')}`} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">
          {data.description.toString().split(' ').length > 15
            ? data.description.toString().split(' ').slice(0, 15).join(' ') + '...'
            : data.description}
        </p>

      <Link to={`/postDetail/${data._id}`} > <button className="btn btn-dark">Read More</button> </Link> 

        <div className="mt-3">
          <p className="card-text"><small className="text-muted">By: {data.username}</small></p>
          <p className="card-text"><small className="text-muted">Created: {data.createdAt}</small></p>
        </div>
      </div>
    </div>
  );
}
