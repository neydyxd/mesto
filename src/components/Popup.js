class Popup {
    constructor(popup) {
      this._popup = popup;
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add(`popup_opened`);
      document.addEventListener(`keydown`, this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove(`popup_opened`);
      document.removeEventListener(`keydown`, this._handleEscClose);
    }
  
    _handleEscClose(e) {
      if (e.code === `Escape`) {
        this.close();
      }
    }
  
    setEventListeners() {
      this._popup.addEventListener(`mousedown`, (evt) => {
        if (evt.target.classList.contains(`popup_opened`)) {
          this.close();
        }
        if (evt.target.classList.contains(`popup__close`)) {
          this.close();
        }
      });
    }
  }
  
  export default Popup;