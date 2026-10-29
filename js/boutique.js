const produits = document.querySelector("#produits");

/*
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
function afficherProduit(liste){
    if(liste == null || liste.length == 0){
        produits.innerHTML=`
            <p class="message">
                <i class="fa-solid fa-magnifying-glass"></i>
                Aucun produit trouvé.
            </p>
        `;
    }
    else{
        produits.innerHTML= "";
        for(let i=0; i <liste.length; i++){
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
                        <div class="produit_footer">
                            <b>${produit.prix} FCFA</b>
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

/*
======================================
CHARGEMENT DES DONNEES
======================================
*/

async function initBoutique() {
    const datas = await chargerProduits();
    afficherProduit(datas);
    console.log(datas);
}
initBoutique();