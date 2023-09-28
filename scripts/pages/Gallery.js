class Gallery {
    constructor(media) {
        this._media = media;
        this._mediaTitle = this._media.title;
        this._gallerySection = document.getElementById("section-gallery");
    }

    createGallery() {
        const article = document.createElement('article');
        const divMedia = document.createElement('div');
        const divText = document.createElement('div');
        const p = document.createElement( 'p' );
        const span = document.createElement( 'span' );
        const button = document.createElement( 'button' );
        const i = document.createElement('i');
        const objectGallery = this;
        const mediaTitle = this._mediaTitle;
       
        this._gallerySection.appendChild(article);

        const mediaFactory = new MediaFactory();
        const mediaHTML = mediaFactory.createMediaElement(this._media);
        
        article.classList.add('container-media');
        article.appendChild(divMedia);
        divMedia.appendChild(mediaHTML);
        article.appendChild(divText);
        divMedia.classList.add('div-media');
        mediaHTML.href = "#";
        mediaHTML.setAttribute('title', this._media.title);
        p.textContent = this._media.title;
        span.textContent = this._media.likes+" ";
        span.classList.add('likes');
        button.classList.add('btn-likes')
        button.setAttribute('role', 'button');
        i.classList.add('far','fa-heart', 'heart');
        i.setAttribute('aria-label', this._media.likes+' likes');
        i.setAttribute('id', this._media.likes+' likes');
        divText.appendChild(p);
        divText.appendChild(span);
        divText.appendChild(button);
        button.appendChild(i);

        // Incrémentation des likes et Modification du coeur au clic
        new Likes().increaseInLikes(i, span, objectGallery, mediaTitle, button);
        
        // Vide le storage au rechargement page
        window.onbeforeunload = function () {
            localStorage.clear();
        }
        return article
    }
    
    saveToLocalStorage() {
        localStorage.setItem(this._mediaTitle, this._mediaTitle)
    }
}
