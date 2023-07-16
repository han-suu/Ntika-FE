import './detail.css';
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/navbar/navbar';
// import Catalog from '../../Components/Catalog/catalog';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
const cookies = new Cookies()
function Detail() {
      const { id } = useParams()
      const errorimg = require('../../images/error.png');
      const successimg = require('../../images/success.png');

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

      const [Products, setProducts] = useState()
      const [Images, setImages] = useState([])
      useEffect(() => {
            // console.log(id)
            Axios.get(`http://127.0.0.1:8080/v1/product/${id}`)
                  .then(function (response) {
                  // console.log(response.data.data)
                  setProducts(response.data.data)
                  setImages(response.data.data.images)
                  //   response.data.data.map((item,index)=>{
                  //     Axios.get(`http://127.0.0.1:8080/v1/thumbnail/${item.ID}`)
                  //     .then(function (response) {
                  //         setThumbnail(Thumbnail => [...Thumbnail, response.data.data])
                  //     })
                  //     .catch(function (error) {
                  //     console.log(error);
                  //     });
                  // })
                  const productImageSlide = document.querySelector(".image-slider");
                  productImageSlide.style.backgroundImage = `url('${response.data.data.images[0].Based}')`
                  })
                  .catch(function (error) {
                  console.log(error);
                  });
            Axios.get(`http://127.0.0.1:8080/v1/item_stock/${id}`)
                  .then(function (response) {
                        // console.log(response.data)
                        setStock(response.data.data)
                        setStockNow(response.data.data[0])
                  })
                  .catch(function (error) {
                  console.log(error);
                  });
      }, [])
      
    

    const [Qty, setQty] = useState(1)
    const [Size, setSize] = useState("s")
    const [Stock, setStock] = useState([])
    const [StockNow, setStockNow] = useState()

//     ===============================================
      const AddToCart = ()=>{
            // console.log("MASOK")
            
            if(Qty>StockNow.Stock){
                  showAlert("Stock Tidak Mencukupi",errorimg)
            }else{
                  let data ={
                        "product_id":parseInt(id),
                        "qty":Qty,
                        "size":Size
                    }
                  let token = cookies.get('user')
                  let config = {
                        headers:{
                        Authorization: token,
                        }
                  };
                  Axios.post('http://127.0.0.1:8080/v1/cart', data, config)
                        .then(function (response) {
                              // console.log(response.data);
                              console.log(response.data)
                              showAlert("Item berhasil dimasukkan ke keranjang",successimg)
                        })
                        .catch(function (error) {
                              console.log(error);
                        });
            }
            
      }
      
      const handleChange = event => {
            // console.log(event.target.value);
            setSize(event.target.value);
            if (event.target.value==="s") {
                  setStockNow(Stock[0])
            }else if(event.target.value==="m"){
                  setStockNow(Stock[1])
            }else if(event.target.value==="l"){
                  setStockNow(Stock[2])
            }else if(event.target.value==="xl"){
                  setStockNow(Stock[3])
            }else{
                  setStockNow(999)
            }
      };
      const handleClick = event =>{
            const sizeBtn = document.querySelector(`.${Size}-radio`);
            sizeBtn.classList.remove('check');
            event.currentTarget.classList.add('check')
      }
      const handleClickImage = (event,x) =>{
            const img = document.querySelector(`.gambar`);
            img.classList.remove('active');
            event.currentTarget.classList.add('active')
            const productImageSlide = document.querySelector(".image-slider");
            productImageSlide.style.backgroundImage = `url('${Images[x].Based}')`
      }
      const minus = () =>{
            if (Qty<2) {
                  return
            }
            setQty(Qty-1)
      }
      const plus = () =>{
            setQty(Qty+1)
      }
    return (
        <div className="Detail">
            <div className="alert-box">
                  <img src={errorimg} className="alert-img" alt=""/>
                  <p className="alert-msg">Eror Massage</p>
            </div>
            {/* {console.log(id)} */}
            <Navbar></Navbar>
            <section className="product-details">
            {/* <div className="image-slider" style={{backgroundImage: `url(${kebayas[id-1]})`}}>
                  
            </div> */}
            <div className="image-slider">
                  <div className="product-images">
                        <img src={Images[0]?.Based} className="gambar active" alt="" onClick={(e) => {handleClickImage(e, 0)}}/>
                        <img src={Images[1]?.Based} className="gambar"alt="" onClick={(e) => {handleClickImage(e, 1)}}/>
                        <img src={Images[2]?.Based} className="gambar"alt="" onClick={(e) => {handleClickImage(e, 2)}}/>
                        <img src={Images[3]?.Based} className="gambar"alt="" onClick={(e) => {handleClickImage(e, 3)}}/>
                  </div>
            </div>
            <div className="details">
                  <h2 className="product-brand">{Products?.name}</h2>
                  <p className="product-short-des">{Products?.description}</p>
                  <span className="product-price">Rp{Products?.price}</span>

                  <p className="product-sub-heading">select size</p>

                  <input type="radio" name="size" value="s" checked={Size === 's'} onChange={handleChange} hidden id="s-size"/>
                  <label htmlFor='s-size' className="s-radio size-radio-btn check" onClick={handleClick}>s</label>

                  <input type="radio" name="size" value="m" checked={Size === 'm'} onChange={handleChange} hidden id="m-size"/>
                  <label htmlFor='m-size' className="m-radio size-radio-btn" onClick={handleClick}>m</label>

                  <input type="radio" name="size" value="l" checked={Size === 'l'} onChange={handleChange} hidden id="l-size"/>
                  <label htmlFor='l-size' className="l-radio size-radio-btn" onClick={handleClick}>l</label>

                  <input type="radio" name="size" value="xl"checked={Size === 'xl'} onChange={handleChange} hidden id="xl-size"/>
                  <label htmlFor='xl-size' className="xl-radio size-radio-btn" onClick={handleClick}>xl</label>

                  <br/>
                  <h2>Stock : {StockNow?.Stock}</h2>
                  <div className="qtycal">
                        
                        <div className="wrapper">
                              <span className="minus" onClick={minus}>-</span>
                              <span className="num">{Qty}</span>
                              <span className="plus" onClick={plus}>+</span>
                        </div>
                        
                        {/* <div className="form-container">
                              <form action="">
                                    <div className="input-box">
                                          <span>mulai sewa</span>
                                          <input type="date" name="" id=""/>
                                    </div>
                                    <div className="input-box">
                                          <span>akhir sewa</span>
                                          <input type="date" name="" id=""/>
                                    </div>
                              </form>
                        </div> */}
                  </div>
                  <br/>
                  <button className="btn1 cart-btn" onClick={()=>{AddToCart()}}>add to cart</button>
            </div>
      </section>

      
        </div>
    );
}

export default Detail;
