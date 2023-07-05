import './SignIn.css';

function SignIn() {
  const loader = require('../../images/loader.gif');
  const error = require('../../images/error.png');
  const logo5 = require('../../images/logo5.png');
  return (
    <div className="SignIn">
      <img src={loader} class="loader" alt=""/>

      <div class="alert-box">
            <img src={error} class="alert-img" alt=""/>
            <p class="alert-msg">Eror Massage</p>
      </div>

      <div class="container">
            <img src={logo5} class="logo" alt=""/>
            <div>
                  <input type="email" autocapitalize="off" id="email" placeholder="email"/>
                  <input type="password" autocapitalize="off" id="password" placeholder="password"/>
                  <button class="submit-btn">Sign In</button>
            </div>
            <a href="/signup" class="sign-link">dont have an account? create here</a>
      </div>
      
    </div>
  );
}

export default SignIn;
