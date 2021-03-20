import {
  recordNewUser,
  saveUserProfile
} from "../../services/index.js";
import { createFooter } from "../../components/footer.js";
import { onNavigate } from "../../utils/history.js";
import { getError } from "../../errors/index.js";

export const Register = () => {
  const rootElement = document.createElement("div");
  rootElement.innerHTML = `
  <section class="register-page">
    <button type="button" id="back">
      <i class="fas fa-chevron-left back-button"></i>
    </button>  
    <section class="register-sections"> 
      <section class="left">
      <img src="../../img/ada-animation.gif" width="400px" height="300px">
        <p class="logo-theme"><span class="logo-name">[Ada]</span> Code like a woman.</p>
      </section>

      <section class="right">
        <form id="registerSingIn"> 
            <fieldset class="right">
              <label for="name" class="label-form">
                Name <span class="required-item">*</span>
              </label> 
              <input type="text" class="input-in-line" id="name" placeholder="Name"/>

              <label for="email" class="label-form">
                E-mail <span class="required-item">*</span>
              </label> 
              <input type="email" class="input-in-line" id="email" placeholder="email@email.com" required/>
              
              <label for="password" class="label-form">
                Password <span class="required-item">*</span>
              </label> 
              <input type="password" class="input-in-line" minlength="6" id="password" placeholder="******" required/>

              <label for="passwordConfirmation" class="label-form">
                Confirm password <span class="required-item">*</span>
              </label> 
              <input type="password" minlength="6" class="input-in-line" id="passwordConfirmation" placeholder="******" required/>

              <section id="error-login" class="error-message"></section>
            </fieldset> 

            <fieldset class="register-button">
              <button type="submit" class="submit-button" id="newRegister">Sign Up</button>
            </fieldset>
        </form>
      </section>
      <footer id="footer"></footer>
    </section>
  </section>  
  `;

  const getFooter = rootElement.querySelector("#footer");
  getFooter.appendChild(createFooter());

  rootElement
    .querySelector("#back")
    .addEventListener("click", (e) => {
      e.preventDefault();
      onNavigate('/login')
    })

  rootElement
    .querySelector("#registerSingIn")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const email = rootElement.querySelector("#email").value;
      const password = rootElement.querySelector("#password").value;
      const passwordConfirmed = rootElement.querySelector(
        "#passwordConfirmation"
      ).value;
      const userName = rootElement.querySelector("#name").value;
      checkData(email, password, passwordConfirmed, userName);
    });

  return rootElement;
};

const checkData = (emailValue, passwordValue, passwordConfirmed, userName) => {
  if (passwordValue !== passwordConfirmed) {
    getError("mismatch-password");
  } else {
    recordNewUser(emailValue, passwordValue)
      .then((user) => user)
      .then((loggedUser) => {
        saveUserProfile(userName);
        onNavigate('/')
      })
      .catch((err) => {
        getError(err);
      });
  }
};
