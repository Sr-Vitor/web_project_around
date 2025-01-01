import { enableValidation } from "./validate.js";

document.addEventListener("DOMContentLoaded", () => {
  // Configuração de validação
  const validationConfig = {
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  enableValidation(validationConfig);

  // Array de cartões iniciais
  const cardsData = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  // Função para verificar e adicionar dinamicamente os botões de fechar
  function ensureCloseButtons() {
    const popups = document.querySelectorAll(".popup");

    popups.forEach((popup) => {
      // Verifica se o botão de fechar existe
      let closeButton = popup.querySelector(".popup__close");

      if (!closeButton) {
        // Cria o botão de fechar dinamicamente
        closeButton = document.createElement("button");
        closeButton.classList.add("popup__close");
        closeButton.type = "button";

        // Adiciona o botão no popup
        popup.appendChild(closeButton);

        // Adiciona o evento de clique para fechar o popup
        closeButton.addEventListener("click", () => {
          popup.classList.remove("popup_opened");
        });
      }
    });

    console.log("Botões 'X' adicionados dinamicamente aos popups.");
  }

  // Chama a função para garantir que os botões estejam presentes
  ensureCloseButtons();

  // Função para renderizar cartões
  function renderCards(cardsArray) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";
    cardsArray.forEach((card) =>
      addNewLocationCard(card.title, card.imageLink)
    );
  }

  renderCards(cardsData);

  // Seleção de elementos para editar perfil
  const editButton = document.querySelector(".profile__edit-button");
  const editPopup = document
    .querySelector("#edit-profile-form")
    .closest(".popup");
  const saveButton = editPopup.querySelector(".popup__submit");
  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");
  const popupNameInput = document.querySelector("#profile-name");
  const popupAboutInput = document.querySelector("#profile-about");

  editButton.addEventListener("click", () => {
    resetValidation(editPopup, validationConfig);
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
    editPopup.classList.add("popup_opened");
  });

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;
    editPopup.classList.remove("popup_opened");
  });

  // Seleção de elementos para adicionar novo cartão
  const addButton = document.querySelector(".profile__add-button");
  const addPopup = document
    .querySelector("#add-location-form")
    .closest(".popup");
  const createButton = addPopup.querySelector(".popup__submit");
  const titleInput = document.querySelector("#location-title");
  const imageLinkInput = document.querySelector("#location-url");

  addButton.addEventListener("click", () => {
    resetValidation(addPopup, validationConfig);
    addPopup.classList.add("popup_opened");
  });

  createButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const imageLink = imageLinkInput.value.trim();
    if (title && imageLink) {
      addNewLocationCard(title, imageLink);
      titleInput.value = "";
      imageLinkInput.value = "";
      addPopup.classList.remove("popup_opened");
    }
  });

  // Adicionar novo cartão
  function addNewLocationCard(title, imageLink) {
    const cardsContainer = document.querySelector(".cards");
    const newCard = document.createElement("div");
    newCard.classList.add("cards__card");

    newCard.innerHTML = `
      <img src="${imageLink}" alt="${title}" class="cards__image">
      <div class="cards__group">
        <h2 class="cards__title">${title}</h2>
        <button class="cards__like-icon"></button>
      </div>
      <button class="cards__trash">
        <img src="./images/images__button/trash.svg" alt="Trash icon">
      </button>
    `;

    newCard.querySelector(".cards__image").addEventListener("click", () => {
      openImagePopup(imageLink, title);
    });

    newCard
      .querySelector(".cards__trash")
      .addEventListener("click", () => newCard.remove());

    cardsContainer.prepend(newCard);
  }

  // Função para abrir popup de imagem
  function openImagePopup(imageSrc, title) {
    const imagePopup = document.createElement("div");
    imagePopup.classList.add("popup", "popup_opened");

    imagePopup.innerHTML = `
      <div class="popup__container_large">
        <button class="popup__image_close"></button>
        <img src="${imageSrc}" alt="${title}" class="popup__image-large">
        <h2 class="popup__title">${title}</h2>
      </div>
    `;

    const closeButton = imagePopup.querySelector(".popup__image_close");
    closeButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
      imagePopup.remove();
    });

    document.body.appendChild(imagePopup);
  }

  // Resetar validação do formulário
  function resetValidation(popup, config) {
    const form = popup.querySelector(config.formSelector);
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    });

    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }

  // Fechar popups com clique fora
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      event.target.classList.remove("popup_opened");
    }
  });

  // Fechar popups com tecla Esc
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
      }
    }
  });
});
