const container = document.querySelector("#items"); // crée un container pour l'id items

fetch("http://localhost:3000/api/products")
    .then(result => {
        return result.json();
    }) // récupère les produits et les return en objet JSON

.then((dataKanap) => {
    const allKanap = dataKanap;
    console.log(allKanap);

    allKanap.forEach(element => {
        container.innerHTML += `<a href="./product.html?id=${element._id}">
        <article>
          <img src=${element.imageUrl} alt=${element.altTxt}>
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a> `
    });
}); // affiche les produits