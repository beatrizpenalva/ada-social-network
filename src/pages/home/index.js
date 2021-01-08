import { logOut } from '../../services/index.js'
import { onNavigate } from '../../utils/history.js';
export const Home = () => {
  window.addEventListener("load", verifyUserLogged);
  const rootElement = document.createElement('div');
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
  const publishButton = rootElement.querySelector("#postForm");
  const logOutButton = rootElement.querySelector("#logout");
  const feed = rootElement.querySelector("#feed");
  publishButton.addEventListener("submit", e => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    createPost(text)
    rootElement.querySelector("#postText").value = "";
  });
  logOutButton.addEventListener("click", logOut);
  feed.addEventListener("click", getPostClick);
  return rootElement;
};
function verifyUserLogged(){
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onNavigate('/')
      loadPosts();
    } else {
      onNavigate('/login')
    }
  });
}
function createPost(text) {
  const now = new Date;
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
    likes: 0,
  }
  const postCollection = firebase.firestore().collection("posts");
  postCollection.add(post).then(res => {
    loadPosts();
  })
}
function printPosts(post) {
  const templatePost = `
    <section class="postFeed" id="${post.id}">
      <section class="user-info"
        <figure class="avatar">
        <img src="${post.data().avatar}" height="50px" width="50px">
          <figcaption class="username">${post.data().name}</figcaption>
        </figure>
        <article class="post-date">${post.data().date}/${post.data().month}/${post.data().year}</article>
      </section>  
      <article class="text-posts">${post.data().text}</article>
      <section class="buttons-posts"> 
        <button id="like" class="icon-post">
          <figure class="likes-counting">
            <img id="like" class="like" src="../../img/heart.png" height="20px" width="20px"> 
            <figcaption class="text-posts">${post.data().likes}</figcaption>  
          </figure>
        </button>
        <button class="icon-post">
        <figure>
          <img id="edit-button" class="edit-button" src="../../img/recycle-bin.png" height="20px" width="20px">
        </figure>  
      </button>
        <button class="icon-post delete">
          <figure>
            <img id="delete-button" src="../../img/recycle-bin.png" height="20px" width="20px">
          </figure>  
        </button>
      </section>  
    </section>
  `  
  document.querySelector("#feed").innerHTML += templatePost;
  //const newPostElement = new DOMParser().parseFromString(templatePost, 'text/html').body.childNodes[0]
  //document.querySelector("#feed").appendChild(newPostElement)
  //document.querySelector(`#like-${post.id}`).addEventListener("click", likePost);
}
function loadPosts() {
  const postCollection = firebase.firestore().collection("posts");
  document.querySelector("#feed").innerHTML = "Carregando...";
  postCollection.orderBy("time", "desc").get().then(snapshot => {
    document.querySelector("#feed").innerHTML = "";
    snapshot.forEach(post => {
      printPosts(post);
    });
  });
}
function getPostClick(e) {
  if (e.target.closest(".delete")) {
    let closestDelete = e.target.closest(".delete");
    let closestIdPost = closestDelete.parentNode.parentNode.id;
    deletePost(closestIdPost);
  } else {
  let closestEdit = e.target.closest(".edit-button")
  let closestIdPost = closestEdit.parentNode.parentNode.id;
  editPost(closestIdPost);
  }
}
function deletePost(postID){
  const postCollection = firebase.firestore().collection("posts");
  if (confirm("Você quer realmente quer excluir essa publicação?")) {
    postCollection.doc(postID).delete().then(doc => {
      loadPosts();
    }); 
  }
}
function editPost(){
  console.log("Pegou o click")
}

/*
function editPost(){
  console.log("foi");
  const postCollection = firebase.firestore().collection("posts");
  postCollection.doc(id).update((text: text)).then(() => {
    count.innerText = countNumber
  }
}
editPost()
*/
//deixar a textarea editável, aparecer mais dois botões de salvar ou cancelar.
//salvar: pegar o conteúdo do input.
//método update do firebase
//diferença nos posts
















//------------------- FUNÇÃO DE EDITAR ------------------\\
//-------------------- FUNÇÃO DE COMENTAR ------------------\\ HE _ 1
//---------------------- POSTAR IMAGEM ---------------------\\ HE _ 2
//--------------- ADICIONAR OU EXCLUIR AMIGOS --------------\\ HE _ 3
//-------------------- PÚBLICO OU PRIVADO ------------------\\ HE _ 4
//---------------------- EDITAR PERFIL ---------------------\\ HE _ 5
//-------------- TIMELINE PERFIL PERSONALIZADA -------------\\ HE _ 6
