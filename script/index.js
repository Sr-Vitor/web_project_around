import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const validationConfig = {
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const editPopup = document
    .querySelector("#edit-profile-form")
    .closest(".popup");
  const addPopup = document
    .querySelector("#add-location-form")
    .closest(".popup");
  const imagePopup = document.querySelector(".popup_type_image");

  const editForm = document.querySelector("#edit-profile-form");
  const addForm = document.querySelector("#add-location-form");

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");
  const popupNameInput = document.querySelector("#profile-name");
  const popupAboutInput = document.querySelector("#profile-about");

  const titleInput = document.querySelector("#location-title");
  const imageLinkInput = document.querySelector("#location-url");

  const editButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-button");
  const editPopupCloseButton = editPopup.querySelector(".popup__close");
  const addPopupCloseButton = addPopup.querySelector(".popup__close");
  const imagePopupCloseButton = imagePopup.querySelector(".popup__image_close");

  const cardsContainer = document.querySelector(".cards");
  const templateSelector = "#card-template";

  const cardsData = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  // Função para lidar com o clique no cartão
  function handleCardClick(imageLink, title) {
    const popupImage = imagePopup.querySelector(".popup__image-large");
    const popupCaption = imagePopup.querySelector(".popup__title");

    popupImage.src = imageLink;
    popupImage.alt = title;
    popupCaption.textContent = title;

    openPopup(imagePopup);
  }

  // Função para renderizar um cartão
  function renderCard(data) {
    const card = new Card(data, templateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
  }

  // Função para renderizar todos os cartões iniciais
  function renderCards(cardsArray) {
    cardsContainer.innerHTML = ""; // Garante que não haja duplicação
    cardsArray.forEach((data) => renderCard(data));
  }

  // Renderiza os cartões iniciais
  renderCards(cardsData);

  // Ações para o botão de editar perfil
  editButton.addEventListener("click", () => {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
    openPopup(editPopup);
  });

  editPopupCloseButton.addEventListener("click", () => closePopup(editPopup));

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;
    closePopup(editPopup);
  });

  // Ações para o botão de adicionar cartão
  addButton.addEventListener("click", () => {
    openPopup(addPopup);
  });

  addPopupCloseButton.addEventListener("click", () => closePopup(addPopup));

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const imageLink = imageLinkInput.value.trim();
    if (title && imageLink) {
      renderCard({ title, imageLink });
      addForm.reset();
      closePopup(addPopup);
    }
  });

  // Ações para o popup de imagem
  imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

  imagePopup.addEventListener("click", (event) => {
    if (event.target === imagePopup) {
      closePopup(imagePopup);
    }
  });

  // Validações dos formulários
  const editFormValidator = new FormValidator(validationConfig, editForm);
  const addFormValidator = new FormValidator(validationConfig, addForm);

  editFormValidator.enableValidation();
  addFormValidator.enableValidation();
});
