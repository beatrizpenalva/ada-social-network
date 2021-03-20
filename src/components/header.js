import { logOut, getCurrentUser } from '../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const createHeader = () => {
  const user = getCurrentUser();
  const headerContainer = document.createElement('header');
  headerContainer.innerHTML = `
    <nav class="header">
      <figure class="current-user">
        <img class="avatar" src="${user.photoURL || "../img/avatar-default.png"}" height="30px" width="30px">
        <figcaption class="greetings">
          Hi, ${user.displayName}! ❤
        </figcaption>
      </figure>
      <button id="logout" class="button-icon-feed">
        <i class="fas fa-sign-out-alt logout"></i>
      </button>
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
