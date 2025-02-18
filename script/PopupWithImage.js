import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image-large");
    this._caption = this._popup.querySelector(".popup__title");
    this._closeButton = this._popup.querySelector(".popup__image_close"); // Add the close button
  }

  open(imageLink, title) {
    this._image.src = imageLink;
    this._image.alt = title;
    this._caption.textContent = title;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._closeButton) {
      this._closeButton.addEventListener("click", () => this.close());
    }
  }
}
