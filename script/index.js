import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "6647861c-8d62-46dc-8104-a5239f6fd2fd",
    "Content-Type": "application/json",
  },
});

document.addEventListener("DOMContentLoaded", () => {
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

  // Cards fixos que sempre aparecem
  const fixedCards = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  // Renderiza primeiro os cards fixos
  fixedCards.forEach((card) => {
    const cardElement = createCard(card);
    cardSection.addItem(cardElement);
  });

  // Depois os do servidor
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
