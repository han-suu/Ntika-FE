import './home.css';
import Navbar from '../../Components/navbar/navbar';
import Catalog from '../../Components/Catalog/catalog';
function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>
      
      
      <header class="hero-section" id="home">
            <div class="content">
                  <h1>FIND THE BEST</h1>
                  <h1>KEBAYA FOR YOUR</h1>
                  <h1>STYLE</h1>
                  <p class="sub-heading">Rent and Embrace Elegance: Your Exquisite <br/> Journey with Ntika Kebaya</p>
            </div>

      </header>

      <Catalog></Catalog>

    </div>
  );
}

export default Home;
