import {
  editPost, deletePost, getCurrentUser, alreadyLikedThisPost, removeLike, likePost,
} from '../../services/index.js';
import { timelineMessageError } from '../errors/index.js';

export const sendDelete = (e) => {
  const getEvent = e.target;
  const postId = getEvent.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  if (confirm('Do you really want to delete it?')) {
    deletePost(postId)
      .then(() => {
        const postCard = document.getElementById(postId);
        const parentElement = postCard.parentElement;
        parentElement.removeChild(postCard);
      })
      .catch(timelineMessageError);
  }
};

export const showEditContainer = (e) => {
  const postID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  const postCard = document.getElementById(postID);
  toggleEditContainer(postCard, true);

  const cancelEditButtonId = `#cancel-edition-${postID}`;
  const cancelEditionForm = postCard.querySelector(cancelEditButtonId);
  cancelEditionForm.addEventListener('click', () => {
    e.preventDefault();
    toggleEditContainer(postCard, false);
  });

  const formEditId = `#edit-post-form-${postID}`;
  const sendEditionForm = postCard.querySelector(formEditId);
  sendEditionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendEdition(postID, postCard);
  });
};

function sendEdition(postId, post) {
  const postCard = post;
  const postID = postId;
  const editionBox = postCard.querySelector('.edition-content');
  const newPostText = editionBox.value;
  if (newPostText !== '') {
    editPost(postID, newPostText)
      .then(() => {
        toggleEditContainer(postCard, false);
        const text = postCard.querySelector('.post-content');
        text.innerHTML = newPostText;
      })
      .catch(timelineMessageError);
  }
}

function toggleEditContainer(post, show) {
  const postCard = post;
  const holderEditionContainer = postCard.querySelector('.on-edition');
  if (show) {
    holderEditionContainer.classList.add('display');
  } else {
    holderEditionContainer.classList.remove('display');
  }
}

export const sendLike = (e) => {
  const getEvent = e.target;
  const postId = getEvent.parentNode.parentNode.parentNode.parentNode.id;
  const user = getCurrentUser();
  const likeValue = document.querySelector(`#likeValue-${postId}`);
  alreadyLikedThisPost(postId)
    .then((doc) => {
      const checkLike = doc.data().likes.includes(user.uid);
      if (!checkLike) {
        likePost(postId, user.uid)
          .then(() => {
            const getNewValue = addNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          })
          .catch(timelineMessageError);
      } else {
        removeLike(postId, user.uid)
          .then(() => {
            const getNewValue = removeNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          })
          .catch(timelineMessageError);
      }
    })
    .catch(timelineMessageError);
};

function addNewLikeValue(num) {
  return Number(num) + 1;
}

function removeNewLikeValue(num) {
  return Number(num) - 1;
}
