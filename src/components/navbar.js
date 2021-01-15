import { logOut, getCurrentUser } from '../services/index.js'
import { onNavigate } from '../../utils/history.js';

export const navBar = () => {
  const user = getCurrentUser();
  const navBarContainer = document.createElement("header");
  navBarContainer.innerHTML = `
    <nav class="header">
      <figure class="current-user">
        <img class="avatar" src="${user.photoURL}" height="60px" width="60px">
        <figcaption class="greetings">
          Olá, ${user.displayName}! ❤
        </figcaption>
      </figure>
      <button id="logout" class="button-icon-feed"><img src="../../img/logout.png" height="35px" width="35px"></button>
    </nav>
  `

  const logOutButton = navBarContainer.querySelector("#logout");
  logOutButton.addEventListener("click", sendLogOut);

  return navBarContainer;
}

const sendLogOut = () => {
  logOut()
    .then(() => {
      onNavigate('/login');
    })
}