import './footer.css';
const Footer = ()=>{
    const logo5 = require('../../images/logo5.png');
    return (
        <div className="Footer">
            <footer>
            <div class="row-footer">
                <div class="col">
                    <img src={logo5} class="logo" alt=""/>
                    <p>Makasih banget udah mampir di Ntika Kebaya! Dapatkan pengalaman berkebaya yang tak terlupakan
                            dengan koleksi kami yang elegan dan berkualitas tinggi. Sewa kebaya impianmu untuk acara
                            spesial hanya di sini. Jadi pusat perhatian dengan pesona tradisi bersama Ntika Kebaya!
                    </p>
                </div>
                
                <div class="col">

                    {/* <h2>Link <div class="underline"><span></span></div>
                    </h2>
                    <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#collection">Rekomendasi</a></li>
                            <li><a href="#Catalog">Catalog</a></li>
                            <li><a href="">Abaout Us</a></li>
                    </ul> */}
                    <div className='wrap-map'>
                        <div id="canvas-for-googlemap">
                        <iframe frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Amikom+Yogyakarta+University,+Jalan+Ring+Road+Utara,+Ngringin,+Condongcatur,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                        </div>
                        <a class="googl-ehtml" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="grab-maps-authorization">premium bootstrap themes</a>
                        
                    </div>

                </div>

                <div class="col">
                    <h2>Ntika Kebaya <div class="underline"><span></span></div></h2>
                    <p>jl.ring road utara</p>
                    <p>mencasan indah no. 21</p>
                    <p>sleman, yogyakarta</p>
                    <p class="email-id">ntikakebaya@gmail.com</p>
                    <h4>082235298041</h4>
                    <div class="social-icons">
                            <i class="fa-brands fa-facebook"></i>
                            
                            <i class="fa-brands fa-instagram"></i>
                            <i class="fa-brands fa-whatsapp"></i>
                    </div>
                </div>

            </div>

            </footer>
        </div>
    );
}

export default Footer;