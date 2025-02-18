import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Validation configuration
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// **DOM ELEMENTS**
const editPopupElement = document
  .querySelector("#edit-profile-form")
  .closest(".popup");
const addPopupElement = document
  .querySelector("#add-location-form")
  .closest(".popup");
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const popupNameInput = document.querySelector("#profile-name");
const popupAboutInput = document.querySelector("#profile-about");
const titleInput = document.querySelector("#location-title");
const imageLinkInput = document.querySelector("#location-url");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardsContainerSelector = ".cards";

// **INITIAL CARDS ARRAY**
const cardsData = [
  { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
  { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
  { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
  { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
  { title: "Miami", imageLink: "./images/image5.jpeg" },
  { title: "New York", imageLink: "./images/image6.jpeg" },
];

// **INSTANTIATING CLASSES**
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

// Creating the image popup
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// Creating the image gallery
const section = new Section(
  {
    items: cardsData,
    renderer: (item) => {
      const card = new Card(item, "#card-template", (imageLink, title) => {
        imagePopup.open(imageLink, title);
      });
      section.addItem(card.generateCard());
    },
  },
  cardsContainerSelector
);

section.renderItems();

// Creating the profile edit popup
const editPopup = new PopupWithForm(".popup", (formData) => {
  userInfo.setUserInfo(formData);
  editPopup.close();
});
editPopup.setEventListeners();

// Creating the card addition popup
const addPopup = new PopupWithForm(".popup_add", (formData) => {
  const card = new Card(formData, "#card-template", (imageLink, title) => {
    imagePopup.open(imageLink, title);
  });
  section.addItem(card.generateCard());
  addPopup.close();
});
addPopup.setEventListeners();

// EVENTS
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupNameInput.value = userData.name;
  popupAboutInput.value = userData.about;
  editPopup.open();
});

addButton.addEventListener("click", () => {
  addPopup.open();
});

// Enabling validation
const editFormValidator = new FormValidator(validationConfig, editPopupElement);
const addFormValidator = new FormValidator(validationConfig, addPopupElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
