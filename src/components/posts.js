export const printPosts = (doc) => {
    const post = doc;
    const newElement = document.createElement("section");
    newElement.innerHTML = `
        <section class="post-container">  
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
              <input type="checkbox" id="like" class="post-function like" hidden>  
              <label for="like">
                ❤
              </label
              <p class="post-content">${post.likes}</p>   
  
              <button class="post-function edit">
                <figure>
                  <img src="../../img/edit.png" height="20px" width="20px">
                </figure>  
              </button>
  
              <button class="post-function delete">
                <figure>
                  <img src="../../img/delete.png" height="20px" width="20px">
                </figure>  
              </button>
    
              <button class="post-function comment">
                Comment
              </button>
            </section>
  
            <section class="on-comment">
              <textarea class="comment-content"></textarea>
              <button class="send-comment">
                Send
              </button>
            </section>
          </section>
        </section>
       `
    //if (post.data().ID !== currentUserID) {
      return newElement;
  }  