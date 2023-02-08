// import { api, Api } from "./api";
// import { catCard } from "./card";
// // import { CatsInfo } from "./cats-info";
// // import { Popup } from "./popup";
// import { serializeForm } from "./utilities";

const cardsContainer = document.querySelector('.cards');
const openPopUpButton = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');

function createCat(data) {
    const cardInstance = new catCard(data, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
}

// function handleCatTitle(cardInstance) {
//     console.log({cardInstance});
//     cardInfoInstance.setData(cardInstance);
// }

// const cardInfoInstance = new CatsInfo('#cats-info-template', handleCatDelete);

// const CatsInfoElement = cardInfoInstance.getElement();


function handleAddForm(e) {
    e.preventDefault();

    const elementsFromForm = [...formAddCat.elements];
    const dataFromForm = serializeForm(elementsFromForm);

    api.addNewCat(dataFromForm);
    createCat(dataFromForm);
    popupAddCat.close();

    return dataFromForm;
}

// cats.forEach((cat) => createCat(cat));

popupAddCat.setCloseEventListener();

openPopUpButton.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleAddForm);


// localStorage.setItem('cats', JSON.stringify())

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    console.log(localData);
    const getTimeExpires = localStorage.getItem('catsRefresh');
    const time = true;

    if (!localData && !localData.length && new Date() > new Date(getTimeExpires)) {
        api.getAllCats()
            .then((data) => {
                localStorage.setItem('cats', JSON.stringify(data));
                data.forEach((cat) => createCat(cat));
            });
        const rebootTime = new Date(new Date().getTime() + 60000);
        localStorage.setItem('catsRefresh', rebootTime);
    } else {

    }
}
checkLocalStorage();
 
// document.cookie = 'Luke=IamYourFather';

// Cookies.set('YourName','DifferentValue');
// console.log(Cookies.get('YourName'));

// // const storage = window.localStorage.setItem;
// // console.log({storage});