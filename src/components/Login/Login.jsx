import axios from "axios";
import config from "../../config";
import React, { useState } from "react";
import { login } from "../../utils";

export default function Login(props) {
  const{setIsLogedin}=props
    const [password, setPassword] = useState('')
   const loginUser=(e)=>{
       e.preventDefault()
       console.log(password)
axios.post(`http://${config.API_URL}/login` ,{password})
.then((result) => {
          console.log(result.data);
          login();
          props.history.push('/dashboard');
        setTimeout(()=>{
          window.location.replace('/')
        },2000)
        })
        .catch((err) => {
          console.log(err);
        });
   }

   const inputChange = (e) => {
    setPassword(e.target.value);
   
  };
  return (
    <>
      <h2>Login</h2>
 <form onSubmit={loginUser} >     <label for="login" className="login">Password:</label>
      <input type="password" name='login' onChange={inputChange}/> <button type="submit">Log In</button></form>
    </>
  );
}
