import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

  const cardsContainerSelector = ".cards";
  const templateSelector = "#card-template";

  const cardsData = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  // Popup com Imagem
  const imagePopup = new PopupWithImage(".popup_type_image");
  imagePopup.setEventListeners();

  function handleCardClick(imageLink, title) {
    imagePopup.open(imageLink, title);
  }

  function createCard(data) {
    const card = new Card(data, templateSelector, handleCardClick);
    return card.generateCard();
  }

  const cardSection = new Section(
    {
      items: cardsData,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      },
    },
    cardsContainerSelector
  );

  cardSection.renderItems();

  editButton.addEventListener("click", () => {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
    editPopup.classList.add("popup_opened");
  });

  addButton.addEventListener("click", () => {
    addPopup.classList.add("popup_opened");
  });

  editPopupCloseButton.addEventListener("click", () =>
    editPopup.classList.remove("popup_opened")
  );
  addPopupCloseButton.addEventListener("click", () =>
    addPopup.classList.remove("popup_opened")
  );

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;
    editPopup.classList.remove("popup_opened");
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const imageLink = imageLinkInput.value.trim();
    if (title && imageLink) {
      const newCard = createCard({ title, imageLink });
      cardSection.addItem(newCard);
      addForm.reset();
      addPopup.classList.remove("popup_opened");
    }
  });

  const editFormValidator = new FormValidator(validationConfig, editForm);
  const addFormValidator = new FormValidator(validationConfig, addForm);

  editFormValidator.enableValidation();
  addFormValidator.enableValidation();
});
