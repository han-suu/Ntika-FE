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
    const [StartDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()
    const [Shipping, setShipping] = useState()
    let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
    useEffect(() => {
        let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
        Axios.get('http://127.0.0.1:8080/v1/cart', config)
              .then(function (response) {
                    setCart(response.data.data)
              })
              .catch(function (error) {
                    console.log(error);
              });
        
        Axios.get('http://127.0.0.1:8080/v1/user', config)
            .then(function (response) {
                // console.log(response.data);
                setUser(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    
    // 
    const Sewa = ()=>{
        console.log("SEWA")
        let data ={}
            data.start = StartDate
            data.end = EndDate
            data.address = User.Address
            data.shipping = Shipping
            console.log(data)
    }
    const Ganti = (v)=>{
        console.log(v)
        setShipping(v)
    }
    const DeleteItem = (id)=>{
        Axios.delete(`http://127.0.0.1:8080/v1/cart/${id}`, config)
              .then(function (response) {
                
                Axios.get('http://127.0.0.1:8080/v1/cart', config)
                    .then(function (response) {
                        setCart(response.data.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
              })
              .catch(function (error) {
                    console.log(error);
              });
    }
  return (
    <div className="Cart">
        <Navbar></Navbar>
        <div className="cart-section">
            <div className="product-list">
                <p className="section-heading">keranjang mu</p>
                <div className="cart">
                    {
                        Cart.map((item,index)=>{
                            // console.log(video)
                            return (
                                <div className="sm-product">
                                <img src={item.image} className="sm-product-img" alt=""/>
                                <div className="sm-text">
                                    <p className="sm-product-name">{item.name}</p>
                                    <p className="cart-size-radio-btn">Size : {item.size.toUpperCase()}</p>
                                </div>
                                <div className="item-counter">
                                    {/* <button className="counter-btn decrement">-</button> */}
                                    <p className="item-count">{item.qty}</p>
                                    {/* <button className="counter-btn increment">+</button> */}
                                </div>
                                <p className="sm-price">Rp{item.price}</p>
                                <button className="sm-delete-btn" onClick={()=>{DeleteItem(item.id)}}><img src={close} alt=""/></button>
                            </div>
                            )
                        })  
                    }
                </div>
            </div>
            
            
            <div className="checkout-section">
                <div className="checkout-box">
                    <p className="text">Total Belanja, </p>
                    <h1 className="bill">Rp0</h1>
                    <br/>
                    <select className="shipping-method" defaultValue={"met"} onChange={(e)=>{Ganti(e.target.value)}}>
                        <option value="met" disabled className="option-shipping">Shipping Method</option>
                        <option value="delivery">Diantar</option>
                        <option value="pickup">Ambil di tempat</option>
                    </select>
                    <br/>
                    <span className="rent-btn" onClick={Sewa}>Sewa Sekarang</span>
                    <br/>
                </div>
                  
                <div className="form-container">
                    <form action="">
                        <div className="input-box">
                            <span>mulai sewa</span>
                            <input type="date" name="" id="" onChange={(e)=>{setStartDate(e.target.value)}}/>
                        </div>
                        <div className="input-box">
                            <span>akhir sewa</span>
                            <input type="date" name="" id=""onChange={(e)=>{setEndDate(e.target.value)}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="address-section">
            <h2>Alamat Pengiriman</h2>
            <div className="cart-user-info">
                  <p><strong>Nama:</strong> {User?.UserName} </p>
                  <p><strong>Email:</strong> {User?.Email}</p>
                  <p><strong>No. Telepon:</strong> {User?.Phone}</p>
                  <p><strong>Alamat:</strong> {User?.Address}</p>
            </div>



        </div>
    </div>
  );
}

export default Cart;
