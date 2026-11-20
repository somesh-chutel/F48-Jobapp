import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';
import { useEffect } from 'react';

const Home = ()=>{

    let navigate = useNavigate();

    useEffect(()=>{

        let token = Cookies.get("token");

        if( token === undefined ){

            navigate("/login");
        }

    },[]);

    return (
        <>
            <h1> Hello Home Component </h1>
        </>
    )
}

export default Home;