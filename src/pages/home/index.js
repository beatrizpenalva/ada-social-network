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
      
      if(alreadyLikedThisPost) {
        postRef.update({ likes: firebase.firestore.FieldValue.arrayRemove(userId)})
          .finally(() => loadPosts())
      } else {
        postRef.update({ likes: firebase.firestore.FieldValue.arrayUnion(userId)})
          .finally(() => loadPosts())
      }
    })
    .catch(exception => 
      console.error('Erro ao dar like no post. Erro:' + exception.message
    ))
}
/*Todas as informações que preciso: 

  ---Clicar no post- saber id do post + uid do usuário---
  O Usuário clicou no post ?
  qual método do fireBase uso para alterar o valor de um elemento

  Para isso preciso com FireBase guardar(propriedade like) os UID de quem clicou no s2 (é armazenado em um array)
  ----Dado que no array estão todos os usuários que clicaram no like
      posso usar o length e assim saber a quantidade de uid do array (quantidade de usuários/likes).

  ----Para garantir que em uid não curta duas x : fazer condições de que if clicou no like este uid 
      é armazenado no array Like else tira este uid do array 

  --- Dar o feedback visual pro usuário -pintar  o coração quando dar like */

//-------- FUNÇÃO DE CARREGAR NOVA PUBLICAÇÃO ---------\\
/*function loadNewPost() {
_set_ nesse momento eu já consigo pegar o ID do post
  firebase.firestore().collection('users')
  .doc(user).set({ role })
  .then(() => setRoled())
}
function loadNewPost() {
      const postCollection = firebase.firestore().collection("posts");
      // Add a new document in collection "cities"
      postCollection.doc("post").set({post})
      .then(function() {
        console.log("Document successfully written!");
        //printPosts(post);
        //document.querySelector("#feed").innerHTML = "";
        //printPosts(post)
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      }
*/
/*
function teste(){
  const postCollection = firebase.firestore().collection("posts");
    postCollection.get().then(snapshot => {
      snapshot.forEach(post => {
        console.log(post.id)
        const elemento = document.querySelector(`#${post.id}`);
        elemento.addEventListener("click", () =>{
          console.log("clicou")
        })
      })
    })
}
*/

//------------------- FUNÇÃO DE EDITAR ------------------\\
//-------------------- HACKER EDITION --------------------\\
//------------------- FUNÇÃO DE COMENTAR ------------------\\
//---------------------- POSTAR IMAGEM ---------------------\\
//--------------- ADICIONAR OU EXCLUIR AMIGOS ---------------\\
//-------------------- PÚBLICO OU PRIVADO --------------------\\
//----------------------- EDITAR PERFIL -----------------------\\
//---------------- TIMELINE PERFIL PERSONALIZADA ---------------\\

/*
//-------------- Fazer a validação do registro ---------------\\
 const signUp = rootElement.querySelector('#signUp');
 signUp.addEventListener("click", e => {
   const email = rootElement.querySelector("#email").value;
   const password = rootElement.querySelector("#password").value;
   if (email === "" || password === "") {
     printMessageError(errorMessageEmptyInput);
   } else {
     const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
     promise
       .then(() => {
         onNavigate('/');
       }).catch(err => {
         const errorCode = err.code;
         const errorMessage = verifyErrorCode[errorCode];
         if (errorMessage == null) {
           errorMessage = err.Message;
         }
         printMessageError(errorMessage);
       });
   }
 });
 Dúvida:
 *Não haver usuários repetidos (só e-mail ou nome também?).
 Definir um formato de senha (número de caracteres, strings, number, etc.).
 E inserir uma mensagem de erro, caso a mensagem não atenda aos requisitos.
 //"auth/weak-password": "A senha é muito fraca.",
 */
/*document.addEventListener("click", function(e){
    let closest = e.target.closest(".like");
    if (closest && document.contains(closest)){
    likePost();
    }
  })
  */
/*
const closestExcluir = event.target.closest(btnExcluir);
if (closestExcluir && feedArea.contains(closestExcluir)) {
  const closestIdPost = closestExcluir.parentNode.querySelector('.id-escondido').innerText;
if (confirm('Tem certeza que deseja excluir esse post?')) {
firebase.firestore().collection('posts').doc(closestIdPost).delete()
.then(() => {});
renderPage();
*/
