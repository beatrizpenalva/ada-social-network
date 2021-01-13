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

          <section class="on-edition">
            <textarea class="edition-content" id="edition-content-${id}"></textarea>
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

        const showEditContainer = (e) => {
            const postID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            const postCard = document.getElementById(postID);
            console.log(postCard)
            toggleEditContainer(postCard, true);
            const sendEditionButton = postCard.querySelector(".send-editon");
            
            ///console.log(sendEditionButton)

            sendEditionButton.addEventListener("click", () => {
              sendEdition(postID, postCard);
            });
          }
        
          const sendEdition = (postID, post) => {
            const postCard = post;
            const editionBox = postCard.querySelector(".edition-content");
            const newPostText = editionBox.value;
            const postCollection = firebase.firestore().collection("posts"); 
            postCollection.doc(postID).update({ text: newPostText }).then(() => {
                toggleEditContainer(postCard, true);
              })
              .catch(() => {
                console.log("deu ruim")
              })
          }
        
          const toggleEditContainer = (post, show) => {
            const postCard = post;
            const holderEditionContainer = postCard.querySelector(".on-edition");
            if(show) {
                holderEditionContainer.classList.add("display");
            } else {
                holderEditionContainer.classList.remove("display");
            }
          }




















    return postContainer;
  }

function sendDelete(e) {
    const getEvent = e.target;
    const getPostId = getEvent.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    deletePost(getPostId);
}

function sendLike(e) {
    const getEvent = e.target;
    const getPostId = getEvent.parentNode.parentNode.parentNode.id;
    likePost(getPostId);
}

function deletePost(postID) {
    const postCollection = firebase.firestore().collection("posts"); 
    const postId = postID;
    const userUID = firebase.auth().currentUser.uid; 
        if (confirm("Você quer realmente quer excluir essa publicação?")) {
            if (postId !== userUID) {
              postCollection.doc(postId).delete().then(doc => { 
                console.log("falta DOM");
              })    
            }
        }
}

function likePost(postID) {
    const postId = postID;
    console.log(postId)
}


