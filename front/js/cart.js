let localCart = JSON.parse(localStorage.getItem("Panier")); //récupère le panier de product.js
console.log(localCart);


function addItem() {

    for (i = 0; i < localCart.length; i++) {
        const cartItems = document.getElementById('cart__items');

        /* <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> */

        //Balises HTML

        const article = document.createElement('article');
        const divImg = document.createElement('div');
        const imgImg = document.createElement('img');
        const divItemCont = document.createElement('div');
        const divDescCont = document.createElement('div');
        const hName = document.createElement('h2');
        const pColor = document.createElement('p');
        const pPrice = document.createElement('p');
        const divContent = document.createElement('div');
        const divQuantity = document.createElement('div');
        const pQuantity = document.createElement('p');
        const input = document.createElement('input');
        const divDelete = document.createElement('div');
        const pDelete = document.createElement('p');

        //Classes et attributs

        article.classList('cart__item');
        article.setAttribute('data-id', `${localCart[i].id}`);
        divImg.classList('cart__item__img');
        divItemCont.classList('cart__item__content');
        divDescCont.classList('cart__item__content__description');
        divContent.classList('cart__item__content__settings');
        divQuantity.classList('cart__item__content__settings__quantity');
        input.classList('itemQuantity');
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', localCart[i].quantity);
        divDelete.classList('cart__item__content__settings__delete');
        pDelete.classList('deleteItem');

        article.appendChild(divImg) + article.appendChild(divItemCont);
        divImg.appendChild(imgImg);
        divImg.querySelector('img').src = localCart[i].img;
        divImg.querySelector('img').alt = localCart[i].alt;
        divItemCont.appendChild(divDescCont) + divItemCont.appendChild(divContent);
        divDescCont.appendChild(hName) + divDescCont.appendChild(pPrice);
        divDescCont.querySelector(h2).textContent = localCart[i].name + " - " + localCart[i].color;
        divDescCont.querySelector(p).textContent = localCart[i].price;
        //pColor.querySelector(p).textContent = localCart[i].color;
        //pPrice.querySelector(p).textContent = localCart[i].price;
        divContent.appendChild(divQuantity) + divContent.appendChild(divDelete);
        divQuantity.appendChild(pQuantity) + divQuantity.appendChild(input);
        divQuantity.querySelector('p').textContent = "Quantité : ";
        let totalPriceProduct = localCart[i].quantity * localCart[i].price; //Prix total par produit
        divDescCont.querySelector('p').textContent = "Montant total produit :" + totalPriceProduct + "€" + " - " + "Montant unitaire :" + localCart[i].price + "€";
        divDelete.appendChild(pDelete);
        pdelete.textContent = "Supprimer";

        cartItems.appendChild(article);
    }
}

/*

*/