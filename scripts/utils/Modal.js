class Modal {
    constructor(){
        this._modal = document.getElementById("contact-modal");
        this._main = document.querySelector("body");
    }
    
    displayModal() {
        const closeBtn = document.getElementById("close-btn");
        const firstInputFocus = document.getElementById("first-name");
        this._main.setAttribute('aria-hidden', 'true');
        this._modal.style.display = "block";
        this._modal.setAttribute('aria-hidden', 'false');
        firstInputFocus.focus();
        // fermeture modal par la touche Esc
        document.addEventListener('keyup', (e)=>{
            this.onEscKey(e);
        });
        closeBtn.addEventListener('keyup', (e)=>{
            this.onEnterKey(e);
        });
    }

    closeModal() {
        this._main.setAttribute('aria-hidden', 'false');
        this._modal.style.display = "none";
        this._modal.setAttribute('aria-hidden', 'true');
    }

    // Affichage du nom photographe dans le formulaire
    photographerName(data) {
        var name = document.getElementById('form-name');
        name.innerHTML = `${data.name}`;
    }

    // Au clic sur ESC on ferme la modal
    onEscKey(e)
    {
        // Codes des touches du clavier.
        const TOUCHE_ESC = 27;
        switch(e.keyCode)
        {
            case TOUCHE_ESC:
            this.closeModal();
            break;
        }
    } 
    onEnterKey(e)
    {
        // Codes des touches du clavier.
        const TOUCHE_ENTREE = 13;
        switch(e.keyCode)
        {
            case TOUCHE_ENTREE:
            this.closeModal();
            break;
        }
    } 
}