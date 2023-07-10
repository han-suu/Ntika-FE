import './cart.css';
import Navbar from '../../Components/navbar/navbar';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useState } from 'react';
const cookies = new Cookies()
// import { useState } from 'react';
function Cart() {
    var someDate = new Date();
    var numberOfDaysToAdd = 1;
    var defaultValueStart = new Date(someDate).toISOString().split("T")[0];
    var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var defaultValueEnd = new Date(date).toISOString().split("T")[0];
    const close = require('../../images/close.png');

    
    const [Cart, setCart] = useState([])
    const [User, setUser] = useState()
    const [StartDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()
    const [Shipping, setShipping] = useState()
    const [SubTotal, setSubTotal] = useState(0)
    const [Total, setTotal] = useState(0)
    const [ShippingFee, setShippingFee] = useState(0)
    const [Durasi, setDurasi] = useState(1)
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // let subTotal = 0
    // let totalPrice = 0
    // let shippingPrice = 0
    // let totalPriceString 
    // const hitungTotal = (durasi)=>{
    //     if(Shipping==="delivery"){
    //         shippingPrice = 15000
    //     }
    //     Cart.map((item,index)=>{
    //         subTotal += item.qty*item.price
    //     })
    //     subTotal = subTotal * durasi
    //     totalPrice= subTotal+shippingPrice
    //     // totalPriceString = numberWithCommas(totalPrice)
    // }
    let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
    useEffect(() => {
        setStartDate(defaultValueStart)
        setEndDate(defaultValueEnd)
        let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
        Axios.get('http://127.0.0.1:8080/v1/cart', config)
              .then(function (response) {
                    setCart(response.data.data)

                    let subTotal = 0
                    response.data.data.map((item,index)=>{
                        subTotal += item.qty*item.price
                    })
                    setSubTotal(subTotal)
                    setTotal(subTotal)
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
    const hitungSub=(x)=>{
        let subTotal = 0
        Cart.map((item,index)=>{
            subTotal += item.qty*item.price
        })
        subTotal = subTotal * x
        setSubTotal(subTotal)
    }
    const hitungTotal=()=>{
        let total_price = SubTotal + ShippingFee
        setTotal(total_price)
    }
    const Sewa = ()=>{
        console.log("SEWA")
        // console.log(Cart)
        // console.log("Sub Total : ", subTotal)
        // console.log("shipping Price : ", shippingPrice)
        // console.log("Total Price : ", totalPrice)
        if(StartDate===undefined || EndDate===undefined || Shipping===undefined){
            console.log("ADA FIELD YANG KURANG")
            return
        }

        if(EndDate<=StartDate){
            console.log("Minimal menyewa 1 hari")
            return
        }else{
            console.log("OKAI")
        }
        let data ={}
            
            data.durasi = Durasi
            // hitungTotal(diffDays)
            data.sub_total = SubTotal
            data.total_price = Total
            data.shipping_method = Shipping
            data.shipping_fee = ShippingFee
            data.address = User.Address
            data.start_date = StartDate
            data.end_date = EndDate
            
            

        console.log(data)
        let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
        Axios.post('http://127.0.0.1:8080/v1/order',data, config)
              .then(function (response) {
                    console.log(response.data)
              })
              .catch(function (error) {
                    console.log(error);
              });
              window.location.href = '/userHis';

    }
    useEffect(() => {
        const date1 = new Date(StartDate);
        const date2 = new Date(EndDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setDurasi(diffDays)
    }, [StartDate,EndDate])

    useEffect(() => {
        hitungSub(Durasi)
    }, [Durasi])
    useEffect(() => {
        hitungTotal()
    }, [ShippingFee,SubTotal])
    
    const Ganti = (v)=>{
        if (v==="delivery") {
            setShippingFee(15000)
        }else{
            setShippingFee(0)
        }
        setShipping(v)
    }
    const GantiDate = (v)=>{
        console.log("GANTI")
        if (v<=StartDate){
            console.log("MASUK")
            setStartDate(defaultValueStart)
            setEndDate(defaultValueEnd)
        }else{
            setEndDate(v)
        }
    }
    const GantiDateS = (v)=>{
        console.log("GANTIS")
        if (v>=EndDate){
            console.log("MASUKS")
            setStartDate(defaultValueStart)
            setEndDate(defaultValueEnd)
        }else{
            setStartDate(v)
        }
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
            {/* <button onClick={()=>{console.log(StartDate); console.log(EndDate);console.log(Durasi);console.log(SubTotal);console.log(Total)}}>LIHAT</button> */}
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
                    <h1 className="bill">Rp{Total}</h1>
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
                            <input type="date" name="" id="" value={StartDate} defaultValue={StartDate} onChange={(e)=>{GantiDateS(e.target.value)}}/>
                        </div>
                        <div className="input-box">
                            <span>akhir sewa</span>
                            <input type="date" name="" id="" value={EndDate} defaultValue={EndDate} onChange={(e)=>{GantiDate(e.target.value)}}/>
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
