import './home.css';
import Navbar from '../../Components/navbar/navbar';
import Catalog from '../../Components/Catalog/catalog';
import Recommended from '../../Components/recommended/recommended';
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
      <Recommended></Recommended>
      <Catalog></Catalog>

    </div>
  );
}

export default Home;
