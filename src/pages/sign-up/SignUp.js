import { useState } from 'react';
import './SignUp.css';
import Axios from 'axios';

function SignUp() {
  const loader = require('../../images/loader.gif');
  const error = require('../../images/error.png');
  const logo5 = require('../../images/logo5.png');

  const [Name, setName] = useState()
  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const [Phone, setPhone] = useState()
  // =================================

  const mengInputName = (e)=>{
    setName(e.target.value)
  }
  const mengInputEmail = (e)=>{
    setEmail(e.target.value)
  }
  const mengInputPass = (e)=>{
    setPassword(e.target.value)
  }
  const mengInputPhone = (e)=>{
    setPhone(e.target.value)
  }
  const daftar = (e)=>{
    e.preventDefault()
    if(Name === undefined || Email === undefined || Password === undefined || Phone === undefined){
      console.log("Kosong WOI")
    }else{
      const data ={
        "name":Name,
        "email":Email,
        "password":Password,
        "phone":Phone
      }
      console.log("MENG DAFTAR")
      console.log(Name)
      console.log(Email)
      console.log(Password)
      console.log(Phone)
      Axios.post('http://127.0.0.1:8080/v1/sign-up', data)
        .then(function (response) {
          // console.log(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      setName()
      setEmail()
      setPassword()
      setPhone()
      window.location.href = '/login';
    }
    
    
    
    
    
    
  }
  return (
    <div className="SignUp">
      <img src={loader} className="loader" alt=""/>

      <div className="alert-box">
            <img src={error} className="alert-img" alt=""/>
            <p className="alert-msg">Eror Massage</p>
      </div>

      <div className="container">
            <img src={logo5} className="logo" alt=""/>
            <div>
                  <form onSubmit={daftar}>
                    <input type="text" id="name" placeholder="Name" onChange={mengInputName}/>
                    <input type="email" id="email" placeholder="Email" onChange={mengInputEmail} />
                    <input type="password" id="password" placeholder="Password" onChange={mengInputPass} />
                    <input type="text" id="number" placeholder="Tlp Number" onChange={mengInputPhone} />
                    <input type="checkbox" className="checkbox" id="term-and-cond"/>
                    <label htmlFor="term-and-cond">agree to our <a href="google.com">term and condition</a></label>
                    <br/>
                    <input type="checkbox" className="checkbox" id="notification"/>
                    <label htmlFor="notification">recieve upcoming offers and events emails</label>
                    <button type='submit' className="submit-btn">create account</button>
                  </form>
            </div>
            <a href="/login" className="link">already have an account? Sign in here!</a>
      </div>
    </div>
  );
}

export default SignUp;
