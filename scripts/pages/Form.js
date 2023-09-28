class Form {
    fields() {
        // Récuperation elements du form
        var form = document.getElementById('contact-form');
        var firstName = document.getElementById('first-name');
        var lastName = document.getElementById('last-name');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        // envoi du formulaire
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Je stocke le resultat de mes verifs
            var formValid = 
                this.checkName(firstName) &&
                this.checkName(lastName) &&
                this.checkEmail(email) &&
                this.checkMessage(message);
            // Si formValid = true
            if (formValid) {// Alors retrait des borders rouges, 
                //envoi du msg ds console et nettoie le form
                firstName.style.border = 'none';
                lastName.style.border = 'none';
                email.style.border = 'none';
                message.style.border = 'none';
                this.consoleMessage(firstName, lastName, email, message);
                document.getElementById('contact-form').reset();
            } else {// Sinon revérifie
                this.errorVerification(firstName, lastName, email, message);
            }
        });
    }

    // Verification prenom/nom
    checkName(elt) {
        const re = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/i;
        //trim() retire les espaces blancs
        if (elt.value.trim().length != 0 || elt.value.trim() !== "" || elt.value.match(re)) {
            elt.parentElement.setAttribute('data-error-visible', 'false');
            elt.style.border = '2px solid #49B437';
            return true;
        } else {
            elt.parentElement.setAttribute('data-error-visible', 'true');
            elt.style.border = '2px solid #E50000';
            return false;
        }
    }

    // Verif email
    checkEmail(elt) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (elt.value.trim().match(re)) {
            elt.parentElement.setAttribute('data-error-visible', 'false');
            elt.style.border = ' 2px solid #49B437';
            return true;
        }
        elt.parentElement.setAttribute('data-error-visible', 'true');
        elt.style.border = '2px solid #E50000';
        return false;
    }

    // Verif message
    checkMessage(elt) {
        if (elt.value.trim() === '' || elt.value.trim() == null) {
            elt.parentElement.setAttribute('data-error-visible', 'true');
            elt.style.border = '2px solid #E50000';
            return false;
        }
        elt.parentElement.setAttribute('data-error-visible', 'false');
        elt.style.border = '2px solid #49B437';
        return true;
    }

    // Verification erreurs
    errorVerification(firstName, lastName, email, message) {
        this.checkName(firstName);
        this.checkName(lastName);
        this.checkEmail(email);
        this.checkMessage(message);
    }

    // Réponse dans la console
    consoleMessage(firstName, lastName, email, message) {
        console.group('Message du formulaire de contact');
        console.log('Prénom : ' + firstName.value);
        console.log('Nom : ' + lastName.value);
        console.log('Email : ' + email.value);
        console.log('Message : ' + message.value);
        console.groupEnd();
    }
}
