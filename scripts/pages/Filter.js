class Filter {
    constructor(Medias) {
        this._media = Medias;
        this._$wrapperFilter = document.createElement('div');
        this._$wrapperFilterOpen = document.createElement('div');
        this._filterSection = document.querySelector('.section-filter');
        this._gallerySection = document.querySelector(".section-gallery");
        this._mediaElementsHtml = document.getElementsByClassName('media-element');
    }

    filterOpening() {
        const btnList = document.querySelector('.filter-btn');
        const closedList  = document.getElementById('filter');
        const openedList  = document.getElementById('filter-open');
        const liste  = document.getElementById('filter-ul-open');
        const liPop  = document.getElementById('filter-btn-pop');
        const liTitle  = document.getElementById('filter-btn-title');
        //j'ecoute les clics sur le bouton "aucun filtre"
        btnList.addEventListener('click', function(){
            closedList.style.display='none';
            openedList.style.display='flex';
            liPop.style.padding="9px 40px 15px 10px";
            liTitle.style.paddingLeft="10px";
            liste.focus();
            document.getElementById('filter-open-strong').style.paddingTop='12px';
        })
    }

    // Modifie bouton  en "Popularité" au clic
    popFilterChange() {
        const btnList = document.querySelector('.filter-btn');
        btnList.innerHTML='Popularité<i class="fas fa-chevron-down filter-chevron" id="filter-btn"></i>';
        btnList.style.paddingRight='40px';
        this.filterGalleryByPop();
    }

    // Trie par ordre décroissant
    filterGalleryByPop(){
        const byValue = (a,b) => b.likes - a.likes;
        var datasSortedByLikes = this._media.sort(byValue);
        this.creationGallerySorted(datasSortedByLikes);
    }

    // Modifie bouton "aucun filtre" en "Titre" au clic
    titleFilterChange() {
        const btnList = document.querySelector('.filter-btn');
        btnList.innerHTML='Titre<i class="fas fa-chevron-down filter-chevron" id="filter-btn"></i>';
        btnList.style.paddingRight='90px';
        document.querySelector('.filter-chevron').style.left='70px';
        this.filterGalleryByTitle();
    }

    // Titre par ordre alphabetique
    filterGalleryByTitle() {
        var datasSortedByTitle = this._media.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }else {
                return 1;
            };
        });
        this.creationGallerySorted(datasSortedByTitle);
    }

    // Modifie bouton "aucun filtre" en "Titre" au clic
    dateFilterChange() {
        const btnList = document.querySelector('.filter-btn');
        btnList.innerHTML='Date<i class="fas fa-chevron-down filter-chevron" id="filter-btn"></i>';
        btnList.style.paddingRight='90px';
        document.querySelector('.filter-chevron').style.left='70px';
        this.filterGalleryByDate();
    }

    // Trie par date
    filterGalleryByDate(){
        var datasSortedByDate = this._media.sort(function (a, b) {  
            const date = new Date(a.date).valueOf() - new Date(b.date).valueOf();
            return date;
        });
        this.creationGallerySorted(datasSortedByDate);
    }

    // Vide la gallerie
    clearGalleryWrapper() {
        this._gallerySection.innerHTML="";
    }

    // Affichage du filtre
    render() {
        const filterForm = 
        `
        <div class="filter" id="filter">
            <strong id="filter-strong">Trier par </strong>
            <button class="filter-btn" id="filter-btn" type="button" role="button" aria-haspopup="listbox">Aucun filtre<i class="fas fa-chevron-down filter-chevron" id="filter-btn"></i></button>
        </div>
        <div class="filter-open" id="filter-open">
            <strong id="filter-open-strong">Trier par </strong>

            <ul class="filter-ul-open" id="filter-ul-open" role="listbox">
                <li class="li-element li-element-pop" id="li-element-pop" role='option'>
                    <button class="filter-btn filter-btn-pop" id="filter-btn-pop" type="button" role="button" aria-haspopup="listbox">Popularité<i class="fas fa-chevron-down filter-chevron" id="filter-btn"></i></button>
                </li>
                <li class="li-element li-element-title" id="li-element-title" role='option'>
                    <button class="filter-btn filter-btn-title" id="filter-btn-title" type="button" role="button" aria-haspopup="listbox">Titre</button>
                </li>
                <li class="li-element li-element-date" id="li-element-date" role='option'>
                    <button class="filter-btn filter-btn-date" id="filter-btn-date" type="button" role="button" aria-haspopup="listbox">Date</button>
                </li>
            </ul>
        </div>
        `
        this._$wrapperFilter.innerHTML = filterForm;
        this._filterSection.appendChild(this._$wrapperFilter);
        // Appel des fonctions qui modifie le bouton filtre
        this.filterOpening();
        
        const listOpened = Array.from(document.getElementsByClassName("li-element"));
        
        // Modification du bouton filtre et activation du trie
        listOpened.forEach((element)=> element.addEventListener('click', () =>{
            this.closeFilter();
            
            if(element.classList.contains('li-element-pop')){
                this.popFilterChange();
            }else if(element.classList.contains('li-element-title')){
                this.titleFilterChange();
            }else if(element.classList.contains('li-element-date')){
                this.dateFilterChange();
            }
            const pop = document.getElementById('li-element-pop');
            pop.addEventListener('keyup', (e)=>{
                this.onFilterKeyUp(e);
            })
        }));
    }

    closeFilter(){
        const closedList  = document.getElementById('filter');
        const openedList  = document.getElementById('filter-open');

        closedList.style.display='block';
        openedList.style.display='none';
    }
    // Changement de slide au clic sur une touche du clavier
    onFilterKeyUp(e)
    {
        // Codes des touches du clavier.
        const TOUCHE_ENTREE = 13;
        switch(e.keyCode)
        {
            case TOUCHE_ENTREE:
            this.popFilterChange();;
            break;
        }
    }

    creationGallerySorted(arrayMedia){
        this.clearGalleryWrapper();
         // Boucle sur les données media pr créer la gallerie triée
        arrayMedia.forEach(gallery => {
            const galleryModel = new Gallery(gallery);
            const newGallerySorted = galleryModel.createGallery();
            this._gallerySection.appendChild(newGallerySorted);
        });  
        
        // LIGHTBOX
        const lightBox = new LightBox(arrayMedia);
        lightBox.createLightBox();

        return arrayMedia;
    }
}