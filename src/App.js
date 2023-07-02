import './App.css';
import Axios from 'axios';
function App() {
  const config = {
    headers:{
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA1NTc4NzIsInN1YiI6ImtpamFuZ0BlbWFpbC5jb20ifQ.k6cZoKr76CS_ZfO7qPCjL4DR8oRSk22TJnZqvDgdI5k",
    }
  };
  // const url = "http://127.0.0.1:8080/v1/sign-up";
  
  const data ={
    "name":"RE:TEST",
    "email":"re@email.com",
    "password":"Password123",
    "phone":"08123123123"
}
  const posting = ()=>{
    Axios.post('http://127.0.0.1:8080/v1/sign-up', data)
          .then(function (response) {
            // console.log(response.data);
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  const getto = ()=>{
    Axios.get('http://127.0.0.1:8080/v1/users', config)
          .then(function (response) {
            // console.log(response.data);
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
  }
  
  return (
    <div className="App">
      Hello
      <button onClick={()=>{posting()}}>PERGI KE HOME</button>
      <button onClick={()=>{getto()}}>Ambil</button>
    </div>
  );
}

export default App;
