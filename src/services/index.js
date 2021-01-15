import { getError } from '../errors/index.js';

export const verifyUserLogged = (callback) => {
  return firebase.auth().onAuthStateChanged(callback);
}

export const getCurrentUser = () => {
  return firebase.auth().currentUser
}

export const signInEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const getGoogleProvider = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  singUpProvider(googleProvider);
}

export const getFacebookProvider = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  singUpProvider(facebookProvider);
}

export const getGitHubProvider = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  singUpProvider(githubProvider);
}

const singUpProvider = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then(() => {
    })
    .catch(err => {
      getError(err);
    });
}

export const logOut = () => {
  return firebase.auth().signOut()
}

export const getPosts = () => {
  return firebase.firestore().collection("posts").orderBy("time", "desc").get()
}

export const createNewPost = (post) => {
  return firebase.firestore().collection("posts").add(post)
}

export const editPost = (postID, newPostText) => {
  return firebase.firestore().collection("posts").doc(postID).update({ text: newPostText })
}

export const deletePost = (postID) => {
  return firebase.firestore().collection("posts").doc(postID).delete()
}

export const likePost = (postID) => {
  const postId = postID;
  console.log(postId)
}
