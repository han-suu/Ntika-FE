import './admin-create.css';
import Axios from 'axios';
import { set } from 'date-fns';
import { useEffect,useState,useRef } from 'react';
function AdminCreate({ change }) {

    function handleChange(item) {
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

    const lihat = ()=>{
        console.log(Products)
    }

    const [Name, setName] = useState()
    // const [Category, setCategory] = useState()
    const [Price, setPrice] = useState()
    const [Description, setDescription] = useState()
    const [SizeChart, setSizeChart] = useState()
    const [Images, setImages] = useState([])
    const [Stock, setStock] = useState([])


    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [progressInfos, setProgressInfos] = useState({ val: [] });
    const [message, setMessage] = useState([]);
    const [imageInfos, setImageInfos] = useState([]);
    const progressInfosRef = useRef(null);
    const selectFiles = (event) => {
        let images = [];
    
        for (let i = 0; i < event.target.files.length; i++) {
          images.push(URL.createObjectURL(event.target.files[i]));
        }
    
        setSelectedFiles(event.target.files);
        setImagePreviews(images);
        setProgressInfos({ val: [] });
        setMessage([]);
      };
    // {
    //     "name": "FALILV",
    //     "category": "Atasan",
    //     "price": 121000,
    //     "description": "TSTFYB",
    //     "size_chart":"S:12 , M: 13, L: 14, XL: 15",
    //     "images":["gambarX","gambarY","gambarZ"],
    //     "stock":[3,2,1,5]
    // }
  return (
    <div className="AdminCreate">
      AdminCreate
      {/* <button onClick={()=>{lihat()}}>List</button> */}
      <div className='create'>
        <form>
            <h4>Nama Barang</h4>
            <input type="text" placeholder='NamaBarang' />
            {/* <input type="text" placeholder='Category' /> */}

            <h4>Price</h4>
            <input type="number" placeholder='0' />

            <h4>Description</h4>
            <textarea rows="4" cols="50"></textarea>
            <br/>
            <h4>SizeChart</h4>
            <textarea rows="4" cols="50"></textarea>
            <br/>

            <label>Your Image File
            <input type="file" multiple name="myImage" accept="image/png, image/jpeg" onChange={set}/>
            </label>
            <h4>Stock Size S</h4>
            <input type="number" placeholder='0' />
            <h4>Stock Size M</h4>
            <input type="number" placeholder='0' />
            <h4>Stock Size L</h4>
            <input type="number" placeholder='0' />
            <h4>Stock Size XL</h4>
            <input type="number" placeholder='0' />
        </form>
      </div>
    </div>
  );
}

export default AdminCreate;
