import { recordNewUser, emailVerify } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';
import { getError, printMessageError } from '../../errors/index.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <section class="register-page"> 
    <section class="left">  
      <img src="../../img/ada-lovelace.svg" width="175px" height="175px" alt="Desenho do rosto de Ada Lovelace em preto com um fundo redondo alaranjado">
      <p class="logo-theme"><span class="logo-name">[Ada]</span> Programe como uma mulher.</p>
    </section>

    <section class="right">
      <form id="registerSingIn"> 
          <fieldset class="right">
            <input type="text" class="input-in-line" id="name" placeholder="Nome"/>
            <input type="text" class="input-in-line" id="lastName" placeholder="Sobrenome" required />
            <input type="email" class="input-in-line" id="email" placeholder="Email" required/>
            <input type="password" class="input-in-line" id="password" placeholder="Senha" required/>
            <input type="password" class="input-in-line" id="passwordConfirmation" placeholder="Confirme sua senha" required/>
            <section id="error-login" class="error-message"></section>
          </fieldset> 

          <fieldset class="register-button">
            <button type="submit" class="submit-button" id="newRegister"> Registrar</button>
          </fieldset>
      </form>
    </section>
  </section>  
  `;

  rootElement.querySelector('#registerSingIn').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = rootElement.querySelector('#email').value;
    const password = rootElement.querySelector('#password').value;
    const passwordConfirmed = rootElement.querySelector('#passwordConfirmation').value;
    checkData(email, password, passwordConfirmed);
  });

  return rootElement;
};

const passwordMismatch = 'As senhas não são iguais. Por favor, escreva novamente.';
const weakPassowrd = 'Sua senha tem que conter no minimo 6 caracteres. Por favor, escreva uma senha maior.';

const checkData = (emailValue, passwordValue, passwordConfirmed) => {
  if (passwordValue !== passwordConfirmed) {
    printMessageError(passwordMismatch);
  } else if (passwordValue.length < 6) {
    printMessageError(weakPassowrd);
  } else {
    recordNewUser(emailValue, passwordValue)
      .then(() => {
        emailVerify()
          .then(() => {
            onNavigate('/login');
          })
          .catch((err) => {
            getError(err);
          });
      })
      .catch((err) => {
        getError(err);
      });
  }
};
