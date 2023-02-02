function createCat(data) {
    const cardInstance = new catCard(data, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
}

function serializeForm(data) {
    const formData = {};

    data.forEach((input) => {
        if (input.type == 'submit')
            return;
        if (input.type != 'checkbox')
            formData[input.name] = input.value; 
        if (input.type == 'checkbox')
            formData[input.name] = input.checked;
    });

    return formData;
}