import { useEffect, useState } from 'react';
import './recommended.css';
import Axios from 'axios';
function Recommended() {
    const kebaya1 = require('../../images/kebaya1.jpg');
    // const kebaya2 = require('../../images/kebaya2.jpg');
    // const kebaya3 = require('../../images/kebaya3.jpg');
    // const kebaya4 = require('../../images/kebaya4.jpg');
    // const kebaya5 = require('../../images/kebaya5.jpg');
    // const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    // const arrow = require('../../images/arrow.png');

    // const Products = [{"Name":"Kebaya1", "Price": 50000},{"Name":"Kebaya2", "Price": 30000},{"Name":"Kebaya3", "Price": 90000},{"Name":"Kebaya4", "Price": 20000},{"Name":"Kebaya5", "Price": 30000}]

    const [Content, setContent] = useState([])
    const [Best, setBest] = useState([])
    const [NewArr, setNewArr] = useState([])
    const [All, setAll] = useState([])
    const [Fil, setFil] = useState("a")
    useEffect(() => {
        Axios.get('http://127.0.0.1:8080/v1/best')
        .then(function (response) {
            setBest(response.data.best)
            
        })
        .catch(function (error) {
          console.log(error);
        });
        Axios.get('http://127.0.0.1:8080/v1/newarr')
        .then(function (response) {
            setNewArr(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        Axios.get('http://127.0.0.1:8080/v1/recommended')
        .then(function (response) {
            setContent(response.data.data)
            setAll(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }, [])
    const handleClickFilter = (event) =>{
        const img = document.querySelector(`.fil${Fil}`);
        img.classList.remove('active-filter-btn');
        event.currentTarget.classList.add('active-filter-btn')
        // const productImageSlide = document.querySelector(".image-slider");
        // productImageSlide.style.backgroundImage = `url('${Images[x].Based}')`
  }
    const showBest = (e)=>{
        handleClickFilter(e)
        setContent(Best)
        setFil("b")
    }
    const showNewArr = (e)=>{
        handleClickFilter(e)
        setContent(NewArr)
        setFil("n")
    }
    const showAll = (e)=>{
        handleClickFilter(e)
        setContent(All)
        setFil("a")
    }
  return (
    <div className="Recommended">
      <section id="collection" className="py-5">
    <div className="container">
        <div className="title">
            <h2 className="position-relative d-inline-block">New Collection</h2>
        </div>
        <div className="row g-0">
                <div className="filter-button-group">
                    <button type="button" className="fila btn m-2 text-light active-filter-btn" data-filter="*" onClick={(e)=>{showAll(e)}}>All</button>
                    <button type="button" className="filb btn m-2 text-light" data-filter=".best" onClick={(e)=>{showBest(e)}}>Best Sellers</button>
                    <button type="button" className="filn btn m-2 text-light" data-filter=".new" onClick={(e)=>{showNewArr(e)}}>New Arrival</button>
                </div>

                <div className="product-container1">
                    {
                    Content?.map((item,index)=>{
                        // console.log(index)
                        return (
                            <div className="product-card best">
                                <div className="product-image">
                                    <span className="tag">rent</span>
                                    <a href={`/detail/${item.id}`}><img src={item.thumbnail} className="product-thum" alt=""/></a>
                                    <a href={`/detail/${item.id}`}><button className="card-btn">add to</button></a>
                                </div>
                                <div className="informasi-produk">
                                    <h2 className="product-brand">{item.name}</h2>
                                    <p className="product-short-des"> a short line about kebaya...</p>
                                    <span className="price">Rp{item.price}</span>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                
        </div>
    </div>
    <br/>
</section>
    </div>
  );
}

export default Recommended;

{/* <div className="product-card new">
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <img src={kebaya2} className="product-thum" alt=""/>
                                <a href="product.html"><button className="card-btn">add to</button></a>
                            </div>
                            <div className="informasi-produk">
                                <h2 className="product-brand">Lavender Kebaya</h2>
                                <p className="product-short-des"> a short line about kebaya...</p>
                                <span className="price">Rp50.000</span>
                                
                            </div>
                    </div>
                    <div className="product-card best">
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <img src={kebaya3} className="product-thum" alt=""/>
                                <a href="product.html"><button className="card-btn">add to</button></a>
                            </div>
                            <div className="informasi-produk">
                                <h2 className="product-brand">Loona Kebaya</h2>
                                <p className="product-short-des"> a short line about kebaya...</p>
                                <span className="price">Rp50.000</span>
                               
                            </div>
                    </div> */}