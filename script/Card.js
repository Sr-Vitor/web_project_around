export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLike,
    handleUnlike,
    handleDelete
  ) {
    this._title = data.name || data.title;
    this._image = data.link || data.imageLink;
    this._id = data._id; // só vem da API
    this._isLiked = data.isLiked || false;
    this._ownerId = data.owner && data.owner._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
  }

  _updateLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add("cards__like-icon_active");
    } else {
      this._likeButton.classList.remove("cards__like-icon_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._image, this._title)
    );

    this._likeButton.addEventListener("click", () => {
      if (!this._id) {
        console.warn(
          "Este card não possui ID e não pode ser curtido/descurtido."
        );
        return; // impede a tentativa de curtir cards fixos
      }

      if (!this._isLiked) {
        this._handleLike(this._id)
          .then((updatedCard) => {
            this._isLiked = true; // ou use updatedCard.isLiked se vier no retorno
            this._updateLikeState();
          })
          .catch((err) => console.error("Erro ao curtir:", err));
      } else {
        this._handleUnlike(this._id)
          .then((updatedCard) => {
            this._isLiked = false; // ou use updatedCard.isLiked se vier no retorno
            this._updateLikeState();
          })
          .catch((err) => console.error("Erro ao descurtir:", err));
      }
    });

    this._deleteButton.addEventListener("click", () => {
      if (!this._id) {
        // Se for um card fixo, apenas remove do DOM
        this.removeCard();
        return;
      }

      this._handleDelete(this._id)
        .then(() => this.removeCard())
        .catch((err) => console.error("Erro ao excluir o card:", err));
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".cards__image");
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    this._element.querySelector(".cards__title").textContent = this._title;

    this._likeButton = this._element.querySelector(".cards__like-icon");
    this._deleteButton = this._element.querySelector(".cards__trash");

    this._updateLikeState();
    this._setEventListeners();

    return this._element;
  }
}
