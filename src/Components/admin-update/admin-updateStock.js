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
        Axios.get(`http://127.0.0.1:8080/v1/item_stock/${dataItem.ID}`, config)
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
        setSizeS(e.target.value)
        // console.log(input)
    }
    const mengInputM = (e)=>{
        setSizeM(e.target.value)
        // console.log(input)
    }
    const mengInputL = (e)=>{
        setSizeL(e.target.value)
        // console.log(input)
    }
    const mengInputXL = (e)=>{
        setSizeXL(e.target.value)
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
        product_id: dataItem.ID,
        size_id : i,
        stock: parseInt(sizes[i-1])
      },config)
      .then(function (response) {
        console.log(response);
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
      UpdateStock
      <h1>{dataItem.Name}</h1>
      <p>{dataItem.Description}</p>
      {/* INI PEMANGGILAN MAKE INDEX INI MUNGKIN MASIH RAWAN SALAH */}
      <p>Stock S : {itemStock[0]?.Stock}</p>
      <p>Stock M : {itemStock[1]?.Stock}</p>
      <p>Stock L : {itemStock[2]?.Stock}</p>
      <p>Stock XL : {itemStock[3]?.Stock}</p>
      
      <form onSubmit={mengSubmit}>
        <h3>TAMBAH SIZE</h3>
        <h4>Size S</h4>
        <input type="number" placeholder='0' onChange={mengInputS}/>
        <h4>Size M</h4>
        <input type="number" placeholder='0' onChange={mengInputM}/>
        <h4>Size L</h4>
        <input type="number" placeholder='0' onChange={mengInputL}/>
        <h4>Size XL</h4>
        <input type="number" placeholder='0' onChange={mengInputXL}/>
        <br/>
        <button type='submit'>ADD</button>
      </form>
      
      <button onClick={()=>{handleChange()}}>Back To List</button>
    </div>
  );
}

export default AdminUpdateStock;
