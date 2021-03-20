import { sendDelete, showEditContainer, sendLike } from "./postsfunctions.js";
import {
  getCurrentUser,
  addComment,
  deleteComment,
} from "../../services/index.js";
import { alreadyLikedThisComment, removeLikeComment, likeComment } from '../services/index.js';

export const printPosts = (doc, id, currentUser) => {
  const post = doc;
  const postContainer = document.createElement("section");

  if (post.userID !== currentUser) {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
        <section class="top-post">
          <section class="left-post">
            <img class="avatar" src="${post.avatar || "../img/avatar-default.png"}" height="60px" width="60px">
          </section>

          <section class="right-post">
            <article class="user-info">
              <h4 class="username">${post.name}</h4>
              <p class="post-date">${post.date}</p>
            </article>

            <article class="post-content">${post.text}</article>

            <section class="post-buttons">
              <input type="checkbox" id="like-${id}" class="post-function like" hidden ${
      post.likes.includes(currentUser) ? "checked" : ""
    }>
              <label for="like-${id}">
                <i class="fas fa-heart"></i>
              </label>
              <p class="post-content" id="likeValue-${id}">${
      post.likes.length
    }</p>
            </section>
          </section>
        </section>  

        <section class="bottom-post">
          <section id="comment-${id}" class="comment-container">
            <section id="new-comment-${id}" class="form-comment">
              <textarea id="commentText-${id}" class="comment-text" spellcheck="true" maxlength="250" wrap="hard" placeholder="Post your reply" required></textarea>
              <button class="comment-button">Publish</button> 
            </section>

          </section>
        </section>
      </section>
    `;
  } 
  else {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
        <section class="top-post">
          <section class="left-post">
            <img class="avatar" src="${post.avatar || "../img/avatar-default.png"}" height="60px" width="60px">
          </section>

          <section class="right-post">
            <article class="user-info">
              <h4 class="username">${post.name}</h4>
              <p class="post-date">${post.date}</p>
            </article>

            <article class="post-content">${post.text}</article>

            <section class="post-buttons">
              <button class="post-function edit" id="edit-${id}">
                <i class="fas fa-edit post-features"></i>
              </button>

              <button class="post-function delete" id="delete-${id}">
                <i class="fas fa-trash post-features"></i>
              </button>
            </section>

            <form id="edit-post-form-${id}" class="on-edition">
              <textarea class="edition-content text" id="edition-content-${id}" spellcheck="true" maxlength="500" wrap="hard" required>${post.text}</textarea>
                <fieldset class="edition-buttons">
                  <button type="button" class="post-function cancel-edition" id="cancel-edition-${id}">
                    <i class="far fa-window-close post-features"></i>
                  </button>    

                  <button type="submit" class="send-button">Send</button>
                </fieldset>
            </form>
          </section>  
        </section>

        <section class="bottom-post">
          <section id="comment-${id}" class="comment-container">
            <section id="new-comment-${id}" class="form-comment">
              <textarea id="commentText-${id}" class="comment-text" spellcheck="true" maxlength="250" wrap="hard" placeholder="Post your reply" required></textarea>
              <button class="comment-button">Publish</button> 
            </section>
          </section>
        </section>
      </section>
     `;
  }

  const deleteButtons = postContainer.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      sendDelete(e);
    });
  });

  const editButtons = postContainer.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      showEditContainer(e);
    });
  });

  const likeButtons = postContainer.querySelectorAll(".like");
  likeButtons.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      sendLike(e);
    });
  });

  const commentButtons = postContainer.querySelectorAll(".comment-button");
  commentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      sendComment(e);
    });
  });

  return postContainer;
};

const sendComment = (e) => {
  const getEvent = e.target;
  const postId = getEvent.parentNode.parentNode.parentNode.parentNode.id;
  const commentForm = document.querySelector(`#new-comment-${postId}`);
  const commentText = document.querySelector(`#commentText-${postId}`);
  const commentBox = document.querySelector(`#comment-${postId}`);
  if (commentText.value !== "") {
    const newComment = createCommentObject(commentText.value, postId);
    addComment(newComment)
      .then((res) => {
        const commentId = res.id;
        commentBox.insertBefore(
          createCommentBox(newComment, commentId, newComment.userID),
          commentForm
        );
        commentText.value = "";
      })
      .catch((err) => {
        console.log(err);
        //.catch(timelineMessageError);
      });
  } else {
    alert(
      "There is nothing to publish. Please, type something to continue."
    );
  }
};

