import { useState } from "react"
export default function Adduser() {
    
    const [userData, setUserData] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = fetch('htpp://localhost/Prefinal/API.php/user')
        } catch ( error ) {
            console.error("Error Add User:", error);
            
        }
    }
  return (
    <>

        <br />
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} value={userData.username || "" } placeholder="username" /><br/>
            <input type="text" name="password" onChange={handleChange} value={userData.password || ""} placeholder="password" /><br/>
            <input type="text" name="email" onChange={handleChange} value={userData.email || ""} placeholder="email" /><br/>
            <button type="submit" > เพิ่มข้อมูล</button>
        </form>
    </>
  
  )
}


