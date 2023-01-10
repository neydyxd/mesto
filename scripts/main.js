let popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
let edit = document.querySelector('.profile__edit-button');
let firstName = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let close = document.querySelector('.popup__close');
let closeAdd = document.querySelector('.popup__close-add')
let popupName = document.getElementById('0');
let popupAbout = document.getElementById('1');
let popupForm = document.querySelector('.popup__form');
let add = document.querySelector('.profile__add-button');
let saveButton = document.querySelector('.popup__save');
const posterContainer = document.querySelector('.poster');
const posterTemplate = document.querySelector('.poster-template').content.querySelector('.poster__item');
const inputTitle = document.getElementById('2');
const inputLink = document.getElementById('3');
const popupCloseButton = document.querySelector('.popup-photo__close');
const popupImage = document.querySelector('.popup-photo__image');
const popupSubtitle = document.querySelector('.popup-photo__subtitle');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


  function showEdit(){
    popup.classList.add('popup_opened');
    popupName.value = firstName.textContent;
    popupAbout.value = about.textContent;
}

function closeEdit(){
    popup.classList.remove('popup_opened');
}


function showAdd(){
    popupAdd.classList.add('popup_opened');
}

function closedAdd(){
    popupAdd.classList.remove('popup_opened');
}


function formSubmit(evt){
    evt.preventDefault();
    firstName.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closeEdit();
}


add.addEventListener('click',showAdd);
edit.addEventListener('click',showEdit);
close.addEventListener('click',closeEdit);
closeAdd.addEventListener('click',closedAdd);
popupForm.addEventListener('submit',formSubmit);


function addPosterEventListeners (poster){
  const deleteButton = poster.querySelector('.poster__delete-button');

  const deletePoster = () => {
  poster.remove();
  }
  deleteButton.addEventListener('click', deletePoster);

  const likeButton = poster.querySelector('.poster__like-button');
  function eventLike(){
    if (likeButton.classList.contains('poster__like-button_active')){
      likeButton.classList.remove('poster__like-button_active');
    } else {
      likeButton.classList.add('poster__like-button_active');
    }
    
  };
  likeButton.addEventListener('click',eventLike);
}


function createCard(name,link){
  const poster = posterTemplate.cloneNode(true);
  const posterTitle = poster.querySelector('.poster__title');
  posterTitle.textContent = name;
  const posterImg = poster.querySelector('.poster__photo');
  posterImg.src = link;
  addPosterEventListeners(poster);
  const photoButton = poster.querySelector('.poster__photo-button');
  function openPoster(){
    const popupPhoto = document.querySelector('.popup-photo');
    popupPhoto.classList.add('popup-photo_opened');
    popupImage.src = posterImg.src;
    popupSubtitle.textContent = posterTitle.textContent;
    console.log(popupPhoto); 
  }

  function closePoster(){
    const popupPhoto = document.querySelector('.popup-photo');
    popupPhoto.classList.remove('popup-photo_opened');
  }
  photoButton.addEventListener('click',openPoster);
  popupCloseButton.addEventListener('click',closePoster);
  
  return poster;
}


function renderPosters(){
  initialCards.map(function(item){
    const posterHtml = createCard(item.name,item.link);
    posterContainer.append(posterHtml);
  });
}

function formAlert (event){
  event.preventDefault();
  const newPoster = createCard(inputTitle.value,inputLink.value);
  posterContainer.prepend(newPoster);
  popupAdd.classList.remove('popup_opened');
  inputTitle.value ='';
  inputLink.value = '';
}

renderPosters();

popupAdd.addEventListener('submit',formAlert);









