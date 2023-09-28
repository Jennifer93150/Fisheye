class Home {
    constructor() {
        this.photographersSection = document.getElementById('photographer_section');
        this.photographersApi = new photographerApi('./data/photographers.json'); 
    }

    async main() {
        //Concerne la page accueil
        // Tableau des données json (photographers et media)
        const photographersData = await this.photographersApi.getPhotographers();
        // Données "photographers" (name,...)
        const photographers = photographersData.photographers;
        photographers.forEach(photographer => {
             // Appel du template et de sa methode qui creer les cartes photographe
            const photographerModel = new Photographer(photographer);
            const photographerCardDOM = photographerModel.createPhotographerCard();
            this.photographersSection.appendChild(photographerCardDOM);
        })
    }
}

const home = new Home();
home.main();


