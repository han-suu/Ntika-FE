import './detail.css';
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/navbar/navbar';
import Catalog from '../../Components/Catalog/catalog';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

function Detail() {
    const kebaya1 = require('../../images/kebaya1.jpg');
    const kebaya2 = require('../../images/kebaya2.jpg');
    const kebaya3 = require('../../images/kebaya3.jpg');
    const kebaya4 = require('../../images/kebaya4.jpg');
    const kebaya5 = require('../../images/kebaya5.jpg');
    const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    const Productz = [{"Name":"Kebaya1", "Price": 50000},{"Name":"Kebaya2", "Price": 30000},{"Name":"Kebaya3", "Price": 90000},{"Name":"Kebaya4", "Price": 20000},{"Name":"Kebaya5", "Price": 30000}]
      const [Products, setProducts] = useState()
      useEffect(() => {
            Axios.get('http://127.0.0.1:8080/v1/products')
                  .then(function (response) {
                  console.log(response.data.data)
                  setProducts(response.data.data)
                  //   response.data.data.map((item,index)=>{
                  //     Axios.get(`http://127.0.0.1:8080/v1/thumbnail/${item.ID}`)
                  //     .then(function (response) {
                  //         setThumbnail(Thumbnail => [...Thumbnail, response.data.data])
                  //     })
                  //     .catch(function (error) {
                  //     console.log(error);
                  //     });
                  // })
                  })
                  .catch(function (error) {
                  console.log(error);
                  });
      }, [])
      
    const { id } = useParams()

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
            <div className="image-slider" style={{backgroundImage: `url(${kebayas[id-1]})`}}>
                  
            </div>
            <div className="details">
                  <h2 className="product-brand">{Productz[id-1].name}</h2>
                  
                  <span className="product-price">Rp{Productz[id-1].price}</span>

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

      
      <section className="detail-des">
            <h2 className="heading">description</h2>
            <p className="des">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur earum quia
                  consectetur aperiam porro hic perferendis perspiciatis repellendus dolor, labore natus placeat
                  voluptatum ad numquam reprehenderit ducimus aut laborum ipsam! Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Harum repudiandae quibusdam atque maiores asperiores rerum neque dolores facilis,
                  temporibus, corrupti quam quaerat repellendus eveniet exercitationem ratione quod est cupiditate rem!
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, nobis ad aspernatur unde consequatur
                  neque harum quas rem distinctio aperiam sit itaque facilis asperiores. Mollitia nostrum sapiente
                  tempore fugiat pariatur!</p>
      </section>

      <Catalog></Catalog>
        </div>
    );
}

export default Detail;
