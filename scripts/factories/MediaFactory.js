class MediaFactory{
    
    createMediaElement(media){// Verif si c'est une video ou image
        const a = document.createElement('a');
        const img = document.createElement('img');
        const videoHtml = document.createElement('video');
        if(media.hasOwnProperty('video')){
            a.appendChild(videoHtml);
            videoHtml.setAttribute("controls", "controls");
            videoHtml.setAttribute("src", media.video);
            videoHtml.setAttribute('role', 'button');
            videoHtml.setAttribute('alt', media.title+' closeup view');
            videoHtml.setAttribute('title', media.title)
            videoHtml.classList.add('media-element');
        }else if(media.hasOwnProperty('image')){
            a.appendChild(img)
            img.setAttribute("src", media.image);
            img.setAttribute('role', 'button');
            img.setAttribute('alt', media.title+' closeup view');
            img.setAttribute('title', media.title)
            img.classList.add('media-element')
        }  
        return a
    }
}