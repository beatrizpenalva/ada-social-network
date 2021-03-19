import { getError } from "../errors/index.js";

export const verifyUserLogged = (callback) =>
  firebase.auth().onAuthStateChanged(callback);

export const getCurrentUser = () => firebase.auth().currentUser;

export const signInEmail = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signUpGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((user) => {
    saveUserProfile(user.user);
  })
  .catch((err) => {
    getError(err);
  });
};

export const singUpGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("user");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((user) => {
      saveUserProfile(user.user);
    })
    .catch((err) => {
      getError(err);
    });
};

export const logOut = () => firebase.auth().signOut();

export const saveUserProfile = (userName) => {
  const user = getCurrentUser();
  user.updateProfile({ displayName: userName });
};

export const recordNewUser = (userEmail, userPassword) =>
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);

export const getPosts = () =>
  firebase.firestore().collection("posts").orderBy("time", "desc").get();

export const createNewPost = (post) =>
  firebase.firestore().collection("posts").add(post);

export const editPost = (postID, newPostText) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(postID)
    .update({ text: newPostText });

export const deletePost = (postID) =>
  firebase.firestore().collection("posts").doc(postID).delete();

export const alreadyLikedThisPost = (postID) =>
  firebase.firestore().collection("posts").doc(postID).get();

export const removeLike = (postID, userID) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(postID)
    .update({ likes: firebase.firestore.FieldValue.arrayRemove(userID) });

export const likePost = (postID, userID) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(postID)
    .update({ likes: firebase.firestore.FieldValue.arrayUnion(userID) });

export const addComment = (commentObject) =>
  firebase.firestore().collection("comments").add(commentObject);

export const getCommentsById = (postId) =>
  firebase
    .firestore()
    .collection("comments")
    .where("postId", "==", postId)
    .get();

export const deleteComment = (commentID) =>
  firebase.firestore().collection("comments").doc(commentID).delete();

export const alreadyLikedThisComment = (commentID) =>
  firebase.firestore().collection("comments").doc(commentID).get();

export const removeLikeComment = (commentID, userID) =>
  firebase
    .firestore()
    .collection("comments")
    .doc(commentID)
    .update({ likes: firebase.firestore.FieldValue.arrayRemove(userID) });

export const likeComment = (commentID, userID) =>
  firebase
    .firestore()
    .collection("comments")
    .doc(commentID)
    .update({ likes: firebase.firestore.FieldValue.arrayUnion(userID) });
