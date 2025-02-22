import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image-large");
    this._popupCaption = this._popup.querySelector(".popup__title");
  }

  open(imageLink, title) {
    this._popupImage.src = imageLink;
    this._popupImage.alt = title;
    this._popupCaption.textContent = title;
    super.open();
  }
}
