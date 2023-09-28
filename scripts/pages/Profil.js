class Profil {
    constructor(photographer) {
        this._photographer = photographer
    }
// Création du profil 
    createProfilPhotographer() {
        const profilSection = document.querySelector(".photograph-header");
        const picture = `./assets/photographers/${this._photographer.portrait}`;
        
        const article = document.createElement('article')
        profilSection.appendChild(article)
        article.setAttribute('aria-label',this._photographer.name)
        const profilePage = 
        `
            <div>
                <h1>${this._photographer.name}</h1>
                <span>${this._photographer.city}, ${this._photographer.country}</span><br/>
                <p>${this._photographer.tagline}</p>
            </div>
            <button id="contact-button" class="contact-button" title="Contact Me" type="button" onclick="new Modal().displayModal()">Contactez-moi</button>
            <img title="${this._photographer.name}" src="${picture}" alt="${this._photographer.name}">
        
        `;
        article.innerHTML = profilePage;
        new Modal().photographerName(this._photographer);
        new Form().fields();
        return article;
    }
    // ne fonctionne pas encore
    createProfilIfIdUndefined(){
        const profilSection = document.querySelector(".photograph-header");
        
        const article = document.createElement('div')
        profilSection.appendChild(div)
        const profilePage = 
        `
            <div>
                <h1>Ce photographe n'existe pas</h1>
            </div>
        `;
        article.innerHTML = profilePage;
        return article;
    }
}
