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
//     const kebaya1 = require('../../images/kebaya1.jpg');
//     const kebaya2 = require('../../images/kebaya2.jpg');
//     const kebaya3 = require('../../images/kebaya3.jpg');
//     const kebaya4 = require('../../images/kebaya4.jpg');
//     const kebaya5 = require('../../images/kebaya5.jpg');
//     const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
//     const Productz = [{"Name":"Kebaya1", "Price": 50000},{"Name":"Kebaya2", "Price": 30000},{"Name":"Kebaya3", "Price": 90000},{"Name":"Kebaya4", "Price": 20000},{"Name":"Kebaya5", "Price": 30000}]
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
      }, [])
      
    

    const [Qty, setQty] = useState(1)
    const [Size, setSize] = useState("s")

//     ===============================================
      const AddToCart = ()=>{
            // console.log("MASOK")
            console.log("ID: ")
            console.log(id)
            console.log("QTY: ")
            console.log(Qty)
            console.log("Size: ")
            console.log(Size)
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
                  })
                  .catch(function (error) {
                        console.log(error);
                  });
      }
      
      const handleChange = event => {
            // console.log(event.target.value);
            setSize(event.target.value);
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
