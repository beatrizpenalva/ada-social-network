import { onNavigate } from '../../utils/history.js';
export const Home = () => {
  //----------------- TODO: TRATAR ERROS ----------------\\
  //----- FUNÇÃO DE VERIFICAR SE O USUÁRIO TÁ LOGADO ----\\
  window.addEventListener("load", event => {
    event.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onNavigate('/')
        loadPosts();
      } else {
        onNavigate('/login')
      }
    });
  })
  //------------ CRIANDO O TEMPLATE DA PÁGINA -----------\\ 
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <section class="timeline">
        <nav class="cover">
          <figure class="logo-feed-desktop">
            <button id="home" class="button-icon-feed"><img src="../../img/ada-cover.png"></button>
            <figcaption class="logo-name-desktop">[ Ada ]</figcaption>
          </figure>
          <section class="nav-feed">
            <input type="search" id="search">
            <button id="profile" class="button-icon-feed"><img src="../../img/google.svg" height="35px" width="35px"></button>
            <button id="about" class="button-icon-feed"><img src="../../img/google.svg" height="35px" width="35px"></button>
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
  const publish = rootElement.querySelector("#postForm");
  const logOut = rootElement.querySelector("#logout");
  //------------------- FUNÇÃO DE LOGOUT -------------------\\
  logOut.addEventListener("click", () => {
    const promise = firebase.auth().signOut();
    promise.then(() => { onNavigate('/login') });
  });
  //-------------- FUNÇÃO DE CRIAR PUBLICAÇÃO --------------\\
  publish.addEventListener("submit", event => {
    event.preventDefault();
    const text = rootElement.querySelector("#postText").value;
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
      rootElement.querySelector("#postText").value = "";
// <<<<<<<<<<<<<<<<<<<< MUDANÇA >>>>>>>>>>>>>>>>>>>> \\
/*
deleteButton.forEach(button => {
            button.addEventListener('click', (event) => {
                let deleteBtn = event.target.parentNode.querySelector('.delete-button');
                ReviewPost(deleteBtn.dataset.id).get()
                    .then(post => {
                        if(post.data().userUid === UserInfoUid()){
                            if(confirm("Are you sure you want to delete it?")){
                                deleteReviews(deleteBtn.dataset.id);
                            }
                        }else {
                            alert("You can't delete a post from another person!")
                        }
                    })
            })
        })

      */
      loadPosts();
    })
  });
  return rootElement;
};
//------------- FUNÇÃO DE PRINTAR PUBLICAÇÃO -------------\\
function printPosts(post) {
  const templatePost = `
    <section class="postFeed" id="${post.data().id}">
      <section class="user-info"
        <figure class="avatar">
        <img src="${post.data().avatar}" height="50px" width="50px">
          <figcaption class="username">${post.data().name}</figcaption>
        </figure>
        <article class="post-date">${post.data().date}/${post.data().month}/${post.data().year}</article>
      </section>  
      <article class="text-posts">${post.data().text}</article>
      <section class="buttons-posts"> 
        <button class="icon-post">
          <figure class="likes-counting">
            <img id="like" class="like" src="../../img/heart.png" height="20px" width="20px"> 
            <figcaption class="text-posts">${post.data().likes}</figcaption>  
          </figure>
        </button>
        <button class="icon-post">
          <figure>
            <img id="delete" class="delete" src="../../img/recycle-bin.png" height="20px" width="20px">
          </figure>  
        </button>
      </section>  
    </section>
  `  
//-------- EVENTOS QUE CHAMAM AS FUNÇÕES DO FEED ---------\\
  document.querySelector("#feed").innerHTML += templatePost;
  document.addEventListener("click", function(e){
    let closest = e.target.closest(".like");
    if (closest && document.contains(closest)){
    likePost();
    }
  })
  document.addEventListener("click", function(e){
    let closest = e.target.closest(".delete");
    const postID = post.id;
    if (closest && document.contains(closest)){
    deletePost(postID);
    }
  })
}
//------------ FUNÇÃO DE CARREGAR PUBLICAÇÕES ------------\\
function loadPosts() {
  const postCollection = firebase.firestore().collection("posts");
//-------- TODO: Animação de carregando a página ---------\\
  document.querySelector("#feed").innerHTML = "Carregando...";
  postCollection.orderBy("time", "desc").get().then(snapshot => {
    document.querySelector("#feed").innerHTML = "";
    snapshot.forEach(post => {
      printPosts(post);
    });
  });
}
//----------------- FUNÇÃO DE EXCLUIR -----------------\\
function deletePost(postID){
  const postCollection = firebase.firestore().collection("posts");
  if (confirm("Você quer realmente quer excluir essa publicação?")) {
    postCollection.doc(postID).delete().then(doc => {
      console.log("Document successfully deleted!");
      loadPosts();
    }); 
  }
}
//--------------------- FUNÇÃO DE LIKE -------------------\\
function likePost(){
  console.log("deixou o joinha");
}
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


//usar a referência coleção para printar os posts?
//var usersCollectionRef = db.collection('users');
//referência à um documento dentro da coleção: var alovelaceDocumentRef = db.doc('users/alovelace');
//público x privado: sub-coleção, coleção usuário, sub-coleção post público e sub-coleção post privado
/*
Estilo:
Login, colocar pra aparecer aquela coisinha branca com o nome do que aquele ícone vai
 redirecionar. Post: outline e margin button.
*/
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
