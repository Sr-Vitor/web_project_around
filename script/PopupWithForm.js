import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");

    if (!this._form) {
      console.error(
        `Erro: Formulário não encontrado dentro do popup: ${popupSelector}`
      );
    }
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".popup__input");
    const formData = {};
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
