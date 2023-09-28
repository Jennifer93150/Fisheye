class Likes{
    increaseInLikes(heart, numberLikes, objectGallery, mediaTitle, button){
        // Si clic sur coeur active likes
        heart.addEventListener('click', ()=> {
            this.modifyHeart(heart, numberLikes, objectGallery, mediaTitle);
        });
        // Si tape sur entrer sur coeur active les likes
        button.addEventListener('keyup', (e)=>{
            //Codes des touches du clavier.
            const TOUCHE_ENTREE = 13;
            switch(e.keyCode)
            {
                case TOUCHE_ENTREE:
                this.modifyHeart(heart, numberLikes, objectGallery, mediaTitle);
                break;
            }
        });
    }
    // Modifie le coeur et in/décrémente les likes
    modifyHeart(heart, numberLikes, objectGallery, mediaTitle){
        var likeValue = parseInt(numberLikes.innerHTML);
        var totalLikes = parseInt(document.getElementById('total-likes').innerHTML);
            if (!localStorage.getItem(mediaTitle)) {
                heart.classList.replace('far', 'fas');
                objectGallery.saveToLocalStorage();
                numberLikes.innerHTML = ++likeValue;
                document.getElementById('total-likes').innerHTML = ++totalLikes;
            }else if(localStorage.getItem(mediaTitle) && heart.classList.contains('far')){
                heart.classList.replace('far', 'fas');
                numberLikes.innerHTML = ++likeValue;
                document.getElementById('total-likes').innerHTML = ++totalLikes;
            }else{
                heart.classList.replace('fas', 'far');
                localStorage.removeItem(mediaTitle);
                numberLikes.innerHTML = --likeValue;
                document.getElementById('total-likes').innerHTML = --totalLikes;
            }
    }
}