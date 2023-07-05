import './catalog.css';

function Catalog() {
    const kebaya1 = require('../../images/kebaya1.jpg');
    const kebaya2 = require('../../images/kebaya2.jpg');
    const kebaya3 = require('../../images/kebaya3.jpg');
    const kebaya4 = require('../../images/kebaya4.jpg');
    const kebaya5 = require('../../images/kebaya5.jpg');
    const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    const arrow = require('../../images/arrow.png');

    const Products = [{"Name":"Kebaya1", "Price": 50000},{"Name":"Kebaya2", "Price": 30000},{"Name":"Kebaya3", "Price": 90000},{"Name":"Kebaya4", "Price": 20000},{"Name":"Kebaya5", "Price": 30000}]

    return (
        <section class="product" id="Catalog">
                <h2 class="product-category">Catalog</h2>
                <button class="pre-btn"><img src={arrow} alt=""/></button>
                <button class="nxt-btn"><img src={arrow} alt=""/></button>
                <div class="product-container">
                    
                {
                Products.map((item,index)=>{
                    // console.log(video)
                    return (
                        <div class="product-card">
                            <div class="product-image">
                                <span class="tag">rent</span>
                                <img src={kebayas[index]} class="product-thum" alt=""/>
                                <a href="product.html"><button class="card-btn">add to</button></a>
                            </div>
                            <div class="informasi-produk">
                                <h2 class="product-brand">{item.Name}</h2>
                                <p class="product-short-des"> a short line about kebaya...</p>
                                <span class="price">{item.Price}</span>
                                
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
