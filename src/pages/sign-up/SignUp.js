import { useState } from 'react';
import './SignUp.css';
import Axios from 'axios';

function SignUp() {
  const loader = require('../../images/loader.gif');
  const error = require('../../images/error.png');
  const logo5 = require('../../images/logo5.png');

  // const [Name, setName] = useState()
  // const [Email, setEmail] = useState()
  // const [Password, setPassword] = useState()
  // const [Phone, setPhone] = useState()
  // =================================

  // const mengInputName = (e)=>{
  //   setName(e.target.value)
  // }
  // const mengInputEmail = (e)=>{
  //   setEmail(e.target.value)
  // }
  // const mengInputPass = (e)=>{
  //   setPassword(e.target.value)
  // }
  // const mengInputPhone = (e)=>{
  //   setPhone(e.target.value)
  // }
  // const daftar = (e)=>{
  //   e.preventDefault()
  //   if(Name === undefined || Email === undefined || Password === undefined || Phone === undefined){
  //     console.log("Kosong WOI")
  //   }else{
  //     const data ={
  //       "name":Name,
  //       "email":Email,
  //       "password":Password,
  //       "phone":Phone
  //     }
  //     console.log("MENG DAFTAR")
  //     console.log(Name)
  //     console.log(Email)
  //     console.log(Password)
  //     console.log(Phone)
  //     Axios.post('http://127.0.0.1:8080/v1/sign-up', data)
  //       .then(function (response) {
  //         // console.log(response.data);
  //         console.log(response.data)
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //     setName()
  //     setEmail()
  //     setPassword()
  //     setPhone()
  //     window.location.href = '/login';
  //   }
  // }

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    let hasErr = false
    switch (fieldName) {
      case 'name':
        // errorMessage = value.trim() === '' ? 'Username is required' : '';
        if (value.trim()===''){
          errorMessage='Username is required'
          hasErr = true
        }else{
          errorMessage=''
        }
        break;
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
      case 'phone':
        if (value.trim()===''){
          errorMessage='Telp Number is required'
          hasErr = true
        }else if (value.length<10 || isNaN(value)){
          errorMessage='Harus Angka & lebih dari 10 karakter'
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
      Axios.post('http://127.0.0.1:8080/v1/sign-up', formData)
        .then(function (response) {
          // console.log(response.data);
          console.log(response.data)
          window.location.href = '/login';
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Fail"); // Log "Fail" when there are errors
    }
  };
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
                  {/* <form onSubmit={daftar}>
                    <input type="text" id="name" placeholder="Name" onChange={mengInputName}/>
                    <input type="email" id="email" placeholder="Email" onChange={mengInputEmail} />
                    <input type="password" id="password" placeholder="Password" onChange={mengInputPass} />
                    <input type="text" id="number" placeholder="Tlp Number" onChange={mengInputPhone} />
                    <button type='submit' className="submit-btn">create account</button>
                  </form> */}
                  <form onSubmit={handleSubmit}>
                    {/* <label> */}
                      {/* Username: */}
                      <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    {/* </label> */}
                    
                    {/* <label> */}
                      {/* Email: */}
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    {/* </label> */}
                    
                    {/* <label> */}
                      {/* Password: */}
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="error-message">{errors.password}</div>}
                    {/* </label> */}
                      <input
                        type="text"
                        name="phone"
                        id="number"
                        placeholder="Tlp Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <div className="error-message">{errors.phone}</div>}
                    <button type="submit" className="submit-btn">Submit</button>
                  </form>
            </div>
            <a href="/login" className="link-SignUp">already have an account? Sign in here!</a>
      </div>
    </div>
  );
}

export default SignUp;
