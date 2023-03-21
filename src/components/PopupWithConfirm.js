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

  changeSubmitHandler(func) {
    this._deleteMyCard = func;
  }

  setEventListeners() {
    this._form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this._deleteMyCard();
    });
    super.setEventListeners();
  }
  
  renderLoadingDelete(isLoading) {
    if (isLoading) {
      this._buttonSubmitDelete.textContent = "Удаление...";
    } else {
      this._buttonSubmitDelete.textContent = "Да";
    }
  }
}

export default PopupWithConfirm;