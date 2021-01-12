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

export const logOut = () => {
  firebase.auth().signOut().then(() => { 
    onNavigate('/login')
  });
}

function singUpProvider(provider) {
  firebase.auth().signInWithPopup(provider)
  .then(() => {
    getUser();
  }).catch(err => {
    getError(err);
  });
}

/*
firebase.auth().signInWithRedirect(provider)
function getUser(){
  firebase.auth().getRedirectResult().then((user) => {
    if(user) {
      onNavigate('/')
    }
  })  
}
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
  //firebase.auth().signInWithRedirect(googleProvider)
    //onNavigate('/')
  //const user = firebase.auth().currentUser;
  //console.log(user)
  //onNavigate('/')
 //.then(() => {
 //}
 //.catch(err => {
   // getError(err);
 //})