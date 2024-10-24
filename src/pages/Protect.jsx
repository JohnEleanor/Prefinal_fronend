import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Protect() {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            alert('Please Login');
            navigate('/');
        }
    }, [user])

  return <Outlet />
}
 