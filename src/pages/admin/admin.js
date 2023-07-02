import { useState } from 'react';
import './admin.css';
import Form from "../../Components/updateForm/updateForm"
import AdminUpdateStock from '../../Components/admin-update/admin-updateStock';
import AdminProduct from '../../Components/admin-product/admin-product';
function Admin() {
    const [content, setcontent] = useState(0)

    const changeContent = ()=>{
        if (content === 1) {
            return <AdminProduct></AdminProduct>
        }else if (content === 2){
            return <AdminUpdateStock/>
        }
    }
  return (
    <div className="App">
      Admin
      <div className='menu-navigator'>
      <button onClick={()=>{setcontent(1)}}>ProductList</button>
      <button onClick={()=>{setcontent(2)}}>2</button>
      </div>
      
      <div className='content'>
        {changeContent()}
        
      </div>
      <Form/>
    </div>
  );
}

export default Admin;
