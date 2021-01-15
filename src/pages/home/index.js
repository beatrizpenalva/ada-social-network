import { printPosts } from '../../components/posts.js'
import { navBar } from '../../components/navbar.js'
import { getPosts, createNewPost, getCurrentUser } from '../../services/index.js'

export const Home = () => {
  const rootElement = document.createElement("main");
  rootElement.innerHTML = `
    <section class="timeline">
      <section id="header"></section>
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
  publishButton.addEventListener("submit", e => {
    e.preventDefault();
    let text = rootElement.querySelector("#postText").value;
    getPostInfo(text);
    rootElement.querySelector("#postText").value = "";
  });

  return rootElement;
};

export const loadPosts = () => {
  const currentUser = getCurrentUser();
  getPosts()
    .then(snapshot => {
      header.appendChild(navBar()); 
      snapshot.forEach(post => {
        feed.appendChild(printPosts(post.data(), post.id, currentUser.uid));
      })  
    })
}

const getPostInfo = () => {
  const post = createPostObject();
  createNewPost(post)
    .then(res => {
      const postId = res.id;
      feed.prepend(printPosts(post, postId, post.userUID));
    })
    .catch(() => {
      alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
    })
}

const createPostObject = (text) => {
  const user = getCurrentUser();
  const userName = user.displayName;
  const userID = user.uid;
  const userAvatar = user.photoURL;
  const now = new Date;

  const post = {
    name: userName,
    avatar: userAvatar,
    userUID: userID,
    time: Date.now(),
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    text: text,
    likes: 0,
    comments: [],
  }

  return post
}
