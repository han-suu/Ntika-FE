import './admin-product.css';
import Axios from 'axios';
import { useEffect,useState } from 'react';
function AdminProduct({ change }) {
    // const [value, setNewValue] = useState();

    function handleChange(item) {
        // setNewValue(item);
        change(item);
    }
    const [Products, setProducts] = useState([])
    
    useEffect(() => {
        const config = {
            headers:{
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA4NjA0OTYsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.Uz525EdefJt4Ehj-uRKkUP7wJh3x1JZDWCmJDlMRub8",
            }
          }

        const getto = ()=>{
            Axios.get('http://127.0.0.1:8080/v1/products', config)
                  .then(function (response) {
                    // console.log(response.data);
                    setProducts(response.data.data)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
          }
        getto()
    },[])


    // const kelik = (vars)=>{
    //     console.log(vars)
    // }
  return (
    <div className="AdminProduct">
      <div className='list'>
        {
            Products.map(item=>{
                
                return (
                    <div className='list-item'>
                        {/* <h1 onClick={()=>{handleChange(item)}}>{item.Name}</h1> */}
                        <img src={item.thumbnail} alt="" />
                        <h1 onClick={()=>{handleChange(item)}}>{item.name}</h1>
                    </div>
                    
                )
            })
                
        }
        
      </div>
    </div>
  );
}

export default AdminProduct;
