import { api } from "./api.js";

export class catCard {
    constructor(dataCat, selectorTemplate, onClickToEdit) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
        this.onClickToEdit = onClickToEdit;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLiked = this.element.querySelector('.card__like');
        const deleteBtn = this.element.querySelector('.card__delete');
        const cardLink = this.element.querySelector('.card__link');

        deleteBtn.setAttribute('id', this._data.id);
        deleteBtn.addEventListener('click', (e) => {
            if (confirm('Вы точно хотите удалить этого кота?')){
                api.deleteCatById(this._data.id).then(() => {
                    const element = document.getElementById(this._data.id);
                    console.log({element});
                    element.parentElement.remove();
                });
            }
        });


        if (!this._data.favorite) {
            this.cardLiked.remove();
        }

        this.cardImage.src = this._data.image;
        this.cardTitle.textContent = this._data.name;

        cardLink.addEventListener('click', () => {
            this.onClickToEdit(this.element, this._data.id);
        })

        return this.element;
    }

    setEventListener() {
        console.log('', this.cardTitle);
        this.cardTitle.addEventListener('click', () => this._handleCatTitle(this));
    }
}

// const card = new catCard(cats[0], '#card-template')