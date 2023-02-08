class CatsInfo {
    constructor(selectorTemplate, handleCatDelete) {
        this.data = {};
        this.selectorTemplate = selectorTemplate;
        this.handleCatDelete = handleCatDelete;
    }
    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.children[0];
    }
    getElement() {
        this.element = this._getTemplate().cloneNode(true);
        console.log(this.element);
    }
}
