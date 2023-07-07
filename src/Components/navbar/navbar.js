import './navbar.css';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

function Navbar() {
    const logo6 = require('../../images/logo6.png');
    const profil1 = require('../../images/profil1.png');
    const cart = require('../../images/cart.png');


    // =========================
    
    useEffect(() => {
        let isAvailable = cookies.get('user')
        // const userImageButton = document.querySelector('#user-img');
        // const userPopup = document.querySelector('.login-logout-popup');
        const popuptext = document.querySelector('.account-info');
        const actionBtn = document.querySelector('#user-btn');
        const actionBtn1 = document.querySelector('#user-btn-profile');
        const actionBtn2 = document.querySelector('#user-btn-history');
        const actionBtn3 = document.querySelector('#btn-cart');
        if (isAvailable) {
            //saat user sudah login
            popuptext.innerHTML = `sign in as, UDIN`;
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
            <a href="/cart">
                <img src={cart} id="btn-cart" alt=""/>
            </a>
        </div>
     </div>
            <ul className="links-container">
                  <li className="link-item"><a href="#home" className="link">Home</a></li>
                  <li className="link-item"><a href="+" className="link">Collection</a></li>
                  <li className="link-item"><a href="#Catalog" className="link">Catalog</a></li>
                  <li className="link-item"><a href="+" className="link">About Us</a></li>
                  <li className="link-item"><a href="+" className="link">Sign Up</a></li>
            </ul>
    </div>
  );
}

export default Navbar;
