import { useState } from 'react';
import './admin.css';
import Form from "../../Components/updateForm/updateForm"
import AdminUpdateStock from '../../Components/admin-update/admin-updateStock';
import AdminProduct from '../../Components/admin-product/admin-product';
import AdminCreate from '../../Components/admin-create/admin-create';
import AdminOrder from '../../Components/admin-order/admin-order';
function Admin() {
  // 1 : Product LIST
  // 2 : UPDATE PRODUCT
  // 3 : CREATE ITEM
  // 4 : Order List
  
    const [content, setcontent] = useState(0)
    const [Item, setItem] = useState()
    const changeContent = ()=>{
        if (content === 1) {
            return <AdminProduct change = {handleChange}/>
        }else if (content === 2){
            return <AdminUpdateStock change = {handleBack} dataItem = {Item} />
        }else if (content === 3){
          return <AdminCreate />
        }else if (content === 4){
          return <AdminOrder />
        }
        
    }
    const handleChange = (item)=>{
        // console.log("item nih: ",item)
        setItem(item)
        handleState(2)
    }

    const handleBack = ()=>{
        // console.log("item nih: ",item)
        setItem()
        handleState(1)
    }

    function handleState(state) {
        setcontent(state);
     }
  return (
    <div className="App">
      Admin
      <div className='menu-navigator'>
      <button onClick={()=>{handleState(1)}}>ProductList</button>
      <button onClick={()=>{handleState(3)}}>Create</button>
      <button onClick={()=>{handleState(4)}}>OrderList</button>
      </div>
      
      <div className='admin-content'>
        {changeContent()}
        
      </div>
      <Form/>
    </div>
  );
}

export default Admin;
