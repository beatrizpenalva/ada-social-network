import { printPosts } from '../../components/posts.js'
import { logOut } from '../../services/index.js'

export const Home = () => {
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
  
      <form id="publish-form">
        <textarea id="postText" class="text" spellcheck="true" maxlength="500" wrap="hard" placeholder="O que você quer compartilhar?" required></textarea>

          <section class="publish-button"> 
            <label for="file">
              <figure class="input-file" >
                <img src="../../img/icon-picture.svg" height="20px" width="20px">
              </figure>  
              <input type="file" id="file" accept="image/png, image/jpeg">
            </label>
            <button type="submit" id="publish" class="enter-button">Publicar</button> 
          </section>  
      </form>  
      <section id="feed"></section>
    </section>
  `;
  //ao invés de enter-button chamar o botão de submit
  //rever a nav também

  const publishButton = rootElement.querySelector("#publish-form");
  const logOutButton = rootElement.querySelector("#logout");
  const feed = rootElement.querySelector("#feed");

  publishButton.addEventListener("submit", e => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    getPostInfo(text);
    rootElement.querySelector("#postText").value = "";
  });
  logOutButton.addEventListener("click", logOut);

  //isso aqui vai sumir
  //feed.addEventListener("click", getPostClick);
  //feed.addEventListener("change", getPostChange);
  return rootElement;
};

export const loadPosts = () => { 
  const postCollection = firebase.firestore().collection("posts");
  postCollection.orderBy("time", "desc").get().then(snapshot => {
    snapshot.forEach(post => {
      feed.appendChild(printPosts(post.data()));
    });
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
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    text: text,
    likes: 0,
  }
  createNewPost(post);
}

function createNewPost(post) {
  const postCollection = firebase.firestore().collection("posts");
  postCollection.add(post).then(res => {
      feed.prepend(printPosts(post));
    })
}

/*
const likeButtonArray = rootElement.querySelectorAll(".like");
  likeButtonArray.forEach((button) => {
    button.addEventListener('click', (e) => {
      sendLike(e);
    });
  });
  
  const sendLike = (e) => {
    likePost()
    .then((res) => {
      console.log(res);
      e.target.classList.add('liked');
    })
    .catch(() => {
      alert('Deu rum ai meu kerido');
    });
  }
  
  function likePost() {
    console.log("biscoito");
  }
  
  const sendComment = (cardPost) => {
    const textareaComment = cardPost.querySelector('.comentar-text');
    const holderCommentBlock = cardPost.querySelector('.on-comment');
  
    commentPost(textareaComment.value)
      .then(() => {
        const textPValue = document.createElement("p");
        textPValue.textContent = textareaComment.value;
        cardPost.insertBefore(textPValue, holderCommentBlock);
        toggleCommentBox(cardPost, false);
        textareaComment.value = "";
      })
      .catch(() => {
        alert('Deu ruim aí');
      })
  }

  const toggleCommentBox = (cardPost, show) => {
    const holderCommentBlock = cardPost.querySelector('.on-comment');

    if(show) {
      holderCommentBlock.classList.add('display');
    } else {
      holderCommentBlock.classList.remove('display');
    }
  }
  */




















  
/*
//pegando os eventos
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

//fazendo as funções que vão pros eventos
function deletePost(postID) {
  const postCollection = firebase.firestore().collection("posts");
  const userUID = firebase.auth().currentUser.uid;
  if (confirm("Você quer realmente quer excluir essa publicação?")) {
    if (postID !== userUID) {
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
    postCollection.doc(postID).update({ text: newText }).then(() => {
      loadPosts();
    })
  }
}
*/



//-------------------- FUNÇÃO DE COMENTAR ------------------\\ HE _ 1
//---------------------- POSTAR IMAGEM ---------------------\\ HE _ 2
//--------------- ADICIONAR OU EXCLUIR AMIGOS --------------\\ HE _ 3
//-------------------- PÚBLICO OU PRIVADO ------------------\\ HE _ 4
//---------------------- EDITAR PERFIL ---------------------\\ HE _ 5
//-------------- TIMELINE PERFIL PERSONALIZADA -------------\\ HE _ 6
