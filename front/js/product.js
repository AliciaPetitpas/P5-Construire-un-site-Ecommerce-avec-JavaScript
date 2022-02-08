let searchParams = new URL(document.location).searchParams;
let id = searchParams.get("id"); // retrouve les id des produits

console.log(`Produit ${id}`);

const imgAtt = document.querySelector('.item__img');
const titleAtt = document.getElementById("title");
const priceAtt = document.getElementById("price");
const descriptionAtt = document.getElementById("description");
const colorsAtt = document.querySelector("#colors")

fetch("http://localhost:3000/api/products/" + id)
    .then(result => {
        return result.json();
    }) // récupère les produits selon leurs id

.then((dataKanap) => {
        allKanap = dataKanap;
        let imgEl = document.createElement("img");

        imgEl.setAttribute("src", `${allKanap.imageUrl}`);
        imgEl.setAttribute("alt", `${allKanap.altTxt}`);

        imgAtt.append(imgEl)

        titleAtt.innerHTML = `${allKanap.name}`;
        priceAtt.innerHTML = `${allKanap.price}`;
        descriptionAtt.innerHTML = `${allKanap.description}`;
        colorsAtt.innerHTML += makeColors(allKanap.colors)
    }) // affiche les données du produit choisi

function makeColors(colors) {
    let html = "";
    colors.forEach(color => {
        html += `<option value="${color}">${color}</option>`
    });
    return html;
} // récupère les couleurs du produit

const button = document.getElementById("addToCart");
//const quantity = document.getElementById("quantity");

button.addEventListener("click", () => {
    let idProduct = searchParams.get("id");
    let colorProduct = colors.value;
    let quantityProduct = quantity.value;

    if (colorProduct == "") {
        return alert("Veuillez sélectionner une couleur.")
    }
    if (quantityProduct < 1) {
        return alert("Veuillez sélectionner une quantité.")
    }
    if (quantityProduct > 100) {
        return alert("La quantité maximum est de 100.")
    }

    const itemCart = {
        id: idProduct,
        color: colorProduct,
        quantity: parseInt(quantityProduct),
    };

    //console.log(itemCart);

    addCart(itemCart);

    function addCart(itemCart) {
        let cart = localStorage.getItem("addToCart");
        let arrayCart = [];

        if (cart != null) {
            let arrayCart = JSON.parse(cart);

            let cartLine = arrayCart.find(p => p.id == itemCart.id && p.color == itemCart.color);

            if (cartLine) {
                cartLine.quantity++;
            } else {
                arrayCart.push(itemCart);
            }
        } else {
            arrayCart.push(itemCart);
        }

        saveCart(arrayCart);
    }

    function saveCart(arrayCart) {
        localStorage.setItem("Panier", JSON.stringify(arrayCart));
    }
});