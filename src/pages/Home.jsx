import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [province, setProvince] = useState([]);
    const [selectProvince, setSelectProvince] = useState([]);

    const getProvince = async () => {
        try {
            const response = await fetch('http://localhost/Prefinal/API.php/province');
            const data = await response.json();
            
            setProvince(data);
            console.log("Load Product Success");
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    const LoadCache = () => {
        const item = localStorage.getItem("selectProvince");
        if (item) {
            console.log("Have Cache");
            setSelectProvince(JSON.parse(item));
        }
    }

    useEffect(() => {
       
        getProvince();
        LoadCache();
    }, []);

    const onSelectProvince = async (event) => {

        const province = event.target.value;
        try {
            const response = await fetch('http://localhost/preFinal/API.php/province/' + province);
            const data = await response.json();
            setSelectProvince(data);
            alert("You Select : "+province);
            localStorage.setItem('selectProvince', JSON.stringify(data));
        } catch (error) {
            
        }
    }



    return (
        <>
            <h1>Post Man</h1>
            <Link to='/home'>Post Man</Link> &nbsp;
            <Link to='/user'>User</Link> &nbsp;
            <Link to='/logout'>Log out</Link>

            <br />
            <h2>กรุณาเลือกจังหวัด
            <select name="select_province" onChange={onSelectProvince} >
                <option value="wrong" disabled>กรุณาเลือกจังหวัด</option>
                {
                    province.map((item, index) => (
                        <option value={item.name_th} key={index}>{item.name_th}</option>
                    )
                    )
                }
            </select>
            </h2> 
           

            <table border={1}>
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>Zipcode</th>
                        <th>Provice</th>
                        <th>District</th>
                        <th>Subdistric</th>
                        <th>Location</th>
                    </tr>
                    {
                        selectProvince.map((item, index) => (
                            <tr key={index}>
                                <td>{item.index}</td>
                                <td>{item.zipcode}</td>
                                <td>{item.province}</td>
                                <td>{item.district}</td>
                                <td>{item.subdistrict}</td>
                                <td>{item.longtitude},{item.latitude}</td>
                            </tr>
                        ))
                    }
                    
                       
                </tbody>
            </table>
        </>
    );
}
