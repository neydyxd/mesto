
import {config} from '../components/config.js';
import { initialCards } from '../components/Contains.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import './index.css';
import Api from '../components/Api.js';

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupOverlayEdit = document.querySelector('.popup__form_edit');
const popupOverlayAdd = document.querySelector('.popup__form_add');
const popupOverlayPhoto = document.querySelector('.popup-photo__container');
const popupOverlayAvatar = document.querySelector('.popup__form_avatar');
const buttonEdit = document.querySelector('.profile__edit-button');
const firstName = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const buttonCloseEdit = document.querySelector('.popup__close');
const buttonCloseAdd = document.querySelector('.popup__close-add')
const popupEditName = document.querySelector('.popup__input_name');
const popupEditAbout = document.querySelector('.popup__input_about');
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupFormAdd = document.querySelector('.popup__form_add');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_name');
const inputAbout = document.querySelector('.popup__input_about');
const imagePopupCloseButton = document.querySelector('.popup-photo__close');
const popupImage = document.querySelector('.popup-photo__image');
const popupSubtitle = document.querySelector('.popup-photo__subtitle');
const popupPhoto = document.querySelector('.popup-photo');
const buttonAddSave = document.querySelector('.popup__save_add');
const poster = document.querySelector('.poster');
const photoButton = document.querySelector('.poster__photo-button');
const popupEditAvatar = document.querySelector('.popup-avatar')
const avatarButton = document.querySelector('.profile__avatar-button')
const buttonCloseAvatar = document.querySelector('.popup__close-avatar');
const popupDelete = document.querySelector('.popup-delete');

const validationProfileForm = new FormValidator(config, popupOverlayEdit);
validationProfileForm.enableValidation();

const validationCardForm = new FormValidator(config, popupOverlayAdd);
validationCardForm.enableValidation();

const validationAvatarForm = new FormValidator(config, popupOverlayAvatar);
validationAvatarForm.enableValidation();

const cardDelete = new PopupWithConfirm(popupDelete, deleteMyCard);

const api = new Api(
  `https://mesto.nomoreparties.co/v1/cohort-61`,
  `29be019e-c08f-4e81-b274-91fdbf94fa96`
);
let currentUserId;

Promise.all([api.getCards(), api.getCurrentUser()]).then(
  ([initialCards, user]) => {
    profileUserInfo.setUserInfo(user);
    currentUserId = user._id;
    cardList.renderItems(initialCards);
  }
);

function createCard(item) {
  const card = new Card(
    item,
    currentUserId,
    `.poster-template`,
    handleCardClick,
    handleCardByClick,
    likeMyCard,
    deletelikeMyCard
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardByClick(id, cardElement) {
  cardDelete.open(id, cardElement);
}

function deleteMyCard(id, cardElement) {
  cardDelete.renderLoadingDelete(true);
  api
    .deleteCard(id)
    .then(() => {
      cardElement.remove();
      cardDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardDelete.renderLoadingDelete(false);
    });
}

function likeMyCard(id, cardElement) {
  api
    .putLike(id)
    .then((res) => {
      cardElement.likeCard(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletelikeMyCard(id, cardElement) {
  api
    .deleteLike(id)
    .then((res) => {
      cardElement.likeCard(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  '.poster'
);

const popupAddCard = new PopupWithForm(popupAdd, (data) => {
  popupAddCard.renderLoadingSave(true);
  api.createNewCard(data).then((newItem) => {
    cardList.addItem(createCard(newItem));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAddCard.renderLoadingSave(false);
  });
});
popupAddCard.setEventListeners();
cardDelete.setEventListeners();


const popupAvatar = new PopupWithForm(popupEditAvatar,myAvatar);

function myAvatar(data) {
  popupAvatar.renderLoadingSave(true);
  api.createNewAvatar(data).then((item) => {
      profileUserInfo.setUserInfo(item);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoadingSave(false);
    });
    
}

avatarButton.addEventListener('click', () => {
  popupAvatar.open();
});

buttonCloseAvatar.addEventListener('click', () => {
  popupAvatar.close();
});

popupAvatar.setEventListeners();

const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();

const avatarInfo = document.querySelector('.profile__avatar')

const profileUserInfo = new UserInfo({
  name: firstName,
  about: about,
  avatar: avatarInfo,
});


const popupEditProfile = new PopupWithForm(popupEdit, myProfile);
popupEditProfile.setEventListeners();

function myProfile(data) {
  popupEditProfile.renderLoadingSave(true);
  api.createNewProfile(data).then((item) => {
      profileUserInfo.setUserInfo(item);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoadingSave(false);
    });
}

buttonEdit.addEventListener(`click`, (e) => {
  e.preventDefault();
  popupEditProfile.open();
  const data = profileUserInfo.getUserInfo();
  inputName.value = data.name;
  inputAbout.value = data.about;
});

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  });
  
buttonCloseAdd.addEventListener('click', () => {
  popupAddCard.close();
  });

imagePopupCloseButton.addEventListener('click', () => {
  popupWithImage.close();
  });
  
buttonCloseEdit.addEventListener('click', () => {
  popupEditProfile.close();
    });
  

    function handleCardClick(name, link) {
      popupWithImage.open(name, link);
    }



export {handleCardClick};