import './navbar.css';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
const cookies = new Cookies()

function Navbar() {
    const logo6 = require('../../images/logo6.png');
    const profil1 = require('../../images/profil1.png');
    const cart = require('../../images/cart.png');


    // =========================
    const [Isi, setIsi] = useState()
    useEffect(() => {
        const popuptext = document.querySelector('.account-info');
        const actionBtn = document.querySelector('#user-btn');
        const actionBtn1 = document.querySelector('#user-btn-profile');
        const actionBtn2 = document.querySelector('#user-btn-history');
        const actionBtn3 = document.querySelector('.cart-nav');
        const SignUp = document.querySelector('#SignUp');
        const Notif = document.querySelector('.tag-cart');
        let token = cookies.get('user')
        const config = {
            headers:{
              Authorization: token,
            }
        };
        
        
        // const userImageButton = document.querySelector('#user-img');
        // const userPopup = document.querySelector('.login-logout-popup');
        
        if (token) {
            //saat user sudah login
            Axios.get('http://127.0.0.1:8080/v1/user', config)
                .then(function (response) {
                let name = response.data.data.UserName
                popuptext.innerHTML = `sign in as ${name}`;

                SignUp.style.display = 'none';
                actionBtn1.innerHTML = `User Dashboard`;
                actionBtn1.addEventListener(`click`, () => {
                    window.location.href = '/user';
                })
                actionBtn2.innerHTML = `Riwayat Pemesanan`;
                actionBtn2.addEventListener(`click`, () => {
                    window.location.href = '/userHis';
                })
                actionBtn3.addEventListener('click', () => {
                    window.location.href = '/cart';
                })
                actionBtn.innerHTML = `sign out`;
                actionBtn.addEventListener('click', () => {
                    cookies.remove("user", { path: '/' })
                    window.location.reload();
                })
                const config = {
                    headers:{
                    Authorization: token,
                    }
                };
                Axios.get('http://127.0.0.1:8080/v1/cart', config)
                    .then(function (response) {
                        setIsi(response.data)
                        if (response.data.data.length<1) {
                            Notif.style.display = 'none';
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
                .catch(function (error) {
                console.log(error);
                });
            

        } else {
            //user is logged out 
            popuptext.innerHTML = `sign in untuk menyewa kebaya`;
            actionBtn.innerHTML = `sign in`;
            actionBtn.addEventListener(`click`, () => {
                window.location.href = '/login';
            })
            // Menyembunyikan opsi "Profile Setting"
            actionBtn1.style.display = 'none';
            actionBtn2.style.display = 'none';
            actionBtn3.style.display = 'none';
        }
    }, [])
    
    const pop = ()=>{
        document.querySelector('.login-logout-popup').classList.toggle('hide');
        // console.log("kelik")
    }
    
  return (
    <div className="navbar">
      <div className="nav">
        <img src={logo6} className="brand-logo" alt=""/>
        <div className="nav-items">
            <div className="search">
                <input type="text" className="search-box" placeholder="Temukan kebaya impian Anda di sini..."/>
                <button className="search-btn">search</button>
            </div>
            <a onClick={()=>pop()}>
                <img src={profil1} id="user-img" alt=""/>
                <div className="login-logout-popup hide">
                    <p className="account-info">Log In as, Name</p>
                    <button className="btn" id="user-btn-profile">Profile Setting</button>
                    <button className="btn" id="user-btn-history">Riwayat Pesan</button>
                    <button className="btn" id="user-btn">Log Out</button>
                </div>
            </a>
            <div className="cart-nav">
                <a href="/cart"><img src={cart} id="btn-cart" alt=""/></a>
                <span className="tag-cart">{Isi?.data.length}</span>
            </div>
        </div>
     </div>
            <ul className="links-container">
                  <li className="link-item"><a href="/" className="link">Home</a></li>
                  <li className="link-item"><a href="/#collection" className="link">Recommendation</a></li>
                  <li className="link-item"><a href="/#Catalog" className="link">Catalog</a></li>
                  <li className="link-item"><a href="/" className="link">About Us</a></li>
                  <li className="link-item" id='SignUp'><a href="/signup" className="link">Sign Up</a></li>
            </ul>
    </div>
  );
}

export default Navbar;
