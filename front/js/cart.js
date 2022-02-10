let localCart = JSON.parse(localStorage.getItem("Panier")); // récupère le panier de product.js
console.log(localCart);

function addItem() {

    for (i = 0; i < localCart.length; i++) {
        const cartItems = document.getElementById('cart__items');

        // balises HTML

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

        // classes et attributs

        article.classList.add('cart__item');
        article.setAttribute('data-id', `${localCart[i].id}`);
        divImg.classList.add('cart__item__img');
        divItemCont.classList.add('cart__item__content');
        divDescCont.classList.add('cart__item__content__description');
        divContent.classList.add('cart__item__content__settings');
        divQuantity.classList.add('cart__item__content__settings__quantity');
        input.classList.add('itemQuantity');
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', localCart[i].quantity);
        divDelete.classList.add('cart__item__content__settings__delete');
        pDelete.classList.add('deleteItem');

        article.appendChild(divImg) + article.appendChild(divItemCont);
        divImg.appendChild(imgImg);
        divImg.querySelector('img').src = localCart[i].img;
        divImg.querySelector('img').alt = localCart[i].alt;
        divItemCont.appendChild(divDescCont) + divItemCont.appendChild(divContent);
        divDescCont.appendChild(hName) + divDescCont.appendChild(pPrice);
        divDescCont.querySelector('h2').textContent = localCart[i].name + " - " + localCart[i].color;
        divDescCont.querySelector('p').textContent = localCart[i].price;
        divContent.appendChild(divQuantity) + divContent.appendChild(divDelete);
        divQuantity.appendChild(pQuantity) + divQuantity.appendChild(input);
        divQuantity.querySelector('p').textContent = "Quantité : ";
        let totalPriceProduct = localCart[i].quantity * localCart[i].price;
        divDescCont.querySelector('p').textContent = "Montant total produit : " + totalPriceProduct + "€" + " - " + "Montant unitaire : " + localCart[i].price + "€";
        divDelete.appendChild(pDelete);
        pDelete.textContent = "Supprimer";

        cartItems.appendChild(article);
    }
}

function totalPriceProduct() {
    const totalQuant = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');

    let totalQuantityNum = 0;
    let totalPriceNum = 0;

    for (j = 0; j < localCart.length; j++) {
        totalQuantityNum += parseInt(localCart[j].quantity);
        totalPriceNum += localCart[j].price * localCart[j].quantity;
    }

    totalQuant.textContent = totalQuantityNum;
    totalPrice.textContent = totalPriceNum;
}

function modifyCart() {
    const itemQuantityModif = document.querySelectorAll('.itemQuantity');

    //console.log(localCart);

    for (let k = 0; k < itemQuantityModif.length; k++) {
        itemQuantityModif[k].addEventListener('change', (event) => {
            event.preventDefault();

            let itemModif = parseInt(localCart[k].quantity);
            let modifyValue = parseInt(itemQuantityModif[k].value);
            let modify = localCart.find(el => el.modifyValue != itemModif);
            localCart[k].quantity = modifyValue;
            localStorage.setItem('Panier', JSON.stringify(localCart));

            window.location.reload();
        });
    }
}

function deleteItem() {
    const deleteBtn = document.querySelectorAll(".deleteItem");

    for (let l = 0; l < deleteBtn.length; l++) {
        deleteBtn[l].addEventListener("click", (event) => {
            event.preventDefault();

            let deleteId = localCart[l].id;
            let deleteColor = localCart[l].color;

            localCart = localCart.filter(el => el.id !== deleteId || el.color !== deleteColor);
            localStorage.setItem("Panier", JSON.stringify(localCart));

            window.location.reload();
        });
    }
}

addItem();
totalPriceProduct();
modifyCart();
deleteItem();