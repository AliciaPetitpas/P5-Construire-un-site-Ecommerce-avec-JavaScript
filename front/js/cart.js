let localCart = JSON.parse(localStorage.getItem("Panier")); // récupère le panier de product.js
console.log(localCart);

function addItem() {
    //si panier vide
    if (localCart === null || localCart == 0) {
        document.getElementById("cart__items").innerHTML = `
            <div class="cart__empty">
              <p> Votre panier est vide </p>
            </div>
          `;
        document.querySelector('.cart__order').style.display = 'none';
    } else {

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
            divDescCont.querySelector('p').textContent = "Montant unitaire : " + Intl.NumberFormat().format(localCart[i].price) + "€" + " | " + "Montant total : " + Intl.NumberFormat().format(totalPriceProduct) + "€";
            divDelete.appendChild(pDelete);
            pDelete.textContent = "Supprimer";

            cartItems.appendChild(article);
        }
    }
}

//Calcul du coût total des produits
function totalPriceProduct() {
    const totalQuant = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');

    let totalQuantityNum = 0;
    let totalPriceNum = 0;

    if (localCart == null) {
        return false
    }

    for (j = 0; j < localCart.length; j++) {

        totalQuantityNum += parseInt(localCart[j].quantity);
        totalPriceNum += localCart[j].price * localCart[j].quantity;
    }

    totalQuant.textContent = totalQuantityNum;
    totalPrice.textContent = Intl.NumberFormat().format(totalPriceNum);
}

//Permet de changer la quantité du produit dans le panier
function modifyCart() {
    const itemQuantityModif = document.querySelectorAll('.itemQuantity');

    for (let k = 0; k < itemQuantityModif.length; k++) {
        itemQuantityModif[k].addEventListener('change', (event) => {
            event.preventDefault();

            let itemModif = parseInt(localCart[k].quantity);
            let modifyValue = parseInt(itemQuantityModif[k].value);
            let modify = localCart.find(el => el.modifyValue != itemModif);

            if (modifyValue === 0 || modifyValue < 0 || modifyValue > 100) {
                alert("Veuillez sélectionner une quantité entre 1 et 100");
                event.preventDefault();
            } else if (isNaN(modifyValue)) {
                alert("La quantité doit être saisie en chiffres");
                event.preventDefault();
            } else {
                localCart[k].quantity = modifyValue;
                localStorage.setItem('Panier', JSON.stringify(localCart));
                window.location.reload();
            }
        });
    }
}

//Permet de supprimer un article du panier
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

let formFirstName = document.getElementById("firstName");
let formLastName = document.getElementById("lastName");
let formAddress = document.getElementById("address");
let formCity = document.getElementById("city");
let formEmail = document.getElementById("email");
let formOrder = document.getElementById("order");

//VERIFICATION EMAIL
formEmail.addEventListener('change', function() {
    validateEmail(this)
});
const validateEmail = function(inputMail) {
    let checkEmail = false;
    let emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let testEmail = emailRegExp.test(inputMail.value);
    if (testEmail) {
        formEmail.style.boxShadow = '0px 0px 10px green'
        formEmail.style.boxSizing = 'border-box'
        document.getElementById("emailErrorMsg").innerHTML = "Email valide !"
        document.getElementById("emailErrorMsg").style.color = '#A9F570'
        checkEmail = true;
    } else {
        formEmail.style.boxShadow = '0px 0px 10px red'
        formEmail.style.boxSizing = 'border-box'
        document.getElementById("emailErrorMsg").innerHTML = `${inputMail.value} n'est pas une adresse mail valide !`
        document.getElementById("emailErrorMsg").style.color = '#F9BDBD'
    }
    return checkEmail;
};

//CITY
formCity.addEventListener('change', function() {
    validateCity(this)
});
const validateCity = function(inputCity) {
    let checkCity = false;
    let cityRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*.{2,}$', 'g');
    let testCity = cityRegExp.test(inputCity.value)
    if (testCity) {
        formCity.style.boxShadow = '0px 0px 10px green'
        formCity.style.boxSizing = 'border-box'
        document.getElementById("cityErrorMsg").innerHTML = "Ville valide !"
        document.getElementById("cityErrorMsg").style.color = '#A9F570'
        checkCity = true;
    } else {
        formCity.style.boxShadow = '0px 0px 10px red'
        formCity.style.boxSizing = 'border-box'
        document.getElementById("cityErrorMsg").innerHTML = `${inputCity.value} n'est pas valide !`
        document.getElementById("cityErrorMsg").style.color = '#F9BDBD'
    }
    return checkCity;
};

