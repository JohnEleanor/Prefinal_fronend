import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = inputs.username;
    const password = inputs.password;
    const email = inputs.email;
    try {

      const response = await fetch('http://localhost/Prefinal/API.php/user/register' , 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
            "email": email 
          })
        }
      );
      const data = await response.json();
      if (data.status == "success" ) {
        alert('Register Success');
        navigate("/");
      }else {
        alert(data.message);
      }

    } catch (error) {
      console.log('Register Fail');
    }
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        username
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
        <br />
        password
        <input
          type="text"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
        <br />
        email
        <input
          type="text"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <Link to='/'>Back To Login</Link>
    </>
  )
}

