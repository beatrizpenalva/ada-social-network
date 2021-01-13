import { printPosts } from '../../components/posts.js'
import { logOut, createNewPost } from '../../services/index.js'

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
            <button type="submit" id="publish" class="submit-button">Publicar</button> 
          </section>  
      </form>  
      <section id="feed"></section>
    </section>
  `;

  const publishButton = rootElement.querySelector("#publish-form");
  const logOutButton = rootElement.querySelector("#logout");

  publishButton.addEventListener("submit", e => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    getPostInfo(text);
    rootElement.querySelector("#postText").value = "";
  });
  logOutButton.addEventListener("click", logOut);

  return rootElement;
};

export const loadPosts = () => { 
  firebase.firestore().collection("posts").orderBy("time", "desc").get()
  .then(snapshot => {
    snapshot.forEach(post => {
      feed.appendChild(printPosts(post.data(), post.id));
    });
  })
  .catch(() => {
    alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
  })
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
    comments: [],
  }

  createNewPost(post)
  .then(res => {
    const postId = res.id;
    feed.prepend(printPosts(post, postId));
  })
  .catch(() => {
    alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
  })
}