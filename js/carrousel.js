const carrousel = document.querySelector("#carrousel");

/*
===========================
DECLARATION DES DONNEES
===========================
*/

const datas_slides = [
    {
        titre: "Le goût du pays livré chez vous.",
        description: "Aliments locals, sélectionner aux près de nos meilleurs agriculteurs"
    },
    {
        titre: "Sauce naturels",
        description: "Vos meilleurs concoctions pour enrichir vos plats.",
    },
    {
        titre: "Rayon remplis par convenance",
        description: "Disposition et rangement de vos meilleurs produits dans des conditions favorables à l'achat",
    },
    {
        titre: "Payer par Mobile Money",
        description: "Réglez vos achats directement en ligne à partir de notre panier."
    }
]

let html = "";
for (let i = 0; i < datas_slides.length; i++) {
    const data = datas_slides[i];
    html += `
    <div class="slide" style="background-image: url('images/slide (${i + 1}).jfif');">
          <div class="slide_container">
            <div class="slide_text">
              <h2>${data.titre}</h2>
              <p>${data.description}</p>
              <div class="buttons">
                <a href="#"> En savoir +</a>
              </div>
            </div>
          </div>
        </div>`;
}
html += `
    <!-- Boutons d'options du slide -->
    <div class="slide_options">
        <span class="slide_left"> <i class="fa-solid fa-chevron-left"></i> </span>
        <span class="slide_right"> <i class="fa-solid fa-chevron-right"></i> </span>
    </div>
`;
carrousel.innerHTML = html;
/*
===========================
DECLARATION DES VARIABLES
===========================
*/
const slides = document.querySelectorAll("#carrousel .slide");
const slide_left = document.querySelector("#carrousel .slide_left");
const slide_right = document.querySelector("#carrousel .slide_right");

//contient l'indice du slide actuellement affiché
let slide_courant = 0;

/*
====================================
MASQUER TOUT LES SLIDES SAUF LE PREMIER
====================================
*/

for (let i = 1; i < slides.length; i++) {
    slides[i].classList.add('hide');
}

/*
====================================
QUELQUES FONCTIONS UTILES
====================================
*/

//FONCTION PERMETTANT D'AFFICHER UN SLIDE

function showSlide(index, direction) {
    //on masque le slide courant
    slides[slide_courant].classList.add('hide');

    //on cherche l'indice du nouveau slide a afficher
    if (direction.trim().toLowerCase() == "right") {
        if (index >= slides.length) {
            slide_courant = 0;
        }
        else {
            slide_courant = index;
        }
    }
    else if (direction.trim().toLowerCase() == "left") {
        if (index < 0) {
            slide_courant = slides.length - 1;
        }
        else {
            slide_courant = index;
        }
    }
    else {
        slide_courant = index;
    }
    //on affiche le slide courant 
    slides[slide_courant].classList.remove('hide');
}

/*
====================================
LANCER LE SLIDE
====================================
*/

slide_left.addEventListener("click", function () {
    showSlide(slide_courant - 1, "left");
});

slide_right.addEventListener("click", function () {
    showSlide(slide_courant + 1, "right");
});


/*
====================================
LANCER LE SLIDE AUTOMATIQUEMENT
====================================
*/

setInterval(function () {
    showSlide(slide_courant + 1, "right");
}, 5000);