import { useEffect } from 'react';
import './catalog.css';
import { useState } from 'react';
import Axios from 'axios';

function Catalog() {
    const arrow = require('../../images/arrow.png');

    const [Products, setProducts] = useState()
    const [Thumbnail, setThumbnail] = useState([])
    useEffect(() => {
        Axios.get('http://127.0.0.1:8080/v1/products')
        .then(function (response) {
          setProducts(response.data.data)
          response.data.data.map((item,index)=>{
            Axios.get(`http://127.0.0.1:8080/v1/thumbnail/${item.ID}`)
            .then(function (response) {
                setThumbnail(Thumbnail => [...Thumbnail, response.data.data])
            })
            .catch(function (error) {
            console.log(error);
            });
        })
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [])
    // =================================================

    return (
        <section className="product" id="Catalog">
                <h2 className="product-category">Catalog</h2>
                <button className="pre-btn"><img src={arrow} alt=""/></button>
                <button className="nxt-btn"><img src={arrow} alt=""/></button>
                <div className="product-container">
                
                {
                Products?.map((item,index)=>{
                    // console.log(video)
                    return (
                        <div className="product-card">
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <img src={Thumbnail[index]} className="product-thum" alt=""/>
                                <a href="/detail/1"><button className="card-btn">add to</button></a>
                            </div>
                            <div className="informasi-produk">
                                <h2 className="product-brand">{item.Name}</h2>
                                <p className="product-short-des"> a short line about kebaya...</p>
                                <span className="price">{item.Price}</span>
                                
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
