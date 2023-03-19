class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._formButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(formInput) {
    const inputError = this._formElement.querySelector(
      `.${formInput.id}-error`
    );
    formInput.classList.add(this._config.inputErrorClass);
    inputError.textContent = formInput.validationMessage;
    inputError.classList.add(this._config.errorClass);
  }

  //Функция, которая удаляет класс с ошибкой
  _hideInputError(formInput) {
    const inputError = this._formElement.querySelector(
      `.${formInput.id}-error`
    );
    formInput.classList.remove(this._config.inputErrorClass);
    inputError.classList.remove(this._config.errorClass);
    inputError.textContent = ``;
  }

  // Функция, которая проверяет валидность поля
  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  }

  // Функция принимает массив полей
  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  //Функция, которая добавляет класс кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._formButton.classList.remove(this._config.inactiveButtonClass);
      this._formButton.removeAttribute(`disabled`);
    }
  }

  //Функция, которая добавит обработчики сразу всем полям формы
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((formInput) => {
      formInput.addEventListener(`input`, () => {
        this._isValid(formInput);
        this._toggleButtonState();
      });
    });
  }

  //Чтоб не было возможности 2 раза нажать
  _disableSubmitButton() {
    this._formButton.classList.add(this._config.inactiveButtonClass);
    this._formButton.setAttribute(`disabled`, `disabled`);
  }

  enableValidation() {
    this._formElement.addEventListener(`submit`, () => {
      this._disableSubmitButton();
    });
    this._setEventListeners();
  }
}

export default FormValidator;