export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._image = data.imageLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    // Adicionando a Imagem Dinamicamente Dentro do Container
    const cardImage = this._element.querySelector(".cards__image");
    cardImage.src = this._image;
    cardImage.alt = this._title;

    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._image, this._title)
    );

    // Garantindo que o Título Seja Atualizado Corretamente
    this._element.querySelector(".cards__title").textContent = this._title;

    // Evento de Remoção
    this._element
      .querySelector(".cards__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });

    return this._element;
  }
}
