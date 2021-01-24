import { printPosts, createCommentBox } from '../../components/posts.js';
import { navBar } from '../../components/navbar.js';
import { getPosts, createNewPost, getCurrentUser, getCommentsById } from '../../services/index.js';
import { timelineMessageError } from '../../errors/index.js';

export const Home = () => {
  const rootElement = document.createElement('main');
  rootElement.innerHTML = `
    <section class="timeline">
      <section id="header"></section>
      <form id="publish-form">
        <textarea id="postText" class="text" spellcheck="true" maxlength="500" wrap="hard" placeholder="O que você quer compartilhar?" required></textarea>
          <section class="publish-button"> 
            <label for="file" class="hidden">
              <figure class="input-file">
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

  const publishButton = rootElement.querySelector('#publish-form');
  publishButton.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = rootElement.querySelector('#postText').value;
    getPostInfo(text);
    rootElement.querySelector('#postText').value = '';
  });

  return rootElement;
};

export const loadPosts = () => {
  const currentUser = getCurrentUser();

  getPosts()
    .then((snapshot) => {
      snapshot.forEach((post) => {
        feed.appendChild(printPosts(post.data(), post.id, currentUser.uid));
       
        getCommentsById(post.id)
          .then((commentSnapshot) => {
            if(commentSnapshot.empty) return
            const commentsCollection = commentSnapshot.docs;
            orderComments(commentsCollection).forEach((comment) => {
              const commentBox = document.querySelector(`#comment-${post.id}`);
              commentBox.prepend(createCommentBox(comment.data(), comment.id, currentUser.uid))
            })
          })
      });
      header.appendChild(navBar());
    });
};

const getPostInfo = (text) => {
  const post = createPostObject(text);

  createNewPost(post)
    .then((res) => {
      const postId = res.id;
      feed.prepend(printPosts(post, postId, post.userID));
    })
    .catch(timelineMessageError);
};

const createPostObject = (text) => {
  const user = getCurrentUser();
  const userName = user.displayName;
  const userID = user.uid;
  const userAvatar = user.photoURL;
  const now = new Date();

  const post = {
    name: userName,
    avatar: userAvatar,
    userID,
    time: Date.now(),
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    text,
    likes: [],
  };

  return post;
};

const orderComments = (data) => {
  const orderByTime = data.sort(function (a, b) {
    if (a.data().time < b.data().time) return 1;
    if (a.data().time > b.data().time) return -1;
    return 0;
  })
  return orderByTime
}
