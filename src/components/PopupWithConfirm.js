import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popup, deleteMyCard) {
    super(popup);
    this._form = this._popup.querySelector(`.popup__form`);
    this._deleteMyCard = deleteMyCard;
    this._buttonSubmitDelete = this._form.querySelector(`.popup__save_delete`);
  }

  open(cardId, card) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    this._form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this._deleteMyCard(this._cardId, this._card);
      this.close();
    });
    super.setEventListeners();
  }
  
  renderLoadingDelete(isLoading) {
    if (isLoading) {
      this._buttonSubmitDelete.textContent = "Сохранение...";
    } else {
      this._buttonSubmitDelete.textContent = "Да";
    }
  }
}

export default PopupWithConfirm;