import './admin-order.css';
import Axios from 'axios';
import { useEffect,useState } from 'react';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
function AdminOrder({ change }) {
    // const [value, setNewValue] = useState();

    function handleChange(item) {
        // setNewValue(item);
        change(item);
    }
    const [Orders, setOrders] = useState([])
    
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
    <div className="AdminProduct">
      Order
      {/* <button onClick={()=>{lihat()}}>List</button> */}
      <div className='lists'>
        {
            Orders.map(item=>{
                
                return (
                    <div className='list-order'>
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.Name}</h1> */}
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.name}</h1> */}
                        <div className='order-item'>
                          <p>ID : {item.ID}</p>
                          <p>Address : {item.Address}</p>
                          <p>Shipping Method : {item.Shipping_Method}</p>
                          <p>Total : {item.Total_Price}</p>
                          <p>Status : {item.Status}</p>
                          <p>Start : {item.StartDate}</p>
                          <p>End : {item.EndDate}</p>
                          <p>Durasi : {item.Durasi}</p>
                          <button onClick={()=>{proses(item.ID,"konfirmasi")}}>KONFIRMASI</button>
                          <button onClick={()=>{proses(item.ID,"cancel")}}>Cancel</button>
                          <button onClick={()=>{proses(item.ID,"finish")}}>Finish</button>
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
