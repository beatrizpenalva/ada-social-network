import { sendDelete, showEditContainer, sendLike } from './postsfunctions.js'

export const printPosts = (doc, id, currentUser) => {
  console.log(doc, currentUser)
  const post = doc;
  const postContainer = document.createElement("section");
  if (post.userID !== currentUser) {
    postContainer.innerHTML = `
            <section class="post-container" id="${id}">  
                <section class="left-post"> 
                    <img class="avatar" src="${post.avatar}" height="60px" width="60px">
                </section>

        <section class="right-post">
          <article class="user-info">
            <h4 class="username">${post.name}</p>
            <p class="post-date">${post.date}</p>
          </article>   

          <article class="post-content">${post.text}</article>

          <section class="post-buttons">
            <input type="checkbox" id="like-${id}" class="post-function like" hidden>  
            <label for="like-${id}">
              ❤
            </label
            <p class="post-content">${post.likes.length}</p>   
        </section>
      </section>
       `
  }
  else {
    postContainer.innerHTML = `
            <section class="post-container" id="${id}">  
                <section class="left-post"> 
                    <img class="avatar" src="${post.avatar}" height="60px" width="60px">
                </section>

                <section class="right-post">
                    <article class="user-info">
                        <h4 class="username">${post.name}</p>
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
                    <section class="on-edition">
                        <textarea class="edition-content text" id="edition-content-${id}" spellcheck="true" maxlength="500" wrap="hard" placeholder="Como pegar o texto que tava?" required></textarea>
                        <section class="edition-buttons">
                          <button class="post-function cancel-edition" id="cancel-edition-${id}">
                            <figure>
                              <img src="../../img/cancel.png" height="20px" width="20px">
                            </figure>  
                          <button class="send-button" id="send-edition-${id}">Salvar</button>
                    </section>     
                </section>
            </section>
       `
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

  return postContainer;
}
