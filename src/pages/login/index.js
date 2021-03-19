import { onNavigate } from "../../utils/history.js";
import { getError } from "../../errors/index.js";
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
        <img src="../../img/ada-lovelace.svg" width="175px" height="175px">
        <p class="logo-theme"><span class="logo-name">[Ada]</span> Programe como uma mulher.</p>
      </section>
      
      <section class="right">
        <form id="signin-form">
          <fieldset class="right">
            <label for="email" class="label-form">
              E-mail <span class="required-item">*</span>
            </label>
            <input type="email" id="email" class="input-in-line" placeholder="E-mail" required>
            
            <label for="password" class="label-form">
              Password <span class="required-item">*</span>
            </label> 
              <input type="password" id="password" class="input-in-line" placeholder="Senha" required>
            
            <section id="error-login" class="error-message"></section>
          </fieldset>
          
          <fieldset class="login-button">
            <button type="submit" class="submit-button" id="login-button">Entrar</button> 
          </fieldset>
        </form> 

        <p class="subtitle">_______________ OU _______________</p>
        
        <section class="providers-buttons">
          <button id="google-button" class="button-icon">
          <?xml version="1.0"?>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 97.75 97.75" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
          <g xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M50.729,33.67c0-6.775-4.039-17.311-11.826-17.311c-2.448,0-5.071,1.222-6.577,3.105    c-1.598,1.979-2.062,4.511-2.062,6.965c0,6.3,3.658,16.741,11.736,16.741c2.345,0,4.872-1.123,6.382-2.63    C50.541,38.369,50.729,35.365,50.729,33.67z" fill="#ff780f" data-original="#000000" style="" class=""/>
              <path d="M45.657,58.414c-0.748-0.094-1.218-0.094-2.156-0.094c-0.847,0-5.918,0.185-9.859,1.511    c-2.064,0.748-8.071,3.008-8.071,9.687c0,6.682,6.478,11.485,16.522,11.485c9.015,0,13.804-4.338,13.804-10.163    C55.896,66.027,52.798,63.496,45.657,58.414z" fill="#ff780f" data-original="#000000" style="" class=""/>
              <path d="M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z     M37.489,84.945c-13.616,0-20.184-6.488-20.184-13.455c0-3.385,1.687-8.18,7.227-11.475c5.818-3.576,13.709-4.043,17.936-4.334    c-1.319-1.692-2.816-3.479-2.816-6.395c0-1.597,0.47-2.539,0.934-3.669c-1.034,0.096-2.062,0.188-3.002,0.188    c-9.948,0-15.581-7.438-15.581-14.775c0-4.322,1.969-9.124,6.005-12.605c5.354-4.422,12.67-5.622,17.744-5.622H64.25l-6.105,3.836    h-5.816c2.158,1.786,6.658,5.549,6.658,12.703c0,6.957-3.938,10.259-7.879,13.36c-1.223,1.221-2.632,2.538-2.632,4.611    c0,2.065,1.41,3.193,2.44,4.047l3.383,2.628c4.132,3.479,7.888,6.679,7.886,13.177C62.184,76.012,53.635,84.945,37.489,84.945z     M78.005,47.725v9.464h-4.646v-9.464h-9.393v-4.697h9.393v-9.406h4.646v9.406h9.438v4.697H78.005z" fill="#ff780f" data-original="#000000" style="" class=""/>
            </g>
          </g>
          <g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>          
            <span>Entrar com conta Google</span>
          </button>

          <button id="github-button" class="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path xmlns="http://www.w3.org/2000/svg" d="m256 0c-140.609375 0-256 115.390625-256 256 0 119.988281 84.195312 228.984375 196 256v-84.695312c-11.078125 2.425781-21.273438 2.496093-32.550781-.828126-15.128907-4.464843-27.421875-14.542968-36.546875-29.910156-5.816406-9.8125-16.125-20.453125-26.878906-19.671875l-2.636719-29.882812c23.253906-1.992188 43.371093 14.167969 55.3125 34.230469 5.304687 8.921874 11.410156 14.152343 19.246093 16.464843 7.574219 2.230469 15.707032 1.160157 25.183594-2.1875 2.378906-18.972656 11.070313-26.074219 17.636719-36.074219v-.015624c-66.679687-9.945313-93.253906-45.320313-103.800781-73.242188-13.976563-37.074219-6.476563-83.390625 18.238281-112.660156.480469-.570313 1.347656-2.0625 1.011719-3.105469-11.332032-34.230469 2.476562-62.546875 2.984375-65.550781 13.078125 3.867187 15.203125-3.890625 56.808593 21.386718l7.191407 4.320313c3.007812 1.792969 2.0625.769531 5.070312.542969 17.371094-4.71875 35.683594-7.324219 53.726563-7.558594 18.179687.234375 36.375 2.839844 54.464844 7.75l2.328124.234375c-.203124-.03125.632813-.148437 2.035157-.984375 51.972656-31.480469 50.105469-21.191406 64.042969-25.722656.503906 3.007812 14.128906 31.785156 2.917968 65.582031-1.511718 4.65625 45.058594 47.300781 19.246094 115.753906-10.546875 27.933594-37.117188 63.308594-103.796875 73.253907v.015624c8.546875 13.027344 18.816406 19.957032 18.761719 46.832032v105.722656c111.808594-27.015625 196-136.011719 196-256 .003906-140.609375-115.386719-256-255.996094-256zm0 0" fill="#ff780f" data-original="#000000" style="" class=""/></g></svg>
            <span>Entrar com conta GitHub</span>
          </button>
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
  const signUpGhButton = rootElement.querySelector("#github-button");

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
