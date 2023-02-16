export class Popup {
    constructor(className) {
      this._className = className;
      this.popup = document.querySelector(`.${className}`);
      this._catchEscape = this._catchEscape.bind(this);
    }
  
    _catchEscape(event) {
      if (event.key == 'Escape')
        this.close();
    }

    open() {
      this.popup.classList.add('popup_active');
      document.addEventListener('keyup', this._catchEscape);
    }
  
    close() {
      this.popup.classList.remove('popup_active');
      document.removeEventListener('keyup', this._catchEscape);
    }

    setContent(content, id) {
      console.log({id});
      // const cardImage = content.querySelector('card__image').src;
      // const cardLink = content.querySelector('card__link').textContent;
      const elements = [...document.querySelector('#popup-form-edit').elements];

      elements.forEach((input) => {
        if (input.type == 'submit') return;
        if (input.name == 'id') {
          input.value = id;
          return (input.disabled = true);
        }
        if (input.type != 'checkbox') input.value = '';
        if (input.type == 'checkbox') input.checked = true;

      });
    }

    setCloseEventListener() {
      this.popup.addEventListener('click', (event) => {
        if (event.target.classList.contains(this._className) || event.target.closest('.popup__close')) 
          this.close(); 
      })
    }
  }