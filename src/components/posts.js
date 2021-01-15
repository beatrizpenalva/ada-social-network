import { sendDelete, showEditContainer, sendLike } from './postsfunctions.js';

export const printPosts = (doc, id, currentUser) => {
  const post = doc;
  const postContainer = document.createElement('section');
  if (post.userID !== currentUser) {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
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
    `;
  } else {
    postContainer.innerHTML = `
      <section class="post-container" id="${id}">
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
                    <figure>
                        <img src="../../img/edit.png" height="20px" width="20px">
                    </figure>
                </button>

                <button class="post-function delete" id="delete-${id}">
                    <figure>
                        <img src="../../img/delete.png" height="20px" width="20px">
                    </figure>
                </button>
            </section>

            <form id="edit-post-form-${id}" class="on-edition">
                <textarea class="edition-content text" id="edition-content-${id}" spellcheck="true" maxlength="500"
                    wrap="hard" required>${post.text}</textarea>

                <section class="edition-buttons">
                    <button class="post-function cancel-edition" id="cancel-edition-${id}">
                        <figure>
                            <img src="../../img/cancel.png" height="20px" width="20px">
                        </figure>
                      </button>    

                    <button type="submit" class="send-button">Salvar</button>
                </section>
            </form>
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

  return postContainer;
};
