class Api {
    /**
    *       
    * * @param {string} url 
    */
    constructor(url) {
        this._url = url
    }

    async get() {
            // Chemin vers les données json
            var url = './data/photographers.json';
            // Requete + chemin, qui va chercher les données
            var response = await fetch(url);
            // J'analyse la reponse en json
            var data = await response.json();
            const dataPhotographers = [...data.photographers];
            const dataMedias = [...data.media];
            // Retourne le tableau photographers
            return {
                'photographers': dataPhotographers,
                'media': dataMedias
            };
    }
}

class photographerApi extends Api{
    /**
     * 
     * @param {string} url 
     */
     constructor(url) {
        super(url)
    }
    async getPhotographers() {
        return await this.get()
    }
}