import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);


    const getUserbyID = async () => {
        try {
            const response = await fetch("http://localhost/Prefinal/API.php/user/" + id);
            const result = await response.json();

            if (result.status == "success") {
                console.log(result.data);
                setUser(result.data);
            }
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_username = e.target.username.value;
        const new_password = e.target.password.value;
        const new_email = e.target.email.value;

        try {
            const response = await fetch("http://localhost/Prefinal/API.php/user/" + id, {
                method: 'PUT',
                body: JSON.stringify({
                    'username': new_username,
                    'password': new_password,
                    'email': new_email
                }),
            })
            const data = await response.json();

            if (data.status == "success") {
                alert('Edit Success');
                navigate('/user');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getUserbyID();
    }, []);

  return (
    <>
    <h1>Edit</h1>
    {
        user.map((item, index) => (
            <form key={index} onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" defaultValue={item.username} />
                <br />
                <label>Password:</label>
                <input type="test" name="password" defaultValue={item.password} />
                <br />
                <label>Email:</label>
                <input type="email" name="email" defaultValue={item.email} />
                <br />
                <button type="submit">เปลี่ยนข้อมูล</button>
            </form>
        ))
    }


    </>
  )
}



