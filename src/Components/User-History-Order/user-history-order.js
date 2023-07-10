import { useEffect } from 'react';
import { useState } from 'react';

function UserHistoryOrder(props) {
  const logo5 = require('../../images/logo5.png');
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const [Order, setOrder] = useState()

  useEffect(() => {
    setOrder(props.dataOrder)
  }, [])
  
  return (
    <div className="user-history-order">
      <div className="address-section">
          <div className="user-info">
              <img src={logo5} className="logo-profile" alt=""/>
              <p><strong>Tanggal Sewa:</strong> {Order?.start} - {Order?.end} </p>
              <p><strong>Shipping Method:</strong> {Order?.shipping_method} </p>
              <p><strong>Total:</strong> {numberWithCommas(Order?.total)}</p>
              <p><strong>Status:</strong> {Order?.status} </p>
              
              <div className="product-container2">
                {
                    Order?.items.map((item,index)=>{
                        return (
                            <div className="product-card2">
                                <div className="product-image2">
                                    <img src={item.image} className="product-thum2" alt=""/>
                                </div>
                                <div className="informasi-produk2">
                                    <h2 className="product-brand2">{item.name}</h2>
                                    <p className="product-short-des2"> Size : {item.size}</p>
                                    <p className="product-short-des2"> jumlah Item : {item.qty}</p>
                                </div>
                            </div>
                        )
                    })  
                }
                
              </div>
          </div>
      </div>
    </div>
  );
}

export default UserHistoryOrder;
