import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import "../pages/index.css";

import img1 from "../images/image1.jpeg";
import img2 from "../images/image2.jpeg";
import img3 from "../images/image3.jpeg";
import img4 from "../images/image4.jpeg";
import img5 from "../images/image5.jpeg";
import img6 from "../images/image6.jpeg";
import logo from "../images/Vector.webp";
import line from "../images/Line.png";
import profileImage from "../images/image.jpg";
import trashIcon from "../images/images__button/trash.svg";
import closeIcon from "../images/images__button/close_button.png";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "6647861c-8d62-46dc-8104-a5239f6fd2fd",
    "Content-Type": "application/json",
  },
});

document.addEventListener("DOMContentLoaded", () => {
  // Inserção dinâmica de imagens globais
  document.querySelector(".header__logo").src = logo;
  document.querySelector(".header__line").src = line;
  document.querySelector(".profile__avatar").src = profileImage;

  const template = document.querySelector("#card-template");
  const trashBtn = template.content.querySelector(".cards__trash img");
  trashBtn.src = trashIcon;

  const closeButtons = document.querySelectorAll(".popup__close");
  closeButtons.forEach((btn) => {
    btn.style.backgroundImage = `url(${closeIcon})`;
    btn.style.backgroundRepeat = "no-repeat";
    btn.style.backgroundSize = "cover";
    btn.style.backgroundPosition = "center";
  });

  const validationConfig = {
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const editForm = document.querySelector("#edit-profile-form");
  const addForm = document.querySelector("#add-location-form");
  const avatarForm = document.querySelector("#update-avatar-form");

  const popupNameInput = document.querySelector("#profile-name");
  const popupAboutInput = document.querySelector("#profile-about");
  const titleInput = document.querySelector("#location-title");
  const imageLinkInput = document.querySelector("#location-url");
  const avatarLinkInput = document.querySelector("#avatar-link");

  const editButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-button");
  const avatarEditIcon = document.querySelector(".profile__avatar-container");

  const cardsContainerSelector = ".cards";
  const templateSelector = "#card-template";

  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar",
  });

  const imagePopup = new PopupWithImage(".popup_type_image");
  imagePopup.setEventListeners();

  const editProfilePopup = new PopupWithForm(".popup", (formData) => {
    api
      .updateUserInfo({
        name: formData.name,
        about: formData.about,
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      })
      .catch((err) => console.error("Erro ao atualizar perfil:", err));
  });
  editProfilePopup.setEventListeners();

  const addCardPopup = new PopupWithForm(".popup_add", (formData) => {
    api
      .addCard({ name: formData.title, link: formData.url })
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement);
        addCardPopup.close();
      })
      .catch((err) => console.error("Erro ao adicionar card:", err));
  });
  addCardPopup.setEventListeners();

  const updateAvatarPopup = new PopupWithForm(
    ".popup_update-avatar",
    (formData) => {
      api
        .updateAvatar(formData.avatar)
        .then((res) => {
          userInfo.setAvatar(res.avatar);
          updateAvatarPopup.close();
        })
        .catch((err) => console.error("Erro ao atualizar avatar:", err));
    }
  );
  updateAvatarPopup.setEventListeners();

  function handleCardClick(imageLink, title) {
    imagePopup.open(imageLink, title);
  }

  function createCard(data) {
    const card = new Card(
      data,
      templateSelector,
      handleCardClick,
      (cardId) => {
        if (!cardId) return Promise.resolve({ isLiked: true });
        return api.likeCard(cardId);
      },
      (cardId) => {
        if (!cardId) return Promise.resolve({ isLiked: false });
        return api.unlikeCard(cardId);
      },
      (cardId) => {
        if (!cardId) {
          return Promise.resolve();
        }
        return api.deleteCard(cardId);
      }
    );
    return card.generateCard();
  }

  const cardSection = new Section(
    {
      items: [],
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      },
    },
    cardsContainerSelector
  );

  const fixedCards = [
    { title: "Minneapolis, MN", imageLink: img1 },
    { title: "Hollywood, CA", imageLink: img2 },
    { title: "Golden Gate Bridge", imageLink: img3 },
    { title: "Las Vegas", imageLink: img4 },
    { title: "Miami", imageLink: img5 },
    { title: "New York", imageLink: img6 },
  ];

  fixedCards.forEach((card) => {
    const cardElement = createCard(card);
    cardSection.addItem(cardElement);
  });

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        _id: userData._id,
      });
      userInfo.setAvatar(userData.avatar);

      cards.reverse().forEach((item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar dados iniciais:", err);
    });

  editButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupNameInput.value = userData.name;
    popupAboutInput.value = userData.about;
    editProfilePopup.open();
  });

  addButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  avatarEditIcon.addEventListener("click", () => {
    updateAvatarPopup.open();
  });

  const editFormValidator = new FormValidator(validationConfig, editForm);
  const addFormValidator = new FormValidator(validationConfig, addForm);
  const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

  editFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
});
