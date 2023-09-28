class Photographer {
    constructor(photographer) {
        this._photographer = photographer;
    }
// Création de la carte photographe
    createPhotographerCard() {
        const photographersSection = document.getElementById("photographer_section");
        const picture = `./assets/photographers/${this._photographer.portrait}`;
        const href = `photographer.html?id=${this._photographer.id}`;
        const a = document.createElement('a')
        photographersSection.appendChild(a)
        const photographerCard = `
            <article>
                <img  alt="${this._photographer.name}" src="${picture}" />
                <h2>${this._photographer.name}</h2>
                <p>${this._photographer.city}, ${this._photographer.country}</p>
                <strong>${this._photographer.tagline}</strong>
                <span>${this._photographer.price}€/jour</span>
            </article>
        `;
        a.href = href;
        a.innerHTML = photographerCard;
        return a;
    }
}
