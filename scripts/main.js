let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let close = document.querySelector('.popup__close');
let popupName = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');
let popupForm = document.querySelector('.popup__form');

function showEdit(){
    popup.classList.add('popup_opened');
    popupName.value = name.textContent;
    popupAbout.value = about.textContent;
}
function closeEdit(){
    popup.classList.remove('popup_opened');
}



function formSubmit(evt){
    evt.preventDefault();
    name.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closeEdit();
}
edit.addEventListener('click',showEdit);
close.addEventListener('click',closeEdit);
popupForm.addEventListener('submit',formSubmit);
