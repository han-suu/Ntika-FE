import { useEffect } from 'react';
import './catalog.css';
import { useState } from 'react';
import Axios from 'axios';

function Catalog() {
    const arrow = require('../../images/arrow.png');

    const [Products, setProducts] = useState()
    useEffect(() => {
        Axios.get('http://127.0.0.1:8080/v1/products')
        .then(function (response) {
            // console.log(response.data.data)
            setProducts(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [])
    // =================================================
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <section className="product" id="Catalog">
                <h2 className="product-category">Catalog</h2>
                <button className="pre-btn"><img src={arrow} alt=""/></button>
                <button className="nxt-btn"><img src={arrow} alt=""/></button>
                <div className="product-container">
                
                {
                Products?.map((item,index)=>{
                    // console.log(index)
                    return (
                        <div className="product-card">
                            {/* <button onClick={()=>{console.log(Products)}}>LIHAT</button> */}
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <a href={`/detail/${item.id}`}><img src={item.thumbnail} className="product-thum" alt=""/></a>
                                <a href={`/detail/${item.id}`}><button className="card-btn">add to</button></a>
                            </div>
                            <div className="informasi-produk">
                                <h2 className="product-brand">{item.name}</h2>
                                <p className="product-short-des"> a short line about kebaya...</p>
                                <span className="price">Rp{numberWithCommas(item.price)}</span>
                                
                            </div>
                        </div>
                    )
                })
                    
                }
                </div>
        </section>
    );
}

export default Catalog;
