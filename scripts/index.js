const cardsContainer = document.querySelector('.cards');
const openPopUpButton = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');
// const deleteButton = document.querySelector('#card-template').content.querySelector('#card-delete');
// console.log(deleteButton);

function handleAddForm(e) {
    e.preventDefault();

    const elementsFromForm = [...formAddCat.elements];
    const dataFromForm = serializeForm(elementsFromForm);

    api.addNewCat(dataFromForm);
    createCat(dataFromForm);
    popupAddCat.close();

    return dataFromForm;
}

// function deleteCat(cat) {
//     console.log(cat)
// }

// cats.forEach((cat) => createCat(cat));

popupAddCat.setEventListener();

openPopUpButton.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleAddForm);

api.getAllCats()
    .then((data) => 
        data.forEach((cat) => {
            createCat(cat);
            // const btnDelete = document.addEventListener('click', () => deleteCat(cat))
    }));