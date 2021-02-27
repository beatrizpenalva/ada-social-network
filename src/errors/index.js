const verifyErrorCode = {
  'auth/invalid-email': 'O endereço de e-mail não é válido. Por favor, preencha novamente.',
  'auth/wrong-password': 'Senha incorreta. Por favor, tente novamente.',
  'auth/email-already-in-use': 'O e-mail fornecido já está cadastrado. Por favor, forneça um novo endereço.',
  'auth/email-already-exists': 'O e-mail fornecido já está cadastrado. Por favor, forneça um novo endereço.',
  'auth/invalid-email-verified': 'O e-mail é inválido.',
  'auth/user-not-found': 'Não há registro desse usuário. Por favor, registre-se para ter acesso à nossa rede.',
  'auth/account-exists-with-different-credential': 'E-mail já associado a outra conta. Por favor, tente com um novo endereço.',
  'auth/weak-password': 'A senha é muito fraca.',
  'auth/invalid-password': 'Senha inválida, precisa ter pelo menos 6 caracteres. Por favor, tente novamente.',
  'auth/cancelled-popup-request': 'Somente uma solicitação de janela pop-up é permitida de uma só vez.',
  'auth/popup-blocked': 'A janela pop-up foi bloqueado pelo navegador. Por favor, desabilite o bloqueio para continuar.',
  'auth/popup-closed-by-user': 'A janela pop-up foi fechada antes de concluir o login. Por favor, tente novamente.',
  'auth/network-request-failed': 'Ocorreu uma falha de conexão com a rede. Por favor, tente novamente.',
};

export const getError = (err) => {
  const errorCode = err.code;
  const errorMessage = verifyErrorCode[errorCode];
  if (!errorMessage) {
    errorMessage = 'Ops! Ocorreu algum erro, por favor, tente novamente.';
  }
  printMessageError(errorMessage);
};

export const printMessageError = (message) => {
  const elementError = document.createElement('p');
  const errorMessage = document.createTextNode(message);
  elementError.appendChild(errorMessage);
  document.getElementById('error-login').innerHTML = '';
  document.getElementById('error-login').appendChild(elementError);
};

export const timelineMessageError = (err) => {
  window.alert('Ops! Ocorreu algum erro, por favor, tente novamente.');
  //mostrar o erro de maneira correta pro desenvolvedor
  console.log(err);
};
