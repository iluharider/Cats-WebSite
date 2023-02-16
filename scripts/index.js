import { api } from "./api.js";
import { catCard } from "./card.js";
import { Popup } from "./popup.js";
import { serializeForm } from "./utilities.js";

const cardsContainer = document.querySelector('.cards');
const openPopUpButton = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const formEditCat = document.querySelector('#popup-form-edit');

const popupAddCat = new Popup('popup-add-cats');
const popupEditCat = new Popup('popup-edit-cats');

function createCat(data) {
    const cardInstance = new catCard(data, '#card-template', onClickToEdit);
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
}

// function handleCatTitle(cardInstance) {
//     console.log({cardInstance});
//     cardInfoInstance.setData(cardInstance);
// }

// const cardInfoInstance = new CatsInfo('#cats-info-template', handleCatDelete);

// const CatsInfoElement = cardInfoInstance.getElement();


function handleAddForm(e, isEdited) {
    e.preventDefault();

    if (isEdited){
        const elementsFormCat = [...formEditCat.elements];
        const dataFromForm = serializeForm(elementsFormCat);
        api.updateCatById(dataFromForm.id, dataFromForm);
        return popupEditCat.close();
    }

    const elementsFromForm = [...formAddCat.elements];
    const dataFromForm = serializeForm(elementsFromForm);

    api.addNewCat(dataFromForm);
    createCat(dataFromForm);
    const oldStorage = JSON.parse(localStorage.getItem('cats'));
    oldStorage.push(dataFromForm);
    localStorage.setItem('cats', JSON.stringify(oldStorage));
    const setTime = new Date(new Date().getTime() + 10000);
    localStorage.setItem('catsRefresh', setTime);
    popupAddCat.close();

    return dataFromForm;
}

// cats.forEach((cat) => createCat(cat));

popupAddCat.setCloseEventListener();
popupEditCat.setCloseEventListener();


openPopUpButton.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleAddForm);
formEditCat.addEventListener('submit', (e) => handleAddForm(e, true));


function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    console.log({localData});
    const getTimeExpires = localStorage.getItem('catsRefresh');
    if (localData && localData.length && new Date() < new Date(getTimeExpires)) {
        console.log('>>>>>>>>>>localData');
        localData.forEach((cat) => createCat(cat));
    } else {
        console.log('>>>>>>>>>api.getAllCats');
        api.getAllCats().then((data) => {
            localStorage.setItem('cats', JSON.stringify(data));
            data.forEach((cat) => {
                createCat(cat);
            })
        })
    const setTime = new Date(new Date().getTime() + 10000);
    localStorage.setItem('catsRefresh', setTime);
    }
}   
checkLocalStorage();

function onClickToEdit(card, id) {
    popupEditCat.setContent(card, id);
    const isEdited = true;
    popupEditCat.open();
}
 
// document.cookie = 'Luke=IamYourFather';

// Cookies.set('YourName','DifferentValue');
// console.log(Cookies.get('YourName'));

// // const storage = window.localStorage.setItem;
// // console.log({storage});