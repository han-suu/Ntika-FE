import { useState } from 'react';
import './SignIn.css';
import Cookies from 'universal-cookie';
import Axios from 'axios';
const cookies = new Cookies()


function SignIn() {
  const loader = require('../../images/loader.gif');
  const error = require('../../images/error.png');
  const logo5 = require('../../images/logo5.png');

  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const Login = (e)=>{
    e.preventDefault()
    if(Email === undefined || Password === undefined){
      console.log("Ada yang Kosong")
    }else{
      const data ={
        "email":Email,
        "password":Password
      }
      Axios.post('http://127.0.0.1:8080/v1/sign-in', data)
        .then(function (response) {
          cookies.set('user', response.data.token, { path: '/' })
          window.location.href = '/';
        })
        .catch(function (error) {
          showAlert(error.response.data.msg)
        });
      // cookies.set('user', 'UDIN', { path: '/' })
      // cookies.set('email', 'DINU@email', { path: '/' })
      // window.location.href = '/';
    }
  }
  const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
          alertBox.classList.remove('show');
    }, 3000);
  }
  return (
    <div className="SignIn">
      <img src={loader} className="loader" alt=""/>

      <div className="alert-box">
            <img src={error} className="alert-img" alt=""/>
            <p className="alert-msg">Eror Massage</p>
      </div>

      <div className="container">
            <img src={logo5} className="logo" alt=""/>
            <div>
              <form onSubmit={Login}>
                <input type="email" id="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="submit-btn" type='submit'>Sign In</button>
              </form>
            </div>
            <a href="/signup" className="sign-link">dont have an account? create here</a>
            
      </div>
      
    </div>
  );
}

export default SignIn;
