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
    const [Now, setNow] = useState("Semua")
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
  const getOrder = (e,filter)=>{
    Axios.get(`http://127.0.0.1:8080/v1/admin/order?filter=${filter}`, config)
      .then(function (response) {
        console.log(response.data);
        setOrders(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      let act = document.querySelector(`#filter-${Now}`);
      console.log(act)
      act.classList.remove(`fil-active`);
      e.currentTarget.classList.add('fil-active')
      if (filter ==="") {
        setNow("Semua")  
      }else{
        setNow(filter)
      }
      
  }
  const showButtons = (status, id)=>{
    if(status === "Diproses"){
      return(
        <div>
          <button className='btn-stat' onClick={()=>{proses(id,"konfirmasi")}}>KONFIRMASI</button>
          <button className='btn-stat' onClick={()=>{proses(id,"cancel")}}>Cancel</button>
        </div>
      )
    }else if (status === "Diterima") {
      return(
        <button className='btn-stat' onClick={()=>{proses(id,"finish")}}>Finish</button>
      )
    }{

    }
  }
  return (
    <div className="AdminOrder">
      
      {/* <button onClick={()=>{lihat()}}>List</button> */}
      <div className="alert-box">
            <img src={errorimg} className="alert-img" alt=""/>
            <p className="alert-msg">Eror Massage</p>
      </div>
      <div className='filter-wrapper'>
        <button className='filter-button fil-active' id='filter-Semua' onClick={(e)=>{getOrder(e,"")}}>Semua</button>
        <button className='filter-button' id='filter-Diproses' onClick={(e)=>{getOrder(e,"Diproses")}}>Diproses</button>
        <button className='filter-button' id='filter-Diterima' onClick={(e)=>{getOrder(e,"Diterima")}}>Diterima</button>
        <button className='filter-button' id='filter-Ditolak' onClick={(e)=>{getOrder(e,"Ditolak")}}>Ditolak</button>
        <button className='filter-button' id='filter-Selesai' onClick={(e)=>{getOrder(e,"Selesai")}}>Selesai</button>
      </div>
      <div className='lists'>
        {
            Orders.map(item=>{
              let stat
              if (item.status === 'Ditolak') {
                stat = 'tolak'                
              }else if (item.status === 'Diproses'){
                stat = 'proses'
              }else if (item.status === 'Diterima'){
                stat = 'acc'
              }else if (item.status === 'Selesai'){
                stat = 'finish'
              }else{
                stat = 'huh'
              }
                
                return (
                    <div className='list-order'>
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.Name}</h1> */}
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.name}</h1> */}
                        <div className='order-item'>
                          <p>ID : {item.id}</p>
                          <p>Address : {item.address}</p>
                          <p>Shipping Method : {item.shipping_method}</p>
                          <p>Total : {item.total}</p>
                          <p className={stat}>Status : {item.status}</p>
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
                          {showButtons(item.status, item.id)}
                          {/* <button onClick={()=>{proses(item.id,"konfirmasi")}}>KONFIRMASI</button>
                          <button onClick={()=>{proses(item.id,"cancel")}}>Cancel</button>
                          <button onClick={()=>{proses(item.id,"finish")}}>Finish</button> */}
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
