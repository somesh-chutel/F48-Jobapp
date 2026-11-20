import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import loginImage from '../assets/loginimage.png'

const Login = ()=>{

    const [allValues,setvalues] = useState({
        username : "",
        password : "",
        errorMsg : ""
    });

    const navigate = useNavigate();

    useEffect(()=>{

        let token = Cookies.get("token");

        if( token != undefined ){
            navigate("/");
        }

    },[]);

    const onLoginUser = async(e) =>{

        e.preventDefault();

        const api = "https://apis.ccbp.in/login";
        const userDetails = {
            username : allValues.username,
            password : allValues.password
        }
        const options = {
            method : "Post",
            body : JSON.stringify(userDetails)
        }

        try {

            const response = await fetch( api, options );
            const data = await response.json();

            if( response.ok ){
                setvalues({...allValues,errorMsg : ""});
                Cookies.set("token",data.jwt_token);
                navigate("/");
            }
            else{
                setvalues({...allValues,errorMsg : data.error_msg});
            }
            
        } catch (error) {
            
            console.log( error );
        }

    }

    return (
        <div className='login-cont'>
           
           <img src={loginImage} alt="" />

           <form className='shadow p-3' style={{width:"30%"}} onSubmit={onLoginUser}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input onChange={ e => setvalues({...allValues,username : e.target.value})} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={ e => setvalues({...allValues,password : e.target.value})} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <br /><br /> 
            <b className='text-danger'>{allValues.errorMsg}</b>
            </form>

        </div>
    )
}

export default Login;

