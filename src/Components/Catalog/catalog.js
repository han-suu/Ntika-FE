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
        <section className="product" id="Catalog">
                <h2 className="product-category">Catalog</h2>
                <button className="pre-btn"><img src={arrow} alt=""/></button>
                <button className="nxt-btn"><img src={arrow} alt=""/></button>
                <div className="product-container">
                    
                {
                Products.map((item,index)=>{
                    // console.log(video)
                    return (
                        <div className="product-card">
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <img src={kebayas[index]} className="product-thum" alt=""/>
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
