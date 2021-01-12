import { onNavigate } from '../../utils/history.js';
import { signInEmail, getGoogleProvider, getFacebookProvider, getGitHubProvider } from '../../services/index.js'

export const Login = () => {
  const rootElement = document.createElement("main");
  rootElement.innerHTML = `
    <section class="login-page">  
      <section class="left">  
        <img src="../../img/ada-lovelace.svg" width="175px" height="175px">
        <p class="logo-theme"><span class="logo-name">[Ada]</span> Programe como uma mulher.</p>
      </section>
      
      <section class="right">
        <form id="signin-form">
          <fieldset class="right">
            <input type="email" id="email" class="input-in-line" placeholder="E-mail" required>
            <input type="password" id="password" class="input-in-line" placeholder="Senha" required>
            <section id="error-login" class="error-message"></section>
          </fieldset>
          
          <fieldset class="login-button">
            <button type="submit" class="enter-button">Entrar</button> 
          </fieldset>
        </form> 

        <p class="subtitle">_______________ OU _______________</p>
        
        <section class="providers-buttons">
          <button id="google-button" class="button-icon"><img src="../../img/google.svg" height="50px" width="50px"></button>
          <button id="facebook-button" class="button-icon"><img src="../../img/facebook.svg" height="50px" width="50px"></button>
          <button id="github-button" class="button-icon"><img src="../../img/github.svg" height="50px" width="50px"></button>
        </section>  

        <p class="subtitle">Não tem uma conta?
          <button id="button-register" class="button-in-text">Registre-se</button>
        </p>
      </section>
    </section>    
  `;

  const signInButton = rootElement.querySelector("#signin-form");
  const goRegisterButton = rootElement.querySelector("#button-register");
  const signUpGoogleButton = rootElement.querySelector("#google-button");
  const signUpFbButton = rootElement.querySelector("#facebook-button");
  const signUpGhButton = rootElement.querySelector("#github-button");
  
  signInButton.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = rootElement.querySelector("#email").value;
    const password = rootElement.querySelector("#password").value;
    signInEmail(email, password);
  });
  
  signUpGoogleButton.addEventListener("click", getGoogleProvider);
  signUpFbButton.addEventListener("click", getFacebookProvider);
  signUpGhButton.addEventListener("click", getGitHubProvider);
  goRegisterButton.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate('/');
  });

  return rootElement;
};
