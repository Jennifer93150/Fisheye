class PhotographerPage {
    constructor() {
        this.profilSection = document.querySelector('.photograph-header');
        this.gallerySection = document.querySelector('.section-gallery');
        this.photographersApi = new photographerApi('./data/photographers.json');
    }

    async profilPage() {
        //Concerne la page profil
        //if (window.location.pathname.includes("/photographer.html")) {
            // Tableau des données json (photographers et media)
            const photographersData = await this.photographersApi.getPhotographers();
            // Données "photographers" (name,...)
            const photographers = photographersData.photographers;
            const media = photographersData.media;
            const idUrl = window.location.search.split('id=')[1];
            const currentPhotographerData = idUrl ? photographers.filter(photographer => photographer.id == idUrl): null;
            const photographerGallery = idUrl ? media.filter(media => media.photographerId == idUrl) : null;
                // Header de la page profil 
                currentPhotographerData.forEach((photographer) => { 
                    // Appel du template et de sa methode qui creer le profil
                    const profilModel = new Profil(photographer);
                    const profilCardDOM = profilModel.createProfilPhotographer();
                    this.profilSection.appendChild(profilCardDOM);
                });
                // FILTRE
                const filter = new Filter(photographerGallery);
                filter.render();
                // GALLERIE
                const likesArray = [];
                photographerGallery.forEach((gallery) => {
                    //Remplissage tableau avec nbrs de likes de chq photo/video
                    likesArray.push(gallery.likes);
                    const galleryModel = new Gallery(gallery);
                    const galleryCardDOM = galleryModel.createGallery();
                    this.gallerySection.appendChild(galleryCardDOM);
                });
                
                // LIGHTBOX
                const lightBox = new LightBox(photographerGallery);
                lightBox.createLightBox();
                
                //Récupération du prix 
                const price = currentPhotographerData[0].price;
                var totalLikes = 0;
                //Boucle sur le tableau des likes puis ajout du total des likes dans totalLikes
                for (let i = 0; i < likesArray.length; i++) {
                    totalLikes += likesArray[i];
                };


                //CREATION DE LA BOX ORANGE
                const boxSection = document.querySelector("#box");
                var boxTemplate = 
                `<span id="total-likes">${totalLikes}</span>
                <i class="fas fa-heart" aria-label='likes'></i>
                <span>${price} €/ jour</span>`;
                boxSection.innerHTML = boxTemplate;
        //}
    } 
}

const page = new PhotographerPage();
page.profilPage()


