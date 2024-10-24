import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function Home() {

  const [inputs, setInputs] = useState([])
  const navigate = useNavigate();


  const handleChange = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = inputs.username;
    const password = inputs.password;


    try {
      const response = await fetch('http://localhost/Prefinal/API.php/user/login' , 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": username,
            "password": password
          })
        }
      );
  
      const data = await response.json();
      if (data.status == "success" ) {
        localStorage.setItem('user', JSON.stringify(data.data));
        alert('Login Success');
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }else {
        alert('Login Fail');
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>Password:
          <input
            type="text"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
      <Link to='/register'>Go Register </Link>
    </>
  )
}

