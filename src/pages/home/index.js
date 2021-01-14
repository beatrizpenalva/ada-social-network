import { onNavigate } from "../../utils/history.js";
export const Home = () => {
  //----------------- TODO: TRATAR ERROS ----------------\\
  //----- FUNÇÃO DE VERIFICAR SE O USUÁRIO TÁ LOGADO ----\\
  window.addEventListener("load", verifyUserLogged);
  //------------ CRIANDO O TEMPLATE DA PÁGINA -----------\\
  const rootElement = document.createElement("div");
  rootElement.innerHTML = `
      <section class="timeline">
        <nav class="cover">
          <figure class="logo-feed-desktop">
            <button id="home" class="button-icon-feed"><img src="../../img/ada-cover.png"></button>
            <figcaption class="logo-name-desktop">[ Ada ]</figcaption>
          </figure>
          <section class="nav-feed">
            <button id="logout" class="button-icon-feed"><img src="../../img/logout.svg" height="25px" width="25px"></button>
          </section>
        </nav>
        <section class="posts">
          <form id="postForm">
            <textarea spellcheck="true" maxlength="1000" wrap="hard" class="text" id="postText" placeholder="O que você quer compartilhar?" required></textarea>
            <fieldset class="publish-button"> 
              <label for="file">
                <figure>
                  <img src="../../img/icon-picture.svg" height="20px" width="20px">
                </figure>  
                <input type="file" id="file" accept="image/png, image/jpeg">
              </label>  
              <button type="submit" class="enter-button" id="publish">Publicar</button> 
            </fieldset>  
          </form  
        </section>
        <section id="feed" class="posts">
        </section>
      </section>
  `;
  //-------------- GUARDANDO TODOS OS INPUTS -------------\\
  const publishButton = rootElement.querySelector("#postForm");
  const logOutButton = rootElement.querySelector("#logout");
  const feed = rootElement.querySelector("#feed");
  //-------------- EVENTOS CHAMADA DAS FUNÇÕES --------------\\
  publishButton.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    createPost(text);
    rootElement.querySelector("#postText").value = "";
  });
  logOutButton.addEventListener("click", logOut);
  feed.addEventListener("click", getPostClick);
  return rootElement;
};
//------------------- FUNÇÃO DE LOGOUT -------------------\\ FIREBASE
function logOut() {
  const promise = firebase.auth().signOut();
  promise.then(() => {
    onNavigate("/login");
  });
}
//----- FUNÇÃO DE VERIFICAR SE O USUÁRIO TÁ LOGADO ----\\ FIREBASE
function verifyUserLogged() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      onNavigate("/");
      loadPosts();
    } else {
      onNavigate("/login");
    }
  });
}
//-------------- FUNÇÃO DE CRIAR PUBLICAÇÃO --------------\\ FIREBASE
function createPost(text) {
  const now = new Date();
  const user = firebase.auth().currentUser;
  const userName = user.displayName;
  const userID = user.uid;
  const userAvatar = user.photoURL;
  const post = {
    name: userName,
    avatar: userAvatar,
    ID: userID,
    time: Date.now(),
    date: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    text: text,
    likes: [],
  };
  const postCollection = firebase.firestore().collection("posts");
  postCollection.add(post).then((res) => {
    loadPosts();
  });
}
//------------- FUNÇÃO DE PRINTAR PUBLICAÇÃO -------------\\
function printPosts(post, userId) {
  const date = `${post.data().date}/${post.data().month}/${post.data().year}`;
  const likes = post.data().likes || [];
  const likesQuantity = likes.length
  const alreadyLikedThisPost = likes.includes(userId)

  const templatePost = `
    <section class="postFeed" id="${post.id}">
      <section class="user-info"
        <figure class="avatar">
        <img src="${post.data().avatar}" height="50px" width="50px">
          <figcaption class="username">${post.data().name}</figcaption>
        </figure>
        <article class="post-date">${date}</article>
      </section>  
      <article class="text-posts">${post.data().text}</article>
      <section class="buttons-posts"> 
        <button id="like-${post.id}" class="icon-post">
          <figure class="likes-counting">
            <img 
              id="like" 
              class="like ${alreadyLikedThisPost ? 'postLiked' : ''}" 
              data-post-id="${post.id}" 
              src="../../img/heart.png" height="20px" width="20px"
            /> 
            <figcaption class="text-posts">${likesQuantity}</figcaption>  
          </figure>
        </button>
        <button class="icon-post delete">
          <figure>
            <img src="../../img/recycle-bin.png" height="20px" width="20px">
          </figure>  
        </button>
      </section>  
    </section>
  `;
  //-------- EVENTOS QUE CHAMAM AS FUNÇÕES DO FEED ---------\\
  // document.querySelector("#feed").innerHTML += templatePost;
  const newPostElement = new DOMParser().parseFromString(
    templatePost,
    "text/html"
  ).body.childNodes[0];
  document.querySelector("#feed").appendChild(newPostElement);
  document
    .querySelector(`#like-${post.id} .like`)
    .addEventListener("click", likePost);
  //document.querySelector("#delete").addEventListener("click", deletePost);
}
//------------ FUNÇÃO DE CARREGAR PUBLICAÇÕES ------------\\ FIREBASE
function loadPosts() {
  const userId = firebase.auth().currentUser.uid;
  const postCollection = firebase.firestore().collection("posts");
  document.querySelector("#feed").innerHTML = "Carregando...";
  postCollection
    .orderBy("time", "desc")
    .get()
    .then((snapshot) => {
      document.querySelector("#feed").innerHTML = "";
      snapshot.forEach((post) => {
        printPosts(post, userId);
      });
    });
}
//-------------- FUNÇÃO DE PEGAR ID DO POST --------------\\
function getPostClick(e) {
  let closestDelete = e.target.closest(".delete");
  let closestIdPost = closestDelete.parentNode.parentNode.id;
  deletePost(closestIdPost);
}
//------------------- FUNÇÃO DE DELETE -------------------\\ FIREBASE
// function deletePost(postID){
//   const postCollection = firebase.firestore().collection("posts");
//   if (confirm("Você quer realmente quer excluir essa publicação?")) {
//     postCollection.doc(postID).delete().then(doc => {
//       loadPosts();
//     });
//   }
// }
//--------------------- FUNÇÃO DE LIKE -------------------\\
function likePost(e) {
  const postId = e.target.dataset.postId;
  const userId = firebase.auth().currentUser.uid;

  const postRef = firebase.firestore().collection("posts").doc(postId);

  postRef.get()
    .then(post => {
      const likes = post.data().likes || []
      const alreadyLikedThisPost = likes.includes(userId)

      if (alreadyLikedThisPost) {
        postRef.update({ likes: firebase.firestore.FieldValue.arrayRemove(userId) })
          .finally(() => loadPosts())
      } else {
        postRef.update({ likes: firebase.firestore.FieldValue.arrayUnion(userId) })
          .finally(() => loadPosts())
      }
    })
    .catch(exception =>
      console.error('Erro ao dar like no post. Erro:' + exception.message
      ))
}

