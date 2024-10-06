document.addEventListener("DOMContentLoaded", () => {
  // Seleção de elementos
  const addButton = document.querySelector(".profile__edit-button"); // Botão para abrir o popup
  const popup = document.querySelector(".popup"); // Elemento do popup
  const closeButton = document.querySelector(".popup__close"); // Botão de fechar o popup
  const saveButton = document.querySelector(".popup__submit"); // Botão de salvar as alterações

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
    popup.classList.add("popup_opened");
  });

  // Função para fechar o popup
  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });

  // Função para salvar as alterações e atualizar o perfil
  saveButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do botão de submit (recarregar a página)

    // Atualizar o nome e a descrição do perfil com os valores dos inputs
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    // Fechar o popup após salvar
    popup.classList.remove("popup_opened");
  });
});
