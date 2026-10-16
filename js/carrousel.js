const carrousel = document.querySelector("#carrousel");

/*
===========================
DECLARATION DES DONNEES
===========================
*/

const datas_slides= [
    {
        titre: "Le goût du pays livré chez vous.",
        description: "Aliments locals, sélectionner aux près de nos meilleurs agriculteurs"
    },
    {
        titre : "Sauce naturels",
        description : "Vos meilleurs concoctions pour enrichir vos plats.",
    },
    {
        titre : "Rayon remplis par convenance",
        description : "Disposition et rangement de vos meilleurs produits dans des conditions favorables à l'achat",
    },
    {
        titre : "Payer par Mobile Money",
        decription : "Réglez vos achats directement en ligne à partir de notre panier."
    }
]

carrousel.innerHTML = "";
for(let i = 0; i<datas_slides.length; i++){
    const data = datas_slides[i];
    carrousel.innerHTML += `
    <div class="slide" style="background-image: url('images/slide (${i + 1}).jfif');">
          <div class="slide_container">
            <div class="slide_text">
              <h2>${data.titre}</h2>
              <p>${data.decription}</p>
              <div class="buttons">
                <a href="#"> En savoir +</a>
              </div>
            </div>
          </div>
        </div>`;
}
carrousel.innerHTML += `
    <!-- Boutons d'options du slide -->
    <div class="slide_options">
        <span> <i class="fa-solid fa-chevron-left"></i> </span>
        <span> <i class="fa-solid fa-chevron-right"></i> </span>
    </div>
`;
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

