import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  axios.defaults.withCredentials=true;

//   const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8081') // Ensure you have the correct API endpoint here
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          // Assuming you want to navigate to '/login' on success
        //   navigate('/login');
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []); // Added an empty dependency array to run the effect only once


  const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
     .then(res => {
         location.reload(true);
    }) .catch(err => console.log(err));
}

  return (
    <div className='container mt-4'>
      {auth ? (
        <div>
          <h3>You are Authorized {name}</h3>
          <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
