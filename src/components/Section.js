export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(initialCards) {
    initialCards.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}