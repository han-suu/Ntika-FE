import './user-history.css';
import Navbar from '../../Components/navbar/navbar';
function UserHistory() {
  const logo5 = require('../../images/logo5.png');
  const kebaya1 = require('../../images/kebaya1.jpg');
  const kebaya2 = require('../../images/kebaya2.jpg');
  const kebaya4 = require('../../images/kebaya4.jpg');
  return (
    <div className="user-history">
      <Navbar></Navbar>
      <div class="address-section">
          <div class="user-info">
              <img src={logo5} class="logo-profile" alt=""/>
              <p><strong>Tanggal Sewa:</strong> 17/03/2023 - 22/03/2023 </p>
              <p><strong>Shipping Method:</strong> Diantar </p>
              <p><strong>Total:</strong> 350.000</p>
              <p><strong>Status:</strong> Sedang diProses </p>
              <div class="product-container2">
                <div class="product-card2">
                  <div class="product-image2">
                    <img src={kebaya1} class="product-thum2" alt=""/>
                  </div>
                  <div class="informasi-produk2">
                    <h2 class="product-brand2">Ashella Kebaya</h2>
                    <p class="product-short-des2"> Size : M</p>
                    <p class="product-short-des2"> jumlah Item : 3</p>
                  </div>
                </div>
                <div class="product-card2">
                  <div class="product-image2">
                    <img src={kebaya2} class="product-thum2" alt=""/>
                  </div>
                  <div class="informasi-produk2">
                    <h2 class="product-brand2">Ashella Kebaya</h2>
                    <p class="product-short-des2"> Size : M</p>
                    <p class="product-short-des2"> jumlah Item : 3</p>
                  </div>
                </div>
                <div class="product-card2">
                  <div class="product-image2">
                    <img src={kebaya4} class="product-thum2" alt=""/>
                  </div>
                  <div class="informasi-produk2">
                    <h2 class="product-brand2">Ashella Kebaya</h2>
                    <p class="product-short-des2"> Size : M</p>
                    <p class="product-short-des2"> jumlah Item : 3</p>
                  </div>
                </div>
              </div>
          </div>
          <a href="index.html"><button class="submit-btn">Oke</button></a>

      </div>
    </div>
  );
}

export default UserHistory;
