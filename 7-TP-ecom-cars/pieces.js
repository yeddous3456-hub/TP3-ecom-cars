// pieces.js
const sectionFiches = document.querySelector(".fiches");
const sectionFiltres = document.querySelector(".filtres");

fetch("./pieces-autos.json")
  .then(response => response.json())
  .then(pieces => {
    afficherPieces(pieces);
    creerFiltres(pieces);
  })
  .catch(err => {
    sectionFiches.innerHTML = "<p>Erreur de chargement des données</p>";
    console.error(err);
  });

function afficherPieces(pieces) {
  sectionFiches.innerHTML = "";
  pieces.forEach(piece => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h4>${piece.nom}</h4>
      <p>Prix : ${piece.prix} DH</p>
      <p>Catégorie : ${piece.categorie}</p>
    `;

    sectionFiches.appendChild(article);
  });
}

function creerFiltres(pieces) {
  const categories = [...new Set(pieces.map(p => p.categorie))];

  const select = document.createElement("select");
  select.innerHTML = `<option value="">Toutes les catégories</option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const valeur = select.value;
    const filtrees = valeur
      ? pieces.filter(p => p.categorie === valeur)
      : pieces;
    afficherPieces(filtrees);
  });

  sectionFiltres.appendChild(select);
}
