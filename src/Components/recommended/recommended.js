import './recommended.css';

function Recommended() {
    const kebaya1 = require('../../images/kebaya1.jpg');
    const kebaya2 = require('../../images/kebaya2.jpg');
    const kebaya3 = require('../../images/kebaya3.jpg');
    const kebaya4 = require('../../images/kebaya4.jpg');
    const kebaya5 = require('../../images/kebaya5.jpg');
    const kebayas = [kebaya1,kebaya2,kebaya3,kebaya4,kebaya5]
    const arrow = require('../../images/arrow.png');

    const Products = [{"Name":"Kebaya1", "Price": 50000},{"Name":"Kebaya2", "Price": 30000},{"Name":"Kebaya3", "Price": 90000},{"Name":"Kebaya4", "Price": 20000},{"Name":"Kebaya5", "Price": 30000}]
  return (
    <div className="Recommended">
      <section id="collection" className="py-5">
    <div className="container">
        <div className="title">
            <h2 className="position-relative d-inline-block">New Collection</h2>
        </div>
        <div className="row g-0">
                <div className="filter-button-group">
                    <button type="button" className="btn m-2 text-light active-filter-btn" data-filter="*">All</button>
                    <button type="button" className="btn m-2 text-light" data-filter=".best">Best Sellers</button>
                    <button type="button" className="btn m-2 text-light" data-filter=".new">New Arrival</button>
                </div>

                <div className="product-container1">
                    <div className="product-card best">
                            <div className="product-image">
                                <span className="tag">rent</span>
                                <img src={kebaya1} className="product-thum" alt=""/>
                                <a href="product.html"><button className="card-btn">add to</button></a>
                            </div>
                            <div className="informasi-produk">
                                <h2 className="product-brand">Sakura Kebaya</h2>
                                <p className="product-short-des"> a short line about kebaya...</p>
                                <span className="price">Rp50.000</span>
                            </div>
                    </div>
                    <div className="product-card new">
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
                    </div>

                </div>
                
        </div>
    </div>
    <br/>
</section>
    </div>
  );
}

export default Recommended;