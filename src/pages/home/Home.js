import './home.css';
import Navbar from '../../Components/navbar/navbar';
import Catalog from '../../Components/Catalog/catalog';
import Recommended from '../../Components/recommended/recommended';
import Footer from '../../Components/Footer/footer';
import About from '../../Components/about/about';
function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>
      
      
      <header className="hero-section" id="home">
            <div className="content">
                  <h1>FIND THE BEST</h1>
                  <h1>KEBAYA FOR YOUR</h1>
                  <h1>STYLE</h1>
                  <p className="sub-heading">Rent and Embrace Elegance: Your Exquisite <br/> Journey with Ntika Kebaya</p>
            </div>

      </header>
      <div>
      {/* <div className='wrap-map'>
        <div id="canvas-for-googlemap">
          <iframe frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Amikom+Yogyakarta+University,+Jalan+Ring+Road+Utara,+Ngringin,+Condongcatur,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div>
        <a class="googl-ehtml" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="grab-maps-authorization">premium bootstrap themes</a>
        
      </div> */}
      </div>
      <Recommended></Recommended>
      <Catalog></Catalog>
      <About></About>
      <Footer></Footer>
      

    </div>
  );
}

export default Home;
