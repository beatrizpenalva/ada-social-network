const verifyErrorCode = {
    "auth/invalid-email": "O endereço de e-mail não é válido. Por favor, preencha novamente.",
    "auth/invalid-password": "Senha incorreta. Por favor, tente novamente.",
    "auth/email-already-in-use": "O e-mail fornecido já está cadastrado. Por favor, forneça um novo endereço.",
    "auth/user-not-found": "Não há registro desse usuário. Por favor, registre-se para ter acesso à nossa rede.",
    "auth/account-exists-with-different-credential": "E-mail já associado a outra conta. Por favor, tente com um novo endereço.",
    "default": "Ocorreu algum erro. Por favor, tente novamente",
  }
  export const getError = (err) => {
    const errorCode = err.code;
    const errorMessage = verifyErrorCode[errorCode];
    if (errorMessage === null) {
      errorMessage = err.Message;
    }
    printMessageError(errorMessage);
  }
  function printMessageError(message) {
    const elementError = document.createElement("p");
    const errorMessage = document.createTextNode(message);
    elementError.appendChild(errorMessage);
    document.getElementById("error-login").innerHTML = "";
    document.getElementById("error-login").appendChild(elementError);
  }