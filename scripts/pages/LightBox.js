class LightBox{
    constructor(media){
        this._media = media;
        this._sectionLightBox = document.getElementById('section-lightbox');
        this._arrayMedias = [];
        this._index = 0; 
    }

    createLightBox(){
        const mediaElementsHtml = Array.from(document.getElementsByClassName('media-element'));
        const containerMediaHtml = Array.from(document.getElementsByClassName('div-media'));
        const currentMediaHtml = mediaElementsHtml;
        const sectionLightBox = this._sectionLightBox; 
        //var currentImg;
        // Création tableau pr y stocker le média + titre
        var arrayMediaElement = [];
        var arrayMediaName = [];
        // Récuperation titre de chq média
        for(var i= 0; i<this._media.length; i++){
            arrayMediaName.push(this._media[i].title);
        };

        // Récuperation de chq element html média
        for(var i= 0; i<currentMediaHtml.length; i++){
            // je push l'elt html en cours ds arrayMediaElt
            arrayMediaElement.push(currentMediaHtml[i].outerHTML);
            // recup index de l'elt html en cours
            this._arrayMedias.push({
                'title': arrayMediaName[i],
                'media': currentMediaHtml[i].outerHTML
            });
        };

        // Création lightbox
        currentMediaHtml.forEach((mediaElement, index) => mediaElement.addEventListener('click', () =>{
            //currentImg = mediaElement;
            this.render(mediaElement);
            this.lightboxDisplay(index, sectionLightBox, arrayMediaElement);
            this.refreshSlider();   
        }));
        // Ecoute la selection d'elemnt ac clavier sur l'image
        containerMediaHtml.forEach((element, index) =>{
            element.addEventListener('keyup', (e) =>{
                this.keyboardKeyOnMmedia(e, element, index, sectionLightBox, arrayMediaElement)
            });
        });
        // Ecoute la selection d'elemnt ac clavier sur lightbox
        document.addEventListener('keyup', (e)=>{
            this.onSliderKeyUp(e, arrayMediaElement, sectionLightBox);
        }); 
    }

    // Affichage lightbox
    lightboxDisplay(index, sectionLightBox, arrayMediaElement){
        // Fermeture de la lightbox
        const btnCloseLightBox = document.getElementById('btn-close-lightbox');
        btnCloseLightBox.addEventListener('click',()=>{
            this.closeSlider(sectionLightBox);
        });
        
        const arrowPrevious = document.querySelector('.slider-previous');
        const arrowNext = document.querySelector('.slider-next');
        this._index = index;
        arrowPrevious.addEventListener('click', ()=>{
            this.onSliderGoToPrevious(arrayMediaElement);
        });
        arrowNext.addEventListener('click', ()=>{
            this.onSliderGoToNext(arrayMediaElement);
        });
    }
   
    // Rendu visuel de la lightbox
    render(mediaElement){
        const ligthBox = 
            `
                <div class="container-lightbox">
                    <link class="fa-solid fa-angle-left slider-previous" id="slider-previous" rel="stylesheet" href="#" title="Previous image">
                    <div id="lightbox-media">
                        ${mediaElement.outerHTML}
                    </div>
                    <link class="fa-solid fa-angle-right slider-next" id="slider-next" rel="stylesheet" href="#" title="Next image">
                    <button id="btn-close-lightbox" class="btn-close-lightbox" title="Close dialog" type="button">X</button>  
                </div>
                <div class="p-lightbox"><p id="lightbox-name"></p></div>
                
            `;

        this._sectionLightBox.style.display='block';
        this._sectionLightBox.classList.add('lightbox');
        this._sectionLightBox.innerHTML= ligthBox;
        this._sectionLightBox.setAttribute('aria-hidden', 'false');
        //const sliderPrevious = document.getElement
    }

    // Affichage media précédent
    onSliderGoToPrevious(arrayMedia)
    {
        // Passage à la slide précédente.
        this._index--;
        // Verif si on est au début de la liste des médias
        if(this._index < 0)
        {
            // Oui, alors on revient à la fin
            this._index = arrayMedia.length - 1;
        }
        // Mise à jour de l'affichage.
        this.refreshSlider();
    }
    
    // Affichage media suivant
    onSliderGoToNext(arrayMedia)
    {
        // Passage à la slide suivante.
        this._index++;
        // Verif si on est à la fin des médias
        if(this._index > arrayMedia.length - 1)
        {
            //Oui alors revient au début
            this._index = 0;
        }
        // Mise à jour de l'affichage.
        this.refreshSlider();
    }

    // Fermeture lightbox
    closeSlider(sectionLightBox){
        sectionLightBox.style.display='none';
        sectionLightBox.innerHTML='';
        sectionLightBox.setAttribute('aria-hidden', 'true')
    }

    // Changement du contenu de la lightbox
    refreshSlider()
    {
        // Balises de contenu du slide.
        var lightBoxMedia = document.getElementById('lightbox-media');
        var lightBoxName = document.getElementById('lightbox-name');
        // Changement de la source de l'image et du titre.
        lightBoxMedia.innerHTML = `${this._arrayMedias[this._index].media}`;
        lightBoxName.innerHTML = `${this._arrayMedias[this._index].title}`;
    }

     // Changement de slide au clic sur une touche du clavier
    keyboardKeyOnMmedia(e, mediaElement, index, sectionLightBox, arrayMediaElement)
    {
        // Codes des touches du clavier.
        const TOUCHE_ENTREE = 13;
        switch(e.keyCode)
        {
             case TOUCHE_ENTREE:
                 this.render(mediaElement);
                 this.lightboxDisplay(index, sectionLightBox, arrayMediaElement);
                 this.refreshSlider();  
             break;
        }
    }
 
    // Changement de slide au clic sur une touche du clavier
    onSliderKeyUp(e, arrayMedia, sectionLightBox)
    {
        // Codes des touches du clavier.
            //const TOUCHE_ENTREE = 13;
            const TOUCHE_ESC = 27;
            const TOUCHE_GAUCHE = 37;
            const TOUCHE_DROITE = 39;
            switch(e.keyCode)
            {
                // case TOUCHE_ENTREE:
                // this.render(mediaElement);
                // break;

                case TOUCHE_DROITE:
                // On passe au media slide suivante.
                this.onSliderGoToNext(arrayMedia);
                break;

                case TOUCHE_ESC:
                // On ferme le slide.
                this.closeSlider(sectionLightBox);
                break;

                case TOUCHE_GAUCHE:
                // On passe au media précédente.
                this.onSliderGoToPrevious(arrayMedia);
                break;
            }
    }
}