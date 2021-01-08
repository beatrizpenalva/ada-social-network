import { onNavigate } from '../../utils/history.js';
import { getError } from '../../errors/index.js';
export const signInEmail = (email, password) => {
  const getUser = firebase.auth().signInWithEmailAndPassword(email, password);
  getUser
    .then(() => {
      onNavigate('/');
    })
    .catch(err => {
      getError(err);
    });
}
export const signUpGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider)
    .then(() => {
      onNavigate('/')
    }).catch(err => {
      getError(err);
    });
}
export const signUpFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(facebookProvider)
    .then(() => {
      onNavigate('/');
    }).catch(err => {
      getError(err);
    });
}
export const signUpGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(githubProvider)
    .then(() => {
      onNavigate('/');
    })
    .catch(err => {
      getError(err);
    });
}
export const logOut = () => {
  const promise = firebase.auth().signOut();
    promise.then(() => { onNavigate('/login') });
}















/*
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

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
 /*
 Dúvida:
 Não haver usuários repetidos (só e-mail ou nome também?).
 Definir um formato de senha (número de caracteres, strings, number, etc.).
 E inserir uma mensagem de erro, caso a mensagem não atenda aos requisitos.
 "auth/weak-password": "A senha é muito fraca.",
 */
/*
const posts = [
  { message: "Post 1" },
  { message: "Post 2" }
]
export const getPosts = () => {
  //depois alterar para o get do firebase
  return posts;
}
export const createPost = (post) => {
  //alterar para o add do firebase
  posts.push(
    { message: `${post} ${posts.length + 1} ` }
  )
}
//alterar para o banco de dados do firebase
const users = [
  {
    "name": "Beatriz Penalva",
    "email": "biapenalva@gmail.com",
    "password": "salvadormeuamor",
    "bio": "Arquiteta de formação e futura deva",
    "needs": [
      "Firebase",
      "Node.js",
      "Vue.js",
    ],
    "abilities": [
      "CSS",
      "JavaScript",
      "HTML",
      "Figma",
    ],
    "github": "https://github.com/beatrizpenalva",
    "linkedin": "https://www.linkedin.com/in/beatrizpenalva/",
    "twitter": "@beatripenalva_",
  },
  {
    "name": "Gabrielle Almeida",
    "email": "gabriellealmeida.lab@gmail.com",
    "password": "vitors2",
    "bio": "Amo ler e sou muito comunicativa, gosto bastante de UX e estou em transição de carreira",
    "needs": [
      "Firebase",
      "Node.js",
    ],
    "abilities": [
      "JavaScript",
      "React.JS",
      "Bootstrap",
    ],
    "github": "@gabialmeida",
    "linkedin": "Gabrielle Almeida",
    "twitter": "não",
  },
  {
    "name": "Julia Terin",
    "email": "jujugatinha@gmail.com",
    "password": "jujuba",
    "bio": "Cientista social, produtora musical e futura deva",
    "needs": [
      "Firebase",
      "PHP",
    ],
    "abilities": [
      "CSS",
      "JavaScript",
      "HTML",
    ],
    "github": "@juterin",
    "linkedin": "Julia Terin",
    "twitter": "não",
  }
]
export const getUsers = () => {
  return users;
}
*/