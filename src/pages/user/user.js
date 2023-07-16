import './user.css';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/navbar/navbar';
const cookies = new Cookies()
function User() {
    let token = cookies.get('user')
    let config = {
            headers:{
            Authorization: token,
            }
    };
    const logo5 = require('../../images/logo5.png');
    const errorimg = require('../../images/error.png');
    const successimg = require('../../images/success.png');
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")
    const [User, setUser] = useState()
    const [OldPass, setOldPass] = useState("")
    const [NewPass, setNewPass] = useState("")
    useEffect(() => {
        Axios.get('http://127.0.0.1:8080/v1/user', config)
        .then(function (response) {
            setUser(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])
    
    const Submit = (e)=>{
        // e.preventDefault()
        console.log("SUBMIT")
        let data ={}
        if (Name!=="") {
            data.name = Name
        }
        if (Phone!=="") {
            data.phone = Phone
        }
        if (Address!=="") {
            data.address = Address
        }
        Axios.put('http://127.0.0.1:8080/v1/change_address', data,config)
            .then(function (response) {
                // console.log(response.data);
                console.log(response.data.data)
                // setUser(response.data.data)
                Axios.get('http://127.0.0.1:8080/v1/user', config)
                    .then(function (response) {
                        setUser(response.data.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        setAddress("")
        setPhone("")
        setName("")
        // console.log(data)
    }

    const SubmitPass = (e)=>{
        e.preventDefault()
        // console.log("SUBMITPASS")
        const data ={}
        if (OldPass===""|| NewPass==="") {
            showAlert("ADA FIELD YANG KOSONG !!",errorimg)
            return
        }else{
            
            data.old_password = OldPass
            data.new_password = NewPass
        }
        Axios.put('http://127.0.0.1:8080/v1/change_password', data,config)
            .then(function (response) {
                // console.log(response.data)
                showAlert("Berhasil Update Password",successimg)
            })
            .catch(function (error) {
                // console.log(error);
                showAlert("Password Lama Salah",errorimg)
            });
        setOldPass("")
        setNewPass("")
        
    }
    
    const showAlert = (msg,img) => {
        let alertBox = document.querySelector('.alert-box');
        let alertMsg = document.querySelector('.alert-msg');
        let alertImg = document.querySelector('.alert-img');
        alertImg.src = img
        alertMsg.innerHTML = msg;
        alertBox.classList.add('show');
        setTimeout(() => {
              alertBox.classList.remove('show');
        }, 3000);
      }
  return (
    <div className="user">
        <Navbar></Navbar>
      <div className="profile">
      <div className="alert-box">
            <img src={errorimg} className="alert-img" alt=""/>
            <p className="alert-msg">Eror Massage</p>
      </div>
            <div className="container-profile">
                  <img src={logo5} className="logo-profile" alt=""/>
                  <div>
                        <div className="user-info">
                            <p><strong>Nama:</strong> {User?.UserName} </p>
                            <p><strong>Email:</strong> {User?.Email}</p>
                            <p><strong>No. Telepon:</strong> {User?.Phone}</p>
                            <p><strong>Alamat:</strong> {User?.Address}</p>
                        </div>
                  </div>
            </div>
      </div>

      <div className="address-section">
            <h2>User Profil</h2>
            <form onSubmit={Submit}>
                  <input value={Name} type="text" placeholder="Nama" onChange={(e)=>{setName(e.target.value)}}/>
                  <input value={Phone} type="number" placeholder="No Telepon" onChange={(e)=>{setPhone(e.target.value)}}/>
                  <textarea value={Address} placeholder="Alamat Lengkap" onChange={(e)=>{setAddress(e.target.value)}}></textarea>
                  <button className="submit-btn">Simpan</button>

            </form>
      </div>
      <div className="password-section">
            <h2>Ganti Password</h2>
            <form onSubmit={SubmitPass}>
                  <input value={OldPass} type="password" placeholder="Password Lama" onChange={(e)=>{setOldPass(e.target.value)}}/>
                  <input value={NewPass} type="password" placeholder="Password Baru" onChange={(e)=>{setNewPass(e.target.value)}}/>
                  <button className="submit-btn">Simpan</button>

            </form>
      </div>
    </div>
  );
}

export default User;
