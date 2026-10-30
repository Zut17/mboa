const produits = document.querySelector("#produits");
const nb_articles = document.querySelector("#nb_articles");

let DATAS_PRODUITS = null/*
======================================
creation d'un produit
=====================================
*/

/*
function creerProduit(produit) {
    // 1. On cree une div pour la carte du produit
    const carte = document.createElement("div");
    carte.classList.add("produit");

    // 2. On remplit la carte avec les infos du produit
    carte.innerHTML = `
        <i class="${produit.icon}"></i>
        <h3>${produit.nom}</h3>
        <p>${produit.description}</p>
        <p><strong>${produit.prix} FCFA</strong> / ${produit.unite}</p>
        <p>Stock : ${produit.stock}</p>
        <button>Ajouter au panier</button>
    `;

    // 3. On ajoute la carte dans la zone #produits de la page
    produits.appendChild(carte);
}
*/


/*
======================================
Quelques fonctions utiles
======================================
*/

//Chargement des produits depuis le fichier json
async function chargerProduits() {
    try {
        const reponse = await fetch("data/produit.json");
        if (!reponse.ok) {
            throw new Error("Fichier data/produit.json introuvable");
        }
        const datas = await reponse.json();

        return datas;
    }
    catch (erreur) {
        console.error(erreur);
        produits.innerHTML = `
            <p class="danger">
            Impossible de charger les produits.
            </p>
        `;
    }
}

//Afficher les produits
function afficherProduit(liste) {
    if (liste == null || liste.length == 0) {
        produits.innerHTML = `
            <p class="message">
                <i class="fa-solid fa-magnifying-glass"></i>
                Aucun produit trouvé.
            </p>
        `;
    }
    else {
        produits.innerHTML = "";
        for (let i = 0; i < liste.length; i++) {
            const produit = liste[i];
            const html = `
                <div class="produit">
                    <div class="produit_icon" data-action="detail" data-id="${produit.id}">
                        <i class="${produit.icon}"></i>
                    </div>
                    <div class="produit_texte">
                        <span class="produit_categorie">${produit.categorie}</span>
                        <h3 data-action="detail" data-id="${produit.id}">${produit.nom}</h3>
                        <p class="produit_unite">${produit.unite}</p>
                        <p class="produit_prix">${produit.prix} FCFA</p>
                        <div class="produit_footer">
                            <div class="produit_qte" data-stock="${produit.stock}">
                                <span data-action="moins" data-id="${produit.id}"> - </span>
                                <b class="produit_qtecommande">1</b>
                                <span data-action="plus" data-id="${produit.id}"> + </span>
                            </div>
                            <button data-action="ajouter" data-id="${produit.id}">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            produits.innerHTML += html;
        }
    }
}

//Retrouve un produit a partir de son id
function rechercheProduit(id, liste) {
    return liste.find(function (val) {
        return val.id == id;
    });
}

// Initialiser le panier
function initPanier() {
    const panier = localStorage.getItem("panier");
    if (panier != null) {
        nb_articles.classList.remove('hide');
        let nb = JSON.parse(panier).length;
        nb_articles.textContent = nb;
    }
    else {
        nb_articles.textContent = 0;
        nb_articles.classList.add('hide');
    }
}

//Ajouter un produit dans le panier
function ajoutProduitPanier(produit) {
    const panier = localStorage.getItem("panier");
    if (panier != null) {
        let liste = JSON.parse(panier);
        let data = rechercheProduit(produit.id, liste);
        if (data == null) {
            liste.push(produit);
            localStorage.setItem("panier", JSON.stringify(liste));
        }
        else {
            alert("Ce produit se trouve déjà dans le panier.");
        }
    }
    else {
        let liste = [produit];
        localStorage.setItem("panier", JSON.stringify(liste));
    }

    initPanier();
}

// Initialisation et affichage des produits
async function initBoutique() {
    DATAS_PRODUITS = await chargerProduits();
    afficherProduit(DATAS_PRODUITS);
    console.log(DATAS_PRODUITS);
}
initBoutique();
initPanier();

/*
======================================
GESTION DES EVENMENTS
======================================
*/
produits.addEventListener('click', function (e) {
    const element = e.target.closest('[data-action]');

    if (element.matches('[data-action="moins"]')) {
        const bloc = element.parentNode.querySelector('b');
        if (parseInt(bloc.textContent) > 1) {
            bloc.textContent = parseInt(bloc.textContent) - 1;
        }
    }
    if (element.matches('[data-action="plus"]')) {
        const bloc = element.parentNode.querySelector('b');
        const stock = element.parentNode.dataset.stock;
        if (parseInt(bloc.textContent) < stock) {
            bloc.textContent = parseInt(bloc.textContent) + 1;
        }
    }
    if (element.matches('[data-action="ajouter"]')) {
        const id = element.dataset.id;
        const qte = parseInt(element.parentNode.querySelector(".produit_qtecommande").textContent);
        let produit = rechercheProduit(id, DATAS_PRODUITS);
        if (produit != null) {
            produit.qte = qte;
            ajoutProduitPanier(produit);
        }
        else {
            alert("Ce produit se trouve deja dans le panier.");
        }  
    }
}
);