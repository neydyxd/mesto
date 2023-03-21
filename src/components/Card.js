class Card {
  constructor(
    data,
    currentUserId,
    templateSelector,
    handleCardClick,
    handleCartByClick,
    likeMyCard,
    deleteLikeMyCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._isOwner = data.owner._id === currentUserId; //карточку добавила я
    this._owner = data.owner._id;
    this._currentUserId = currentUserId;

    this._handleCartByClick = handleCartByClick;
    this._id = data._id; //id карточки
    this._likes = data.likes;
    this._likeMyCard = likeMyCard;
    this._deleteLikeMyCard = deleteLikeMyCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(`.poster__item`)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //Открытие картинки zoom
    this._cardImage = this._element.querySelector(`.poster__photo`);
    this._cardImage.addEventListener(`click`, () => {
      this._handleCardClick(this._name, this._link);
    });

    // Вешаем слушатель удаление карточки
    this._iconDelete = this._element.querySelector(`.poster__delete-button`);
    this._iconDelete.addEventListener(`click`, () => {
      this._handleCartByClick(this._id, this._element);
    });

    //Вешаем слушатель лайк
    this._iconLike = this._element.querySelector(`.poster__like-button`);
    this._iconLike.addEventListener(`click`, (evt) => {
      this._setLikes(evt);
    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardTitle = this._element.querySelector(`.poster__title`);
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._iconLikeNamber = this._element.querySelector(`.poster__like-number`);
    this._iconLikeNamber.textContent = this._likes.length;

    //Если карточка не создана пользоваателем, удаляем корзину
    if (!this._isOwner) {
      this._element.querySelector(`.poster__delete-button`).remove();
    }

    //при открытие саайта видим поставлены лайки пользователем, либо нет
    if (this._checkLike()) {
      this._iconLike.classList.add(`poster__like-button_active`);
    } else {
      this._iconLike.classList.remove(`poster__like-button_active`);
    }

    // Вернём элемент наружу
    return this._element;
  }

  //кнопка переключения лайка
  likeCard(data) {
    this._iconLikeNamber.textContent = data.likes.length;
    this._iconLike.classList.toggle(`poster__like-button_active`);
  }

  //запросы, зависят от условия если лайк от ползователя, либо нет
  _setLikes(evt) {
    if (evt.target.classList.contains(`poster__like-button_active`)) {
      this._deleteLikeMyCard(this._id, this);
    } else {
      this._likeMyCard(this._id, this);
    }
  }

  //способ понять лайк поставлен пользователем, либо нет
  _checkLike() {
    return this._likes.find((userLike) => userLike._id === this._currentUserId);
  }

  handleRemoveCard() {
    this._element.remove();
  }
}
export default Card;