export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._imageLink = data.imageLink;
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

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._imageLink, this._title)
    );

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__image");
    this._deleteButton = this._element.querySelector(".cards__trash");
    this._cardTitle = this._element.querySelector(".cards__title");

    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}
