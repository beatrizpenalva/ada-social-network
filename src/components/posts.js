import { sendDelete, showEditContainer, sendLike } from './postsfunctions.js';
import { getCurrentUser, addComment, deleteComment } from '../../services/index.js';

export const printPosts = (doc, id, currentUser) => {
  const post = doc;
  const postContainer = document.createElement('section');
  if (post.userID !== currentUser) {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
        <section class="top-post">
          <section class="left-post">
            <img class="avatar" src="${post.avatar}" height="60px" width="60px">
          </section>

          <section class="right-post">
            <article class="user-info">
              <h4 class="username">${post.name}</h4>
              <p class="post-date">${post.date}</p>
            </article>

            <article class="post-content">${post.text}</article>

            <section class="post-buttons">
              <input type="checkbox" id="like-${id}" class="post-function like" hidden ${post.likes.includes(currentUser) ? 'checked' : ''}>
              <label for="like-${id}">
                ❤
              </label>
              <p class="post-content" id="likeValue-${id}">${post.likes.length}</p>
            </section>
          </section>
        </section>  

        <section class="bottom-post">
          <section id="comment-${id}" class="comment-container">
            <section id="new-comment-${id}" class="form-comment">
              <textarea id="commentText-${id}" class="comment-text" spellcheck="true" maxlength="250" wrap="hard" placeholder="Adicione seu comentário." required></textarea>
              <button class="comment-button">Publicar</button> 
            </section>

          </section>
        </section>
      </section>
    `;
  } else {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
        <section class="top-post">
          <section class="left-post">
            <img class="avatar" src="${post.avatar}" height="60px" width="60px">
          </section>

          <section class="right-post">
            <article class="user-info">
              <h4 class="username">${post.name}</h4>
              <p class="post-date">${post.date}</p>
            </article>

            <article class="post-content">${post.text}</article>

            <section class="post-buttons">
              <button class="post-function edit" id="edit-${id}">
                <img src="../../img/edit.png" height="20px" width="20px">
              </button>

              <button class="post-function delete" id="delete-${id}">
                <img src="../../img/delete.png" height="20px" width="20px">
              </button>
            </section>

            <form id="edit-post-form-${id}" class="on-edition">
              <textarea class="edition-content text" id="edition-content-${id}" spellcheck="true" maxlength="500" wrap="hard" required>${post.text}</textarea>
                <fieldset class="edition-buttons">
                  <button class="post-function cancel-edition" id="cancel-edition-${id}">
                    <img src="../../img/cancel.png" height="20px" width="20px">
                  </button>    

                  <button type="submit" class="send-button">Salvar</button>
                </fieldset>
            </form>
          </section>  
        </section>

        <section class="bottom-post">
          <section id="comment-${id}" class="comment-container">
            <section id="new-comment-${id}" class="form-comment">
              <textarea id="commentText-${id}" class="comment-text" spellcheck="true" maxlength="250" wrap="hard" placeholder="Adicione seu comentário." required></textarea>
              <button class="comment-button">Publicar</button> 
            </section>
          </section>
        </section>
      </section>
     `;
  }

  const deleteButtons = postContainer.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      sendDelete(e);
    });
  });

  const editButtons = postContainer.querySelectorAll('.edit');
  editButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      showEditContainer(e);
    });
  });

  const likeButtons = postContainer.querySelectorAll('.like');
  likeButtons.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      sendLike(e);
    });
  });

  const commentButtons = postContainer.querySelectorAll('.comment-button');
  commentButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      sendComment(e);
    })
  })

  return postContainer;
};

const sendComment = (e) => {
  const getEvent = e.target;
  const postId = getEvent.parentNode.parentNode.parentNode.parentNode.id;
  const commentForm = document.querySelector(`#new-comment-${postId}`);
  const commentText = document.querySelector(`#commentText-${postId}`);
  const commentBox = document.querySelector(`#comment-${postId}`);
  if(commentText.Value !== null) {
    const newComment = createCommentObject(commentText.value, postId);
    addComment(newComment)
      .then((res) => {
        const commentId = res.id;
        commentBox.insertBefore(createCommentBox(newComment, commentId, newComment.userID), commentForm);
        commentText.value = ""
        //não deixar postar sem nada 1
        //esconder botões dos comentários de acordo com quem postou 2
        //criar botões e funções de dar like e de editar 3
        //esconder os comentários 4
        //refatorar o código 5
      })
      .catch(err => {
        console.log(err)
        //.catch(timelineMessageError);
      })
  }
  else {
    alert("Você precisa escrever alguma coisa!")
  }  
}

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
  }

  return comment;
}

export const createCommentBox = (doc, id, currentUser) => {
  const comment = doc;
  console.log(currentUser) //if (post.userID !== currentUser)
  const commentContainer = document.createElement('section');
  commentContainer.innerHTML = `
  <section class="post-comment" id="${id}">
    <section class="left-comment">
      <figure>
        <img class="avatar-comment" src="${comment.avatar}" height="60px" width="60px">
      </figure>
    </section>

    <section class="right-comment">
      <article class="user-info-comment">  
        <h4 class="username-comment">${comment.name}</h4>
        <p class="post-date-comment">${comment.date}</p>
      </article>  

      <article class="comment-content">${comment.text}</article>
      
      <section class="comment-buttons">
        <button class="comment-function delete-comment" id="delete-${id}">
          <figure>
            <img src="../../img/delete.png" height="20px" width="20px">
          </figure>
        </button>
      </section>
    </section>
  </section>
  `

  const deleteCommentButtons = commentContainer.querySelectorAll('.delete-comment');
  deleteCommentButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const getEvent = e.target;
      const commentId = getEvent.parentNode.parentNode.parentNode.parentNode.parentNode.id
      if (confirm('Você quer realmente quer excluir esse comentário?')) {
        deleteComment(commentId)
          .then(() => {
            const commentContainer = document.getElementById(commentId);
            const parentElement = commentContainer.parentElement;
            parentElement.removeChild(commentContainer);
            console.log("deletou do firebase")
          })
          .catch(err => {
            console.log(err)
            //.catch(timelineMessageError);
          })
      }
    })
  })

  return commentContainer;
}
