import './admin-ongkir.css';
import { useState,useEffect } from 'react';
import Axios from 'axios';
function AdminOngkir({change, dataItem}) {
  const [itemStock, setitemStock] = useState([])

  // NOT EFFECTIVE, FIX THIS USESTATE
  const [Ongkir, setOngkir] = useState(0)
  const [OngkirNew, setOngkirNew] = useState(0)
  
  useEffect(() => {
    const config = {
        headers:{
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA4NjA0OTYsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.Uz525EdefJt4Ehj-uRKkUP7wJh3x1JZDWCmJDlMRub8",
        }
      }

    const getto = ()=>{
        console.log(dataItem)
        Axios.get(`http://127.0.0.1:8080/v1/ongkir`, config)
              .then(function (response) {
                setOngkir(response.data.data.Ongkir)
              })
              .catch(function (error) {
                console.log(error);
              });
      }
    getto()
  },[])

  function handleChange() {
    change();
  }
  const mengInputOngkir = (e)=>{
    if (e.target.value <0) {
      setOngkirNew(0)
    }else{
      setOngkirNew(e.target.value)
    }
      
  }
  const mengSubmit = (e)=>{
    e.preventDefault()
    const config = {
      headers:{
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA4NjA0OTYsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.Uz525EdefJt4Ehj-uRKkUP7wJh3x1JZDWCmJDlMRub8",
      }
    }
    Axios.put(`http://127.0.0.1:8080/v1/admin/ongkir/${OngkirNew}`,{},config)
    .then(function (response) {
      setOngkir(response.data.data.Ongkir)
    })
    .catch(function (error) {
      console.log(error);
    });
    
    setOngkirNew(0)
    }

  return (
    <div className="AdminOngkir">
      <form onSubmit={mengSubmit}>
        <h2>Update Ongkir</h2>
        <h4 className='now'>Ongkir Sekarang : {Ongkir}</h4>
        <h4>Ganti ongkir menjadi</h4>
        <input value={OngkirNew} type="number" placeholder='0' onChange={mengInputOngkir}/>
        <br/>
        <button className='btn' type='submit'>Ganti Ongkir</button>
      </form>
      
      {/* <button className='btn back' onClick={()=>{handleChange()}}>Back To List</button> */}
    </div>
  );
}

export default AdminOngkir;
