import './admin-order.css';
import Axios from 'axios';
import { useEffect,useState } from 'react';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
function AdminOrder({ change }) {
    // const [value, setNewValue] = useState();
    const errorimg = require('../../images/error.png');
    const successimg = require('../../images/success.png');
    function handleChange(item) {
        // setNewValue(item);
        change(item);
    }
    const [Orders, setOrders] = useState([])
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

        const getto = ()=>{
            Axios.get('http://127.0.0.1:8080/v1/admin/order', config)
                  .then(function (response) {
                    // console.log(response.data);
                    setOrders(response.data.data)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
          }
        getto()
    },[])


    const proses = (id,status)=>{
      let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
      let data = {}
      Axios.put(`http://127.0.0.1:8080/v1/admin/${status}/${id}`,data, config)
                  .then(function (response) {
                    console.log(response.data);
                    Axios.get('http://127.0.0.1:8080/v1/admin/order', config)
                      .then(function (response) {
                        // console.log(response.data);
                        setOrders(response.data.data)
                        showAlert("Order Berhasil Di ACC",successimg)
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  })
                  .catch(function (error) {
                    showAlert(error.response.data.msg,errorimg)
                  });
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
    }
  const getOrder = (filter)=>{
    Axios.get(`http://127.0.0.1:8080/v1/admin/order?filter=${filter}`, config)
      .then(function (response) {
        console.log(response.data);
        setOrders(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="AdminOrder">
      Order
      {/* <button onClick={()=>{lihat()}}>List</button> */}
      <div className="alert-box">
            <img src={errorimg} className="alert-img" alt=""/>
            <p className="alert-msg">Eror Massage</p>
      </div>
      <div className='filter-wrapper'>
        <button className='filter-button' id='filter-diproses' onClick={()=>{getOrder("")}}>Semua</button>
        <button className='filter-button' id='filter-diproses' onClick={()=>{getOrder("Diproses")}}>Diproses</button>
        <button className='filter-button' id='filter-diterima' onClick={()=>{getOrder("Diterima")}}>Diterima</button>
        <button className='filter-button' id='filter-ditolak' onClick={()=>{getOrder("Ditolak")}}>Ditolak</button>
        <button className='filter-button' id='filter-selesai' onClick={()=>{getOrder("Selesai")}}>Selesai</button>
      </div>
      <div className='lists'>
        {
            Orders.map(item=>{
                
                return (
                    <div className='list-order'>
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.Name}</h1> */}
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.name}</h1> */}
                        <div className='order-item'>
                          <p>ID : {item.id}</p>
                          <p>Address : {item.address}</p>
                          <p>Shipping Method : {item.shipping_method}</p>
                          <p>Total : {item.total}</p>
                          <p>Status : {item.status}</p>
                          <p>Start : {item.start}</p>
                          <p>End : {item.end}</p>
                          <p>Durasi : {item.durasi}</p>
                          <div className='product-lists'>
                          {
                              item.items.map((item,index)=>{
                                  return (
                                      <div className="product-card2">
                                          <div className="product-image2">
                                              <img src={item.image} className="product-thum2" alt=""/>
                                          </div>
                                          <div className="informasi-produk2">
                                              <h2 className="product-brand2">{item.name}</h2>
                                              <p className="product-short-des2"> Size : {item.size}</p>
                                              <p className="product-short-des2"> jumlah Item : {item.qty}</p>
                                          </div>
                                      </div>
                                  )
                              })  
                          }
                          </div>
                          <button onClick={()=>{proses(item.id,"konfirmasi")}}>KONFIRMASI</button>
                          <button onClick={()=>{proses(item.id,"cancel")}}>Cancel</button>
                          <button onClick={()=>{proses(item.id,"finish")}}>Finish</button>
                        </div>
                    </div>
                    
                )
            })
                
        }
        
      </div>
    </div>
  );
}

export default AdminOrder;
