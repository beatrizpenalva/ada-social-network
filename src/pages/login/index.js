import { onNavigate } from "../../utils/history.js";
import { getError } from "../../errors/index.js";
import { createFooter } from "../../components/footer.js";
import {
  signUpGoogle,
  singUpGithub,
  signInEmail,
} from "../../services/index.js";

export const Login = () => {
  const rootElement = document.createElement("main");
  rootElement.innerHTML = `
    <section class="login-page">  
      <section class="left">  
        <img src="../../img/ada-animation.gif" width="400px" height="300px">
        <p class="logo-theme"><span class="logo-name">[Ada]</span> Code like a woman.</p>
      </section>
      
      <section class="right">
        <form id="signin-form">
          <fieldset class="right">
            <label for="email" class="label-form">
              E-mail <span class="required-item">*</span>
            </label>
            <input type="email" id="email" class="input-in-line" placeholder="email@email.com" required>
            
            <label for="password" class="label-form">
              Password <span class="required-item">*</span>
            </label> 
              <input type="password" minlength="6" id="password" class="input-in-line" placeholder="******" required>
            
            <section id="error-login" class="error-message"></section>
          </fieldset>
          
          <fieldset class="login-button">
            <button type="submit" class="submit-button" id="login-button">Sign In</button> 
          </fieldset>
        </form> 

        <p class="subtitle">_______________ OR _______________</p>
        
        <section class="providers-buttons">
          <button id="google-button" class="button-icon">
            <i class="fab fa-google font-icons"></i>
            <span>Sign in with Google</span>
          </button>

          <button id="github-button" class="button-icon">
            <i class="fab fa-github-alt font-icons"></i>
            <span>Sign in with GitHub</span>
          </button>
        </section>  

        <p class="subtitle">Do not have an account?
          <button id="button-register" class="button-in-text">Sign up!</button>
        </p>
      </section>
      <footer id="footer"></footer>
    </section>    
  `;

  const signInButton = rootElement.querySelector("#signin-form");
  const goRegisterButton = rootElement.querySelector("#button-register");
  const signUpGoogleButton = rootElement.querySelector("#google-button");
  const signUpGhButton = rootElement.querySelector("#github-button");

  const getFooter = rootElement.querySelector("#footer");
  getFooter.appendChild(createFooter());

  signInButton.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = rootElement.querySelector("#email").value;
    const password = rootElement.querySelector("#password").value;
    sendLogin(email, password);
  });

  signUpGoogleButton.addEventListener("click", signUpGoogle);
  signUpGhButton.addEventListener("click", singUpGithub);

  goRegisterButton.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/register");
  });

  return rootElement;
};

const sendLogin = (email, password) => {
  signInEmail(email, password)
    .then(() => {
      onNavigate("/");
    })
    .catch((err) => {
      getError(err);
    });
};
