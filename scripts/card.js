class catCard {
    constructor(dataCat, selectorTemplate) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLiked = this.element.querySelector('.card__like');

        if (!this._data.favorite) {
            this.cardLiked.remove();
        }

        this.cardImage.src = this._data.image;
        this.cardTitle.textContent = this._data.name;

        return this.element;
    }
}

const card = new catCard(cats[0], '#card-template')