import { logOut } from '../../services/index.js'
import { onNavigate } from '../../utils/history.js';

export const Home = () => {
  window.addEventListener("load", verifyUserLogged);

  const rootElement = document.createElement("main");
  rootElement.innerHTML = `
      <section class="timeline">
        <nav class="cover">
          <figure class="logo-feed-desktop">
            <button id="home" class="button-icon-feed"><img src="../../img/ada-cover.png"></button>
            <figcaption class="logo-name-desktop">[ Ada ]</figcaption>
          </figure>

          <section class="nav-feed">
            <button id="logout" class="button-icon-feed"><img src="../../img/logout.svg" height="35px" width="35px"></button>
            <button id="profile" class="button-icon-feed"><img src="../../img/logout.svg" height="35px" width="35px"></button>
          </section>
        </nav>

        <section class="posts">
          <form id="postForm">
            <textarea spellcheck="true" maxlength="500" wrap="hard" class="text" id="postText" placeholder="O que você quer compartilhar?" required></textarea>

            <section class="publish-button"> 
              <label for="file">
                <figure class="input-file" >
                  <img src="../../img/icon-picture.svg" height="20px" width="20px">
                </figure>  
                <input type="file" id="file" accept="image/png, image/jpeg">
                </label>
              <button type="submit" class="enter-button" id="publish">Publicar</button> 
            </section>  
          </form>  
        </section>

        <section id="feed" class="posts"></section>
      </section>
  `;

  const publishButton = rootElement.querySelector("#postForm");
  const logOutButton = rootElement.querySelector("#logout");
  const feed = rootElement.querySelector("#feed");

  publishButton.addEventListener("submit", e => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    getPostInfo(text);
    rootElement.querySelector("#postText").value = "";
  });
  logOutButton.addEventListener("click", logOut);
  feed.addEventListener("click", getPostClick);
  feed.addEventListener("change", getPostChange);

  return rootElement;
};

function verifyUserLogged() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onNavigate('/')
      loadPosts();
    } else {
      onNavigate('/login')
    }
  });
}

function getPostInfo(text) {
  const user = firebase.auth().currentUser;
  const userName = user.displayName;
  const userID = user.uid;
  const userAvatar = user.photoURL;
  const now = new Date;

  const post = {
    name: userName,
    avatar: userAvatar,
    ID: userID,
    time: Date.now(),
    date: now.getDate(), 
    month: now.getMonth() + 1, 
    year: now.getFullYear(),
    text: text,
    likes: 0,
  }
  createPost(post);
}

function createPost(post) {
  const postCollection = firebase.firestore().collection("posts");
  postCollection.add(post).then(res => {
    loadPosts();
  })
}

function printPosts(post, currentUserID) {
  if (post.data().ID !== currentUserID) {
    const templatePost = `
      <section class="postFeed" id="${post.id}">  
        <section class="left-post"> 
          <img class="avatar" src="${post.data().avatar}" height="60px" width="60px">
        </section>

        <section class="right-post">
          <article class="post-info"
            <h4 class="username">${post.data().name}</p>
            <p class="post-date">${post.data().date}/${post.data().month}/${post.data().year}</p>
          </article>   

          <article class="text-posts">${post.data().text}</article>

          <section class="buttons-posts">
            <input type="checkbox" id="heart-like-${post.id}" class="icon-post like" hidden>  
            <label for="heart-like-${post.id}">
              ❤
            </label> 
            <p class="text-posts">${post.data().likes}</p>   
          </section>

        </section>
      </section>
    `  
    document.querySelector("#feed").innerHTML += templatePost;
  }
  else {
    const templatePost = `
    <section class="postFeed" id="${post.id}">  
      <section class="left-post">
        <figure>  
          <img class="avatar" src="${post.data().avatar}" height="60px" width="60px">
        </figure>  
      </section>

      <section class="right-post">
        <article class="post-info"
          <h4 class="username">${post.data().name}</p>
          <p class="post-date">${post.data().date}/${post.data().month}/${post.data().year}</p>
        </article>   
        <article class="text-posts">${post.data().text}</article>
        <section class="buttons-posts">
          <button class="icon-post edit">
            <figure>
              <img id="edit-button" src="../../img/edit.png" height="20px" width="20px">
            </figure>  
          </button>

          <button class="icon-post delete">
            <figure>
              <img id="delete-button" src="../../img/delete.png" height="20px" width="20px">
            </figure>  
          </button>
        </section>  
      </section>  
    </section>
    `
    document.querySelector("#feed").innerHTML += templatePost;
  }  
}

function loadPosts() {
  const postCollection = firebase.firestore().collection("posts");
  document.querySelector("#feed").innerHTML = "Carregando...";
  postCollection.orderBy("time", "desc").get().then(snapshot => {
    document.querySelector("#feed").innerHTML = "";
    snapshot.forEach(post => {
      const currentUser = firebase.auth().currentUser.uid;
      printPosts(post, currentUser);
    });  
  });
}

function getPostClick(e) {
  if (e.target.closest(".delete")) {
    let closestDelete = e.target.closest(".delete");
    let closestIdPost = closestDelete.parentNode.parentNode.parentNode.id;
    deletePost(closestIdPost);
  } 
  else if (e.target.closest(".edit")) {
    let closestEdit = e.target.closest(".edit");
    let closestIdPost = closestEdit.parentNode.parentNode.parentNode.id;
    editPost(closestIdPost);
  } 
}

function getPostChange(e) {
  let closestLike = e.target.closest(".like");
  let closestIdPost = closestLike.parentNode.parentNode.id;
  likePost(closestIdPost);
}

function deletePost(postID) {
  const postCollection = firebase.firestore().collection("posts");
  const userUID = firebase.auth().currentUser.uid;
  if (confirm("Você quer realmente quer excluir essa publicação?")) {
    if(postID !== userUID) {
    postCollection.doc(postID).delete().then(doc => {
      loadPosts();
    });
    } 
  }
}

function editPost(postID) {
  const newText = prompt("Edite seu texto");
  if (newText !== null) {
    const postCollection = firebase.firestore().collection("posts");
    postCollection.doc(postID).update({text: newText}).then(() => {
      loadPosts();
    })
  }    
}

function likePost() {
  console.log("biscoito");
}









//função criar um novo usuário
//-------------------- FUNÇÃO DE COMENTAR ------------------\\ HE _ 1
//---------------------- POSTAR IMAGEM ---------------------\\ HE _ 2
//--------------- ADICIONAR OU EXCLUIR AMIGOS --------------\\ HE _ 3
//-------------------- PÚBLICO OU PRIVADO ------------------\\ HE _ 4
//---------------------- EDITAR PERFIL ---------------------\\ HE _ 5
//-------------- TIMELINE PERFIL PERSONALIZADA -------------\\ HE _ 6
