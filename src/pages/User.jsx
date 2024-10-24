import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState("");

  const get_allUser = async () => {
    try {
      const response = await fetch("http://localhost/Prefinal/API.php/user");
      const data = await response.json();
      setUser(data);
      console.log("Load User Success");
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  const getRole = async () => {
    try {
      const data = localStorage.getItem("user");
      const user = JSON.parse(data);
      console.log(user.role);
      setRole(user.role);
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  const deleteUser = async (event) => {
    const id = event.target.value;
    // alert("Delete User ID : " + id);  
    try {
      const response = await fetch("http://localhost/Prefinal/API.php/user" , {
        method: "DELETE",
        body : JSON.stringify({
          "id": id
        })
        
      });

      const data = await response.json();
      if (data.status == "success") {
        alert("Delete User ID : " + id);
        get_allUser();
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  const editUser = async (event) => {
    const id = event.target.value;
    alert("Edit User ID : " + id);
    try {
      const response = await fetch("http://localhost/Prefinal/API.php/user/"+id , {
        method: "PUT",
        body : JSON.stringify({
          "id": id
        })
      });
      const data = await response.json();
      if (data.status == "success") {
        alert("Edit User ID : " + id);
        get_allUser();
      }
    } catch (error) {
      console.error("Error Edit User:", error);
    }
  };


  useEffect(() => {
    get_allUser();
    getRole();
  }, []);


  return (
    <>
      <h1>User</h1>
      <Link to="/home">Post Man</Link> &nbsp;
      <Link to="/user">User</Link> &nbsp;
      <Link to="/logout">Log out</Link>
      <br />
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {role == "admin"
            ? user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button onClick={editUser} value={item.id}>Edit</button>
                      <button onClick={deleteUser} value={item.id}>Delete</button>
                    </td>
                  </tr>
                );
              })
            : user.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    
                  </td>
                </tr>
              );
            })
          }
        </thead>
      </table>
    </>
  );
}
