import { enableValidation } from "./validate.js";

document.addEventListener("DOMContentLoaded", () => {
  const validationConfig = {
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  enableValidation(validationConfig);

  const cardsData = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  const template = document.querySelector("#card-template").content;

  function renderCards(cardsArray) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";
    cardsArray.forEach((card) =>
      addNewLocationCard(card.title, card.imageLink)
    );
  }

  renderCards(cardsData);

  const editButton = document.querySelector(".profile__edit-button");
  const editPopup = document
    .querySelector("#edit-profile-form")
    .closest(".popup");
  const editPopupCloseButton = editPopup.querySelector(".popup__close");
  const editForm = document.querySelector("#edit-profile-form");
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

  editPopupCloseButton.addEventListener("click", () => {
    editPopup.classList.remove("popup_opened");
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;
    editPopup.classList.remove("popup_opened");
  });

  const addButton = document.querySelector(".profile__add-button");
  const addPopup = document
    .querySelector("#add-location-form")
    .closest(".popup");
  const addPopupCloseButton = addPopup.querySelector(".popup__close");
  const addForm = document.querySelector("#add-location-form");
  const titleInput = document.querySelector("#location-title");
  const imageLinkInput = document.querySelector("#location-url");

  addButton.addEventListener("click", () => {
    resetValidation(addPopup, validationConfig);
    addPopup.classList.add("popup_opened");
  });

  addPopupCloseButton.addEventListener("click", () => {
    addPopup.classList.remove("popup_opened");
  });

  addForm.addEventListener("submit", (event) => {
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

  function addNewLocationCard(title, imageLink) {
    const cardsContainer = document.querySelector(".cards");
    const cardElement = template.cloneNode(true).firstElementChild;

    const cardImage = cardElement.querySelector(".cards__image");
    cardImage.src = imageLink;
    cardImage.alt = title;
    cardImage.addEventListener("click", () => openImagePopup(imageLink, title));

    const cardTitle = cardElement.querySelector(".cards__title");
    cardTitle.textContent = title;

    const trashButton = cardElement.querySelector(".cards__trash");
    trashButton.addEventListener("click", () => cardElement.remove());

    cardsContainer.prepend(cardElement);
  }

  function openImagePopup(imageSrc, title) {
    const imagePopup = document.createElement("div");
    imagePopup.classList.add("popup", "popup_opened");

    const container = document.createElement("div");
    container.classList.add("popup__container_large");

    const closeButton = document.createElement("button");
    closeButton.classList.add("popup__image_close");
    closeButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
      imagePopup.remove();
    });

    const image = document.createElement("img");
    image.classList.add("popup__image-large");
    image.src = imageSrc;
    image.alt = title;

    const popupTitle = document.createElement("h2");
    popupTitle.classList.add("popup__title");
    popupTitle.textContent = title;

    container.appendChild(closeButton);
    container.appendChild(image);
    container.appendChild(popupTitle);

    imagePopup.appendChild(container);
    document.body.appendChild(imagePopup);
  }

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

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      event.target.classList.remove("popup_opened");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
      }
    }
  });
});
