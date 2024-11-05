document.addEventListener("DOMContentLoaded", () => {
  // Seleção de elementos para edição de perfil
  const editButton = document.querySelector(".profile__edit-button");
  const editPopup = document.querySelector(".popup");
  const closeEditPopupButton = editPopup.querySelector(".popup__close");
  const saveButton = editPopup.querySelector(".popup__submit");

  // Elementos do perfil
  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");

  // Inputs do popup de edição
  const popupNameInput = document.querySelector(".popup__input_name");
  const popupAboutInput = document.querySelector(".popup__input_about");

  // Função para abrir o popup de edição e preencher os inputs com valores atuais
  editButton.addEventListener("click", () => {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
    editPopup.classList.add("popup_opened");
  });

  // Função para fechar o popup de edição
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

  // Seleção de elementos para adicionar novo local
  const addButton = document.querySelector(".profile__add-button");
  const addPopup = document.querySelector(".popup_add");
  const closeAddPopupButton = addPopup.querySelector(".popup__close");
  const createButton = addPopup.querySelector(".popup__submit");

  // Inputs do popup de adição
  const titleInput = addPopup.querySelector(".popup__input_title");
  const imageLinkInput = addPopup.querySelector(".popup__input_image-link");

  // Função para abrir o popup de adicionar local
  addButton.addEventListener("click", () => {
    addPopup.classList.add("popup_add_opened");
  });

  // Função para fechar o popup de adicionar local
  closeAddPopupButton.addEventListener("click", () => {
    addPopup.classList.remove("popup_add_opened");
  });

  // Lógica para adicionar novo local ao clicar em "Criar"
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

  // Função para adicionar o novo card na seção de cards, incluindo o ícone de exclusão
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

    // Adicionando evento de exclusão para o botão de lixeira do novo cartão
    const deleteButton = newCard.querySelector(".cards__trash");
    deleteButton.addEventListener("click", () => {
      newCard.remove();
    });

    // Adicionando evento para abrir a imagem em tamanho grande ao clicar
    const cardImage = newCard.querySelector(".cards__image");
    cardImage.addEventListener("click", () => openImagePopup(imageLink, title));

    cardsContainer.appendChild(newCard);
  }

  // Função para aplicar a funcionalidade de exclusão e ampliação aos cartões existentes
  function applyCardFunctionsToExistingCards() {
    const existingCards = document.querySelectorAll(".cards__card");

    existingCards.forEach((card) => {
      const deleteButton = card.querySelector(".cards__trash");
      const cardImage = card.querySelector(".cards__image");

      // Adiciona funcionalidade de exclusão, se ainda não estiver aplicada
      if (deleteButton && !deleteButton.hasAttribute("data-event-attached")) {
        deleteButton.addEventListener("click", () => {
          card.remove();
        });
        deleteButton.setAttribute("data-event-attached", "true");
      }

      // Adiciona funcionalidade de abrir a imagem em tamanho grande
      if (cardImage && !cardImage.hasAttribute("data-event-attached")) {
        const imageSrc = cardImage.getAttribute("src");
        const title = card.querySelector(".cards__title").textContent;
        cardImage.addEventListener("click", () =>
          openImagePopup(imageSrc, title)
        );
        cardImage.setAttribute("data-event-attached", "true");
      }
    });
  }

  // Função para abrir o popup de visualização da imagem em tamanho grande
  function openImagePopup(imageSrc, title) {
    const imagePopup = document.createElement("div");
    imagePopup.classList.add("popup", "popup_opened");

    imagePopup.innerHTML = `
    <div class="popup__container popup__container_large">
      <button class="popup__close"></button>
      <img src="${imageSrc}" alt="${title}" class="popup__image-large" />
      <h2 class="popup__title">${title}</h2>
    </div>
  `;

    // Evento para fechar o popup ao clicar no botão de fechar
    const closeButton = imagePopup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
      imagePopup.remove();
    });

    document.body.appendChild(imagePopup);
  }

  // Aplica as funcionalidades aos cartões já existentes
  applyCardFunctionsToExistingCards();
});
