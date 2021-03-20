
const verifyErrorCode = {
  'mismatch-password': 'The passwords do not match. Please, type again.',
  'auth/invalid-email': 'The email is not valid. Please, try again.',
  'auth/wrong-password': 'Incorrect password. Please, type again.',
  'auth/email-already-in-use': 'Email already in use. Please, try with a new one.',
  'auth/email-already-exists': 'Email already in use. Please, try with a new one.',
  'auth/invalid-email-verified': 'Email invalid. Please, try with a new one.',
  'auth/user-not-found': 'This user is not registered. Please, create an account to have access.',
  'auth/account-exists-with-different-credential': 'Email already in use on a different account. Please, try with a new address.',
  'auth/weak-password': 'The password is too weak. Please, try again.',
  'auth/invalid-password': 'Invalid password. Please, try again.',
  'auth/cancelled-popup-request': 'Only one pop-up window request is allowed at a time.',
  'auth/popup-blocked': 'A pop-up window has been blocked by the browser. Please disable the lock to continue. ',
  'auth/popup-closed-by-user': 'A pop-up window was closed before completing the login. Please try again.',
  'auth/network-request-failed': 'There was a connection failure. Please, try again.',
};

export const getError = (err) => {
  const errorCode = err.code;
  let errorMessage = verifyErrorCode[errorCode];
  if (!errorMessage) {
    errorMessage = 'Ops! Something went wrong. Please, try again.';
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
  window.alert('Ops! Something went wrong. Please, try again.');
  //mostrar o erro de maneira correta pro desenvolvedor
  console.log(err);
};
