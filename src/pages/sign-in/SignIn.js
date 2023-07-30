import { useState } from 'react';
import './SignIn.css';
import Cookies from 'universal-cookie';
import Axios from 'axios';
const cookies = new Cookies()


function SignIn() {
  const loader = require('../../images/loader.gif');
  const error = require('../../images/error.png');
  const logo5 = require('../../images/logo5.png');

  // const [Email, setEmail] = useState()
  // const [Password, setPassword] = useState()
  // const Login = (e)=>{
  //   e.preventDefault()
  //   if(Email === undefined || Password === undefined){
  //     console.log("Ada yang Kosong")
  //   }else{
  //     const data ={
  //       "email":Email,
  //       "password":Password
  //     }
  //     Axios.post('http://127.0.0.1:8080/v1/sign-in', data)
  //       .then(function (response) {
  //         cookies.set('user', response.data.token, { path: '/' })
  //         window.location.href = '/';
  //       })
  //       .catch(function (error) {
  //         showAlert(error.response.data.msg)
  //       });
  //     // cookies.set('user', 'UDIN', { path: '/' })
  //     // cookies.set('email', 'DINU@email', { path: '/' })
  //     // window.location.href = '/';
  //   }
  // }
  const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
          alertBox.classList.remove('show');
    }, 3000);
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    let hasErr = false
    switch (fieldName) {
      case 'email':
        // errorMessage = value.trim() === '' ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
        if (value.trim()===''){
          errorMessage='Email is required'
          hasErr = true
        }else if(!/\S+@\S+\.\S+/.test(value)){
          errorMessage='Format e-mail yang dimasukkan salah'
          hasErr = true
        }else{
          errorMessage=''
        }
        break;
      case 'password':
        // errorMessage = value.trim() === '' ? 'Password is required' : '';
        if (value.trim()===''){
          errorMessage='Password is required'
          hasErr = true
        }else if (value.length<8){
          errorMessage='Password minimal 8 karakter'
          hasErr = true
        }else{
          errorMessage=''
        }
        break;
      
      default:
        break;
    
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
    return hasErr
  };

  const handleSubmit = (event) => {
    setSubmitted(true)
    event.preventDefault();
    let Err = false
    // Validate the entire form
    for (const key in formData) {
      let hasErr = validateField(key, formData[key]);
      if (hasErr === true){
        // console.log("GAGAL BOSS")
        Err = true
      }else{
        
      }
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (!hasErrors && !Err) {
      console.log("Pass"); // Log "Pass" when there are no errors
      // Handle form submission here
      // console.log(formData)
      Axios.post('http://127.0.0.1:8080/v1/sign-in', formData)
        .then(function (response) {
          cookies.set('user', response.data.token, { path: '/' })
          window.location.href = '/';
        })
        .catch(function (error) {
          showAlert(error.response.data.msg)
        });
    } else {
      console.log("Fail"); // Log "Fail" when there are errors
    }
  };
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
              {/* <form onSubmit={Login}>
                <input type="email" id="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="submit-btn" type='submit'>Sign In</button>
              </form> */}
              <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {submitted && errors.email && <div className="error-message">{errors.email}</div>}

                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {submitted && errors.password && <div className="error-message">{errors.password}</div>}

                    <button type="submit" className="submit-btn">Submit</button>
                  </form>
            </div>
            <a href="/signup" className="sign-link">dont have an account? create here</a>
            
      </div>
      
    </div>
  );
}

export default SignIn;
