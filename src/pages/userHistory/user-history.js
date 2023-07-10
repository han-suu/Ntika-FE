import './user-history.css';
import Navbar from '../../Components/navbar/navbar';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import UserHistoryOrder from '../../Components/User-History-Order/user-history-order';
const cookies = new Cookies()
function UserHistory() {
  const [Orders, setOrders] = useState([])
  useEffect(() => {
    let token = cookies.get('user')
        let config = {
              headers:{
              Authorization: token,
              }
        };
        Axios.get('http://127.0.0.1:8080/v1/user/order', config)
              .then(function (response) {
                    setOrders(response.data.data)
              })
              .catch(function (error) {
                    console.log(error);
              });
  }, [])
  
  return (
    <div className="user-history">
      <Navbar></Navbar>
      <div className="address-section">
        {
          Orders.map((item,index)=>{
              return (
                <UserHistoryOrder dataOrder = {item}/>
              )
          })  
        }
          
          <a href="/"><button className="submit-btn">Oke</button></a>

      </div>
    </div>
  );
}

export default UserHistory;
