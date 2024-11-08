document.addEventListener("DOMContentLoaded", () => {
  // Array de objetos representando os cartões iniciais
  const cardsData = [
    { title: "Minneapolis, MN", imageLink: "./images/image1.jpeg" },
    { title: "Hollywood, CA", imageLink: "./images/image2.jpeg" },
    { title: "Golden Gate Bridge", imageLink: "./images/image3.jpeg" },
    { title: "Las Vegas", imageLink: "./images/image4.jpeg" },
    { title: "Miami", imageLink: "./images/image5.jpeg" },
    { title: "New York", imageLink: "./images/image6.jpeg" },
  ];

  // Seleção de elementos para o popup de editar perfil
  const editButton = document.querySelector(".profile__edit-button");
  const editPopup = document.querySelector(".popup"); // Popup de edição de perfil
  const closeEditPopupButton = editPopup.querySelector(".popup__close");
  const saveButton = editPopup.querySelector(".popup__submit");

  // Elementos do perfil
  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");

  // Inputs do popup de edição de perfil
  const popupNameInput = document.querySelector(".popup__input_name");
  const popupAboutInput = document.querySelector(".popup__input_about");

  // Função para abrir o popup de edição de perfil e preencher os inputs com valores atuais
  editButton.addEventListener("click", () => {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
    editPopup.classList.add("popup_opened");
  });

  // Função para fechar o popup de edição de perfil
  closeEditPopupButton.addEventListener("click", () => {
    editPopup.classList.remove("popup_opened");
  });

  // Função para salvar as alterações de perfil
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;
    editPopup.classList.remove("popup_opened");
  });

  // Seleção de elementos para o popup de adicionar novo cartão
  const addButton = document.querySelector(".profile__add-button");
  const addPopup = document.querySelector(".popup_add"); // Popup de adição de cartão
  const closeAddPopupButton = addPopup.querySelector(".popup__close");
  const createButton = addPopup.querySelector(".popup__submit");

  // Inputs do popup de adição de cartão
  const titleInput = addPopup.querySelector(".popup__input_title");
  const imageLinkInput = addPopup.querySelector(".popup__input_image-link");

  // Função para abrir o popup de adicionar novo cartão
  addButton.addEventListener("click", () => {
    addPopup.classList.add("popup_add_opened");
  });

  // Função para fechar o popup de adicionar novo cartão
  closeAddPopupButton.addEventListener("click", () => {
    addPopup.classList.remove("popup_add_opened");
  });

  // Lógica para adicionar novo cartão ao clicar em "Criar"
  createButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const imageLink = imageLinkInput.value.trim();

    if (title && imageLink) {
      addNewLocationCard(title, imageLink);
      titleInput.value = "";
      imageLinkInput.value = "";
      addPopup.classList.remove("popup_add_opened");
    }
  });

  // Função para adicionar o novo cartão na seção de cartões
  function addNewLocationCard(title, imageLink) {
    const cardsContainer = document.querySelector(".cards");

    const newCard = document.createElement("div");
    newCard.classList.add("cards__card");

    newCard.innerHTML = `
        <img class="cards__image" src="${imageLink}" alt="${title}" />
        <button class="cards__trash" title="Excluir cartão">
          <img src="./images/images__button/trash.svg" alt="Excluir" />
        </button>
        <div class="cards__group">
          <h2 class="cards__title">${title}</h2>
          <div class="cards__like-icon"></div>
        </div>
      `;

    // Evento de exclusão do cartão
    const deleteButton = newCard.querySelector(".cards__trash");
    deleteButton.addEventListener("click", () => {
      newCard.remove();
    });

    // Evento para abrir a imagem em tamanho grande ao clicar
    const cardImage = newCard.querySelector(".cards__image");
    cardImage.addEventListener("click", () => openImagePopup(imageLink, title));

    cardsContainer.appendChild(newCard);
  }

  // Função para abrir o popup de visualização da imagem em tamanho grande
  function openImagePopup(imageSrc, title) {
    const imagePopup = document.createElement("div");
    imagePopup.classList.add("popup", "popup_opened");

    imagePopup.innerHTML = `
    <div class="popup__container_large">
      <button class="popup__image_close"></button>
      <img src="${imageSrc}" alt="${title}" class="popup__image-large" />
      <h2 class="popup__title">${title}</h2>
    </div>
  `;
    // Evento para fechar o popup ao clicar no botão de fechar
    const closeButton = imagePopup.querySelector(".popup__image_close");
    closeButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
      imagePopup.remove();
    });

    document.body.appendChild(imagePopup);
  }

  // Renderiza os cartões iniciais
  renderCards(cardsData);

  // Função para renderizar todos os cartões a partir do array
  function renderCards(cardsArray) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = ""; // Limpa o contêiner antes de renderizar

    cardsArray.forEach((card) => {
      addNewLocationCard(card.title, card.imageLink);
    });
  }
});