//ADDRESS
formAddress.addEventListener('change', function() {
    validateAddress(this)
});
const validateAddress = function(inputAddress) {
    let checkAddress = false;
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let testAddress = addressRegExp.test(inputAddress.value)
    if (testAddress) {
        formAddress.style.boxShadow = '0px 0px 10px green'
        formAddress.style.boxSizing = 'border-box'
        document.getElementById("addressErrorMsg").innerHTML = "Adresse valide !"
        document.getElementById("addressErrorMsg").style.color = '#A9F570'
        checkAddress = true;
    } else {
        formAddress.style.boxShadow = '0px 0px 10px red'
        formAddress.style.boxSizing = 'border-box'
        document.getElementById("addressErrorMsg").innerHTML = `${inputAddress.value} n'est pas valide !`
        document.getElementById("addressErrorMsg").style.color = '#F9BDBD'
    }
    return checkAddress;
};

//LASTNAME
formLastName.addEventListener('change', function() {
    validateLastName(this)
});
const validateLastName = function(inputLastName) {
    let checkLastName = false;
    let lastNameRegExp = new RegExp('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*.{2,}$', 'g');
    let testLastName = lastNameRegExp.test(inputLastName.value)
    if (testLastName) {
        formLastName.style.boxShadow = '0px 0px 10px green'
        formLastName.style.boxSizing = 'border-box'
        document.getElementById("lastNameErrorMsg").innerHTML = "Nom valide !"
        document.getElementById("lastNameErrorMsg").style.color = '#A9F570'
        checkLastName = true;
    } else {
        formLastName.style.boxShadow = '0px 0px 10px red'
        formLastName.style.boxSizing = 'border-box'
        document.getElementById("lastNameErrorMsg").innerHTML = `${inputLastName.value} n'est pas valide !`
        document.getElementById("lastNameErrorMsg").style.color = '#F9BDBD'
    }
    return checkLastName;
};

//FIRSTNAME
formFirstName.addEventListener('change', function() {
    validateFirstName(this)
});
const validateFirstName = function(inputFirstName) {
    checkFirstName = false;
    let firstNameRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*.{2,}$', 'g');
    let testFirstName = firstNameRegExp.test(inputFirstName.value)
    if (testFirstName) {
        formFirstName.style.boxShadow = '0px 0px 10px green'
        formFirstName.style.boxSizing = 'border-box'
        document.getElementById("firstNameErrorMsg").innerHTML = "Prénom valide !"
        document.getElementById("firstNameErrorMsg").style.color = '#A9F570'
        checkFirstName = true;
    } else {
        formFirstName.style.boxShadow = '0px 0px 10px red'
        formFirstName.style.boxSizing = 'border-box'
        document.getElementById("firstNameErrorMsg").innerHTML = `${inputFirstName.value} n'est pas valide !`
        document.getElementById("firstNameErrorMsg").style.color = '#F9BDBD'
    }
    return checkFirstName;
};

function checkForm() {

    let check = false;

    if (validateEmail(formEmail) &&
        validateAddress(formAddress) &&
        validateCity(formCity) &&
        validateFirstName(formFirstName) &&
        validateLastName(formLastName)) {
        check = true;
    }

    return check;
}

//ENVOI FORMULAIRE
formOrder.addEventListener('click', function(event) {
    event.preventDefault();
    var valid = true;

    for (let input of document.querySelectorAll(".cart__order__form")) {
        valid &= input.reportValidity(); //Vérifie la validité des inputs du form
        if (!valid) {
            break;
        }
    }

    //console.log(valid)

    if (valid == 1 && checkForm()) {
        //console.log(valid)
        const contact = {
            firstName: formFirstName.value,
            lastName: formLastName.value,
            address: formAddress.value,
            city: formCity.value,
            email: formEmail.value,
        }
        localStorage.setItem('Contact', JSON.stringify(contact));

        let products = [];
        for (m = 0; m < localCart.length; m++) {
            products.push(localCart[m].id)
        }

        let submitProducts = { contact, products };
        console.log(submitProducts);

        fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(submitProducts),
                headers: {
                    "content-type": "application/json",
                }
            })
            .then(res => {
                return res.json();
            }).then((data) => {
                let orderId = data.orderId;
                window.location.href = `./confirmation.html?id=${orderId}`;
                console.log(orderId);
            }).catch((error) => {
                console.log(error);
            })
    }
});

addItem();
totalPriceProduct();
modifyCart();
deleteItem();