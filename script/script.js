// document.addEventListener("DOMContentLoaded", () => {
//   const addButton = document.querySelector(".profile__edit-button");
//   const popup = document.querySelector(".pop__container");

//   addButton.addEventListener("click", () => {
//     popup.classList.add("show");
//   });

//   // Você pode adicionar funcionalidade para fechar o popup clicando fora dele
//   popup.addEventListener("click", (event) => {
//     if (event.target === popup) {
//       popup.classList.remove("show");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Popup de Edição de Perfil
  const addButton = document.querySelector(".profile__edit-button"); // Botão para abrir o popup
  const popup = document.querySelector(".popup"); // Elemento do popup
  const closeButton = document.querySelector(".popup__close"); // Botão de fechar o popup

  // Elementos do perfil
  const profileName = document.querySelector(".profile__name"); // Nome no perfil
  const profileAbout = document.querySelector(".profile__about"); // Descrição no perfil

  // Inputs do popup
  const popupNameInput = document.querySelector(".popup__input_name"); // Input do nome no popup
  const popupAboutInput = document.querySelector(".popup__input_about"); // Input da descrição no popup

  // Função para abrir o popup e preencher os inputs
  addButton.addEventListener("click", () => {
    // Preencher os inputs do popup com os valores do perfil
    popupNameInput.value = profileName.textContent; // Define o nome no input
    popupAboutInput.value = profileAbout.textContent; // Define a descrição no input

    // Abrir o popup
    popup.classList.add("popup_opened"); // Adiciona a classe que exibe o popup
  });

  // Função para fechar o popup
  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened"); // Remove a classe para esconder o popup
  });

  // Removido o fechamento ao clicar fora do popup
  // Agora o popup só fecha ao clicar no botão de fechar
  // Controle dos Ícones de Curtida
  const likeIcons = document.querySelectorAll(".cards__like-icon");

  likeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const isLiked = icon.classList.contains("liked");

      if (isLiked) {
        icon.classList.remove("liked");
        icon.style.backgroundImage = "url(../images/group.svg)"; // Ícone descurtido
      } else {
        icon.classList.add("liked");
        icon.style.backgroundImage =
          "url(../images/images__button/like__active.png)"; // Ícone curtido
      }
    });
  });
});
