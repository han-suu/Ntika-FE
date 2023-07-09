import './cart.css';
import Navbar from '../../Components/navbar/navbar';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useState } from 'react';
const cookies = new Cookies()
// import { useState } from 'react';
function Cart() {
    // const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    const close = require('../../images/close.png');

    // const Cart = [{"Name":"SAKURA KEBAYA", "Price": 50000, "Qty": 1, "Size": "s"},{"Name":"Kebaya2", "Price": 30000, "Qty": 1, "Size": "m"},{"Name":"Kebaya3", "Price": 90000, "Qty": 1, "Size": "s"},{"Name":"Kebaya4", "Price": 20000, "Qty": 1, "Size": "s"},{"Name":"Kebaya5", "Price": 30000, "Qty": 1, "Size": "xl"}]
    // const [first, setfirst] = useState(second)
    const [Cart, setCart] = useState([])
    const [User, setUser] = useState()
    useEffect(() => {
        let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
        Axios.get('http://127.0.0.1:8080/v1/cart', config)
              .then(function (response) {
                    // console.log(response.data);
                    console.log(response.data.data)
                    setCart(response.data.data)
              })
              .catch(function (error) {
                    console.log(error);
              });
        
        Axios.get('http://127.0.0.1:8080/v1/user', config)
            .then(function (response) {
                // console.log(response.data);
                console.log(response.data.data)
                setUser(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    
  return (
    <div className="Cart">
        <Navbar></Navbar>
        <div class="cart-section">
            <div class="product-list">
                <p class="section-heading">keranjang mu</p>
                <div class="cart">
                    {
                        Cart.map((item,index)=>{
                            // console.log(video)
                            return (
                                <div class="sm-product">
                                <img src={item.image} class="sm-product-img" alt=""/>
                                <div class="sm-text">
                                    <p class="sm-product-name">{item.name}</p>
                                    <p class="cart-size-radio-btn">Size : {item.size.toUpperCase()}</p>
                                </div>
                                <div class="item-counter">
                                    <button class="counter-btn decrement">-</button>
                                    <p class="item-count">{item.qty}</p>
                                    <button class="counter-btn increment">+</button>
                                </div>
                                <p class="sm-price">Rp{item.price}</p>
                                <button class="sm-delete-btn"><img src={close} alt=""/></button>
                            </div>
                            )
                        })  
                    }
                </div>
            </div>
            
            
            <div class="checkout-section">
                <div class="checkout-box">
                    <p class="text">Total Belanja, </p>
                    <h1 class="bill">Rp0</h1>
                    <br/>
                    <select class="shipping-method">
                        <option value="" disabled selected class="option-shipping">Shipping Method</option>
                        <option value="delivery">Diantar</option>
                        <option value="pickup">Ambil di tempat</option>
                    </select>
                    <br/>
                    <a href="rent.html" class="rent-btn">Sewa Sekarang</a>
                    <br/>
                </div>
                  
                <div class="form-container">
                    <form action="">
                        <div class="input-box">
                            <span>mulai sewa</span>
                            <input type="date" name="" id=""/>
                        </div>
                        <div class="input-box">
                            <span>akhir sewa</span>
                            <input type="date" name="" id=""/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="address-section">
            <h2>Alamat Pengiriman</h2>
            <div class="user-info">
                  <p><strong>Nama:</strong> {User.UserName} </p>
                  <p><strong>Email:</strong> {User.Email}</p>
                  <p><strong>No. Telepon:</strong> {User.Phone}</p>
                  <p><strong>Alamat:</strong> {User.Address}</p>
            </div>



        </div>
    </div>
  );
}

export default Cart;
