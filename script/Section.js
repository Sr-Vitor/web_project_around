export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    if (typeof containerSelector === "string") {
      this._container = document.querySelector(containerSelector);
    } else {
      console.error("containerSelector needs to be a CSS selector (string).");
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
