import { editPost, deletePost } from '../../services/index.js'

export const printPosts = (doc, id) => {
  const post = doc;
  const currentUserID = firebase.auth().currentUser.uid;
  const postContainer = document.createElement("section");
  if (post.ID !== currentUserID) {
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
            <p class="post-content">${post.likes}</p>   
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
                        <button class="post-function send-edition" id="send-edition-${id}">
                            <figure>
                                <img src="../../img/right-arrow.png" height="20px" width="20px">
                            </figure>  
                        </button>
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

function sendDelete(e) {
  const getEvent = e.target;
  const getPostId = getEvent.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  deletePost(getPostId)
  .then(doc => {
    if (confirm("Você quer realmente quer excluir essa publicação?")) {
      const postCard = document.getElementById(postID)
      const parentElement = postCard.parentElement;
      parentElement.removeChild(postCard);
    }
  })
  .catch(() => {
    alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
  })
}

const showEditContainer = (e) => {
  const postID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  const postCard = document.getElementById(postID);
  toggleEditContainer(postCard, true);
  const sendEditionButton = postCard.querySelector(".send-edition");
  sendEditionButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendEdition(postID, postCard);
  })
}

const sendEdition = (postId, post) => {
  const postCard = post;
  const postID = postId;
  const editionBox = postCard.querySelector(".edition-content");
  const newPostText = editionBox.value;
  editPost(postID, newPostText)
  .then(() => {
    toggleEditContainer(postCard, false);
    const text = postCard.querySelector(".post-content");
    text.innerHTML = newPostText;
  })
  .catch(() => {
    alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
  })
}

const toggleEditContainer = (post, show) => {
  const postCard = post;
  const holderEditionContainer = postCard.querySelector(".on-edition");
  if (show) {
    holderEditionContainer.classList.add("display");
  } else {
    holderEditionContainer.classList.remove("display");
  }
}

function sendLike(e) {
  const getEvent = e.target;
  const getPostId = getEvent.parentNode.parentNode.parentNode.id;
  likePost(getPostId);
}

function likePost(postID) {
  const postId = postID;
  console.log(postId)
}