import React, { useEffect, useState } from 'react'

export default function Users() {



    const [user , setUser] = useState()
    const [counter , setCounter] = useState(1)
    const [loading , setLoading] = useState(false)
    const [editForm , showEditForm] = useState(false)
    const [id , setId] = useState()


    // ------------------ Fetching the data
    useEffect(() => {
      const getUser = async () => {
          try {
            setLoading(true)
              const data = await fetch('https://blogbackend-ciog.onrender.com/Blog/GetAllUsersAdmin', {
                  method: "GET",
                  headers: {
                      "Content-type": "application/json",
                  }
              });
              const res = await data.json();
              setLoading(false)

              if(res.status==="Success"){
                setUser(res.data)
              }
          } catch (error) {
              console.log(error.message);
          }
      };
  
      getUser();
  }, [counter]);
  

  // ------------Function to delete 
  const handleOnDelete =  async(id)=>{
    console.log(id)
    const data = await fetch(`https://blogbackend-ciog.onrender.com/Blog/DeleteUser/${id}` , {
      method:"DELETE"
    })

    const res = await data.json()
    if(res.status==="Success"){
      setCounter(counter+1)
    }
  }


  // Function to edit

  const handleOnEdit = (id)=>{
    showEditForm(true)
    setId(id)
  }


  // --------------------------------------------------------------
  const handleOnSearchChange = async (e)=>{
      let By = e.target.value
      if(By.length >0){

        try {
          const data = await fetch (`https://blogbackend-ciog.onrender.com/Blog/SearchUsers/${By}` ,{
            method:"GET"
          })
      
          const res = await data.json()
          if(res.status==="Success"){
            setUser(res.data)
          }

        } catch (error) {
          console.log(error.message)
        }

      }
  }


  return (
    <>

    <div className=' p-1' style={{textAlign:"center"}} >
      <input style={{borderRadius:"2px" , border:"none" , backgroundColor:"whitesmoke" , color:"black" , outline:"lightgray solid 1px"}} type="text" onChange={handleOnSearchChange} className='w-50 p-2' placeholder='Search By Email or name' />
    </div>


{/* ------------Rendering the data */}

    {editForm ? <EditForm info={user} counter={counter} setCounter={setCounter} showEditForm={showEditForm} data={user} id={id}  /> : loading ?  <div style={{textAlign:"center" , fontSize:"60px" , marginTop:"50px"}}><i className="fa-solid fa-2xl fa-spinner fa-spin " style={{color: "#111212"}}></i></div> : user && user.length > 0 ? user.map((data) => (
  <div key={data._id}>
    <div data-aos="slide-up" className="container border border-dark  p-2 my-3">
      <div className="row">
        <div style={{borderRight:"solid gray 1px" , textAlign:"center"}} className="col-md-3">
          <h3>Name</h3> <br />
          <h5 style={{ wordWrap: "break-word" }}>{data.firstname}</h5>
        </div>

        <div style={{borderRight:"solid gray 1px" , textAlign:"center"}} className="col-md-3">
          <h3>Email</h3> <br />
          <p style={{ wordWrap: "break-word" }}> {data.email}</p>
        </div>

        <div className="col-md-3" style={{borderRight:"solid gray 1px" , textAlign:"center"}}>
          <h3>About</h3> <br />
          <p style={{ wordWrap: "break-word" }}>{data.about ? data.about.split(' ').slice(0, 10).join(' ') : ''}</p>
        </div>

        <div className="col-md-3" style={{textAlign:"center"}}>
            <button onClick={()=>{handleOnDelete(data._id)}} className='btn btn-dark mx-1 my-5' >Delete</button>
            <button onClick={()=>{handleOnEdit(data._id)}} className='btn btn-dark mx-1 my-5'> Edit</button>
        </div>


      </div>
    </div>
  </div>
)) : <h1 style={{textAlign:"center"}} >No Current Users</h1>} 






    </>
  )
}



// ------------Edit Form-------

const EditForm = ({ id, showEditForm, setCounter, counter, info }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    about: '',
  });
  const [data, setData] = useState();

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    const updateUserInfo = await fetch(`https://blogbackend-ciog.onrender.com/Blog/UpdateUser/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const res = await updateUserInfo.json();

    if (res.status === 'Success') {
      showEditForm(false);
      setCounter(counter + 1);
    }
  };

  // Filtering the data
  useEffect(() => {
    const filterData = info.filter((data) => {
      return data._id === id;
    });

    // Set initial state based on the filtered data
    setData(filterData);
    setUserInfo({
      name: filterData[0].firstname,
      email: filterData[0].email,
      about: filterData[0].about,
    });
  }, [id, info]);

  return (
    <>
      <div>
        <span>
          <i
            className="fa-solid fa-arrow-left fa-3x"
            onClick={() => {
              showEditForm(false);
            }}
            style={{ color: '#000000' }}
          ></i>
        </span>
        <h1 style={{ textAlign: 'center' }}>Update Information</h1>
      </div>

      <div style={{ textAlign: 'center' }} className="container w-75 border p-2">
        <form onSubmit={handleOnUpdate}>
          <div>
            <input
              value={userInfo.name}
              onChange={handleOnChange}
              type="text"
              className="w-100 my-2 p-1"
              placeholder="Name"
              name="name"
            />
          </div>
          <div>
            <input
              value={userInfo.email}
              onChange={handleOnChange}
              type="text"
              className="w-100 my-2 p-2"
              placeholder="Email"
              name="email"
            />
          </div>
          <div>
            <textarea
              value={userInfo.about}
              onChange={handleOnChange}
              placeholder="About"
              className="w-100 my-2"
              name="about"
            ></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-dark">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

