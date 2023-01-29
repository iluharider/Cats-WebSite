const cardsContainer = document.querySelector('.cards');
const openPopUpButton = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');

popupAddCat.setEventListener;

cats.forEach((cat) => {
    const cardInstance = new catCard(cat, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
})

openPopUpButton.addEventListener('click', () => popupAddCat.open());
formAddCat.setEventListener('submit', () => popupAddCat.close())