const createCommentObject = (text, postId) => {
  const user = getCurrentUser();
  const userName = user.displayName;
  const userID = user.uid;
  const userAvatar = user.photoURL;
  const now = new Date();

  const comment = {
    name: userName,
    avatar: userAvatar,
    userID,
    time: Date.now(),
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    text,
    postId,
    likes: [],
  };

  return comment;
};

export const createCommentBox = (doc, id, currentUser) => {
  const comment = doc;
  const commentContainer = document.createElement("section");
  if (comment.userID !== currentUser) {
    commentContainer.innerHTML = `
      <section class="post-comment" id="${id}">
        <section class="left-comment">
          <img class="avatar-comment" src="${
            comment.avatar || "../img/avatar-default.png"
          }" height="60px" width="60px">
        </section>

        <section class="right-comment">
          <article class="user-info-comment">  
            <h4 class="username-comment">${comment.name}</h4>
            <p class="post-date-comment">${comment.date}</p>
          </article>  

        <article class="comment-content">${comment.text}</article>

        <section class="comment-buttons">
          <input type="checkbox" id="like-${id}" class="comment-function like-comment" ${
      comment.likes.includes(currentUser) ? "checked" : ""
    } hidden>
          
          <label for="like-${id}">
            <i class="fas fa-heart post-features"></i>
          </label>
          <p class="comment-content" id="likeValue-${id}">${
      comment.likes.length
    }</p>
        </section>
      </section>
    </section>
    `;
  } 
  else {
    commentContainer.innerHTML = `
    <section class="post-comment" id="${id}">
      <section class="left-comment">
        <img class="avatar-comment" src="${comment.avatar || "../img/avatar-default.png"}" height="60px" width="60px">
      </section>

      <section class="right-comment">
        <article class="user-info-comment">  
          <h4 class="username-comment">${comment.name}</h4>
          <p class="post-date-comment">${comment.date}</p>
        </article>  

      <article class="comment-content">${comment.text}</article>
    
      <section class="comment-buttons">
        <button class="comment-function delete-comment" id="delete-${id}">
          <i class="fas fa-trash post-features"></i>
        </button>
      </section>
    </section>
  </section>
  `;
  }

  const deleteCommentButtons = commentContainer.querySelectorAll(".delete-comment");
  deleteCommentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const getEvent = e.target;
      const commentId = getEvent.parentNode.parentNode.parentNode.parentNode.id;
      if (confirm("Do you really want to delete it?")) {
        deleteComment(commentId)
          .then(() => {
            const commentContainer = document.getElementById(commentId);
            const parentElement = commentContainer.parentElement;
            parentElement.removeChild(commentContainer);
          })
          .catch((err) => {
            console.log(err);
            //.catch(timelineMessageError);
          });
      }
    });
  });

  const likeCommentButtons = commentContainer.querySelectorAll(".like-comment");
  likeCommentButtons.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const getEvent = e.target;
      const commentId = getEvent.parentNode.parentNode.parentNode.id;
      const user = getCurrentUser();
      const likeValue = document.querySelector(`#likeValue-${commentId}`);
      alreadyLikedThisComment(commentId).then((doc) => {
        const checkLike = doc.data().likes.includes(user.uid);
        if (!checkLike) {
          likeComment(commentId, user.uid).then(() => {
            const getNewValue = addNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          });
          //.catch(timelineMessageError);
        } 
        else {
          removeLikeComment(commentId, user.uid).then(() => {
            const getNewValue = removeNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          });
          //.catch(timelineMessageError);
        }
      });
      //.catch(timelineMessageError);
    });
  });

  function addNewLikeValue(num) {
    return Number(num) + 1;
  }

  function removeNewLikeValue(num) {
    return Number(num) - 1;
  }

  return commentContainer;
};
