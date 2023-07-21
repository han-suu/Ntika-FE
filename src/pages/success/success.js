import "./success.css"
const Success = ()=>{
    const successimg = require('../../images/success.png');
    return(
        <div className="success-order">
            <div class="popup">
                <h2>Pesanan Berhasil!</h2>
                <img src={successimg} alt="" />
                <p>Pesanan telah di buat. Silahkan tunggu konfirmasi Admin</p>
                <a href="/" class="btn">Oke</a>
            </div>
        </div>
    )
}
export default Success