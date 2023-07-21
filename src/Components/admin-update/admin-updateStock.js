import './admin-updateStock.css';
import { useState,useEffect } from 'react';
import Axios from 'axios';
function AdminUpdateStock({change, dataItem}) {
  const [itemStock, setitemStock] = useState([])

  // NOT EFFECTIVE, FIX THIS USESTATE
  const [SizeS, setSizeS] = useState(0)
  const [SizeM, setSizeM] = useState(0)
  const [SizeL, setSizeL] = useState(0)
  const [SizeXL, setSizeXL] = useState(0)
  useEffect(() => {
    const config = {
        headers:{
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA4NjA0OTYsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.Uz525EdefJt4Ehj-uRKkUP7wJh3x1JZDWCmJDlMRub8",
        }
      }

    const getto = ()=>{
        console.log(dataItem)
        Axios.get(`http://127.0.0.1:8080/v1/item_stock/${dataItem.id}`, config)
              .then(function (response) {
                setitemStock(response.data.data)
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
    // NOT EFFECTIVE, CHANGE LATER(?)
    const mengInputS = (e)=>{
        if (e.target.value<0) {
          setSizeS(0)
        }else{
          setSizeS(e.target.value)
        }
        
        // console.log(input)
    }
    const mengInputM = (e)=>{
      if (e.target.value<0) {
        setSizeM(0)
      }else{
        setSizeM(e.target.value)
      }
        
        // console.log(input)
    }
    const mengInputL = (e)=>{
      if (e.target.value<0) {
        setSizeL(0)
      }else{
        setSizeL(e.target.value)
      }
        
        // console.log(input)
    }
    const mengInputXL = (e)=>{
      if (e.target.value<0) {
        setSizeXL(0)
      }else{
        setSizeXL(e.target.value)
      }
        
        // console.log(input)
    }

  const mengSubmit = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
    const sizes = [SizeS, SizeM, SizeL, SizeXL];
    // Axios.post('http://127.0.0.1:8080/v1/tag', {
    //     Tag: input
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    
    // setInput("")

    // again.. not eff, should change this myb 
    const config = {
      headers:{
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA4NjA0OTYsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.Uz525EdefJt4Ehj-uRKkUP7wJh3x1JZDWCmJDlMRub8",
      }
    }
    for (let i = 1; i < 5; i++) {
      if (sizes[i-1] === 0) { continue; }
      Axios.post('http://127.0.0.1:8080/v1/update-stock', {
        product_id: dataItem.id,
        size_id : i,
        stock: parseInt(sizes[i-1])
      },config)
      .then(function (response) {
        console.log(response);
        Axios.get(`http://127.0.0.1:8080/v1/item_stock/${dataItem.id}`, config)
              .then(function (response) {
                setitemStock(response.data.data)
              })
              .catch(function (error) {
                console.log(error);
              });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    
      setSizeS(0)
      setSizeM(0)
      setSizeL(0)
      setSizeXL(0)
    }

  return (
    <div className="AdminUpdateStock">
      
      <h1>{dataItem.name}</h1>
      {/* <p>{dataItem.description}</p> */}
      {/* INI PEMANGGILAN MAKE INDEX INI MUNGKIN MASIH RAWAN SALAH */}
      {/* <p>Stock S : {itemStock[0]?.Stock}</p>
      <p>Stock M : {itemStock[1]?.Stock}</p>
      <p>Stock L : {itemStock[2]?.Stock}</p>
      <p>Stock XL : {itemStock[3]?.Stock}</p> */}
      
      <form onSubmit={mengSubmit}>
        <h3>TAMBAH STOCK SIZE</h3>

        <h4>Size S</h4>
        <p>Stock : {itemStock[0]?.Stock}</p>
        <input value={SizeS} type="number" placeholder='0' onChange={mengInputS}/>

        <h4>Size M</h4>
        <p>Stock M : {itemStock[1]?.Stock}</p>
        <input value={SizeM} type="number" placeholder='0' onChange={mengInputM}/>

        <h4>Size L</h4>
        <p>Stock L : {itemStock[2]?.Stock}</p>
        <input value={SizeL} type="number" placeholder='0' onChange={mengInputL}/>

        <h4>Size XL</h4>
        <p>Stock XL : {itemStock[3]?.Stock}</p>
        <input value={SizeXL} type="number" placeholder='0' onChange={mengInputXL}/>

        <br/>
        <button className='tombol' type='submit'>ADD</button>
      </form>
      
      <button className='tombol back' onClick={()=>{handleChange()}}>Back To List</button>
    </div>
  );
}

export default AdminUpdateStock;
