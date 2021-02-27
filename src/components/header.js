import { logOut, getCurrentUser } from '../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const createHeader = () => {
  const user = getCurrentUser();
  const headerContainer = document.createElement('header');
  headerContainer.innerHTML = `
    <nav class="header">
      <figure class="current-user">
        <img class="avatar" src="${user.photoURL}" height="60px" width="60px">
        <figcaption class="greetings">
          Olá, ${user.displayName}! ❤
        </figcaption>
      </figure>
      <button id="logout" class="button-icon-feed"><img src="../../img/logout.png" height="35px" width="35px"></button>
    </nav>
  `;

  const logOutButton = headerContainer.querySelector('#logout');
  logOutButton.addEventListener('click', sendLogOut);

  return headerContainer;
};

const sendLogOut = () => {
  logOut()
    .then(() => {
      onNavigate('/login');
    });
};
