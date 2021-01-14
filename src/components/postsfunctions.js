import { editPost, deletePost, likePost } from '../../services/index.js'

export const sendDelete = (e) => {
    const getEvent = e.target;
    const getPostId = getEvent.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    deletePost(getPostId)
        .then(doc => {
            if (confirm("Você quer realmente quer excluir essa publicação?")) {
                const postCard = document.getElementById(postID)
                const parentElement = postCard.parentElement;
                parentElement.removeChild(postCard);
            }
        })
        .catch(() => {
            alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
        })
}

export const showEditContainer = (e) => {
    const postID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    const postCard = document.getElementById(postID);
    toggleEditContainer(postCard, true);

    const cancelEditionButton = postCard.querySelector(".cancel-edition");
    const sendEditionButton = postCard.querySelector(".send-button");

    cancelEditionButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleEditContainer(postCard, false);
    })
    sendEditionButton.addEventListener("click", (e) => {
        e.preventDefault();
        sendEdition(postID, postCard);
    })
}

function sendEdition(postId, post) {
    const postCard = post;
    const postID = postId;
    const editionBox = postCard.querySelector(".edition-content");
    const newPostText = editionBox.value;
    if (newPostText !== null) {
        editPost(postID, newPostText)
            .then(() => {
                toggleEditContainer(postCard, false);
                const text = postCard.querySelector(".post-content");
                text.innerHTML = newPostText;
            })
            .catch(() => {
                alert("Ops! Ocorreu algum erro, por favor, tente novamente!")
            })
    }
}

function toggleEditContainer(post, show) {
    const postCard = post;
    const holderEditionContainer = postCard.querySelector(".on-edition");
    if (show) {
        holderEditionContainer.classList.add("display");
    } else {
        holderEditionContainer.classList.remove("display");
    }
}

export const sendLike = (e) => {
    const getEvent = e.target;
    const getPostId = getEvent.parentNode.parentNode.parentNode.id;
    likePost(getPostId);
}
