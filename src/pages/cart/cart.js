import './cart.css';
import Navbar from '../../Components/navbar/navbar';
// import { useState } from 'react';
function Cart() {
    // const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    const close = require('../../images/close.png');

    const Cart = [{"Name":"SAKURA KEBAYA", "Price": 50000, "Qty": 1, "Size": "s"},{"Name":"Kebaya2", "Price": 30000, "Qty": 1, "Size": "m"},{"Name":"Kebaya3", "Price": 90000, "Qty": 1, "Size": "s"},{"Name":"Kebaya4", "Price": 20000, "Qty": 1, "Size": "s"},{"Name":"Kebaya5", "Price": 30000, "Qty": 1, "Size": "xl"}]
    // const [first, setfirst] = useState(second)
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
                                {/* <img src={img2} class="sm-product-img" alt=""/> */}
                                <div class="sm-text">
                                    <p class="sm-product-name">{item.Name}</p>
                                    <p class="cart-size-radio-btn">Size : {item.Size.toUpperCase()}</p>
                                </div>
                                <div class="item-counter">
                                    <button class="counter-btn decrement">-</button>
                                    <p class="item-count">1</p>
                                    <button class="counter-btn increment">+</button>
                                </div>
                                <p class="sm-price">Rp50.000</p>
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
                  <p><strong>Nama:</strong> Raniya Putri </p>
                  <p><strong>Email:</strong> rannya@example.com</p>
                  <p><strong>No. Telepon:</strong> 081234567890</p>
                  <p><strong>Alamat:</strong> Jl. Mencasan Indah No. 123, Sleman, Yogyakarta</p>
            </div>



        </div>
    </div>
  );
}

export default Cart;
