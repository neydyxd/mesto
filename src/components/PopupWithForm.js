import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    this._buttonSubmit = this._popup.querySelector('.popup__save');
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._handleSubmitForm = handleSubmitForm;
    this._buttonSubmitText = this._buttonSubmit.textContent
  }
  _getInputValues() {
    this._data = {};
    this._inputs.forEach((input) => {
        this._data[input.name] = input.value;
    });
    return this._data;
    
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      
    });
    super.setEventListeners();
  }
  
  renderLoadingSave(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}
export default PopupWithForm;