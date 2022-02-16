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
        divDescCont.querySelector('p').textContent = "Montant unitaire : " + localCart[i].price + "€" + " | " + "Montant total : " + totalPriceProduct + "€";
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

function checkForm() {
    const form = document.getElementsByClassName("cart__order__form");
    let formFirstName = document.getElementById("firstName");
    let formLastName = document.getElementById("lastName");
    let formAddress = document.getElementById("address");
    let formCity = document.getElementById("city");
    let formEmail = document.getElementById("email");
    let formOrder = document.getElementById("order");

    //EMAIL
    formEmail.addEventListener('change', function() {
        validateEmail(this)
    });
    const validateEmail = function(inputMail) {
        let emailRegExp = new RegExp('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
        let testEmail = emailRegExp.test(inputMail.value);
        if (testEmail) {
            formEmail.style.boxShadow = '0px 0px 10px green'
            formEmail.style.boxSizing = 'border-box'
            document.getElementById("emailErrorMsg").innerHTML = "Email valide !"
            document.getElementById("emailErrorMsg").style.color = '#A9F570'
        } else {
            formEmail.style.boxShadow = '0px 0px 10px red'
            formEmail.style.boxSizing = 'border-box'
            document.getElementById("emailErrorMsg").innerHTML = `${inputMail.value} n'est pas une adresse mail valide !`
            document.getElementById("emailErrorMsg").style.color = '#F9BDBD'
        }
    };

    //CITY
    formCity.addEventListener('change', function() {
        validateCity(this)
    });
    const validateCity = function(inputCity) {
        let cityRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
        let testCity = cityRegExp.test(inputCity.value)
        if (testCity) {
            formCity.style.boxShadow = '0px 0px 10px green'
            formCity.style.boxSizing = 'border-box'
            document.getElementById("cityErrorMsg").innerHTML = "Ville valide !"
            document.getElementById("cityErrorMsg").style.color = '#A9F570'
        } else {
            formCity.style.boxShadow = '0px 0px 10px red'
            formCity.style.boxSizing = 'border-box'
            document.getElementById("cityErrorMsg").innerHTML = `${inputCity.value} n'est pas valide !`
            document.getElementById("cityErrorMsg").style.color = '#F9BDBD'
        }
    };

    //ADDRESS
    formAddress.addEventListener('change', function() {
        validateAddress(this)
    });
    const validateAddress = function(inputAddress) {
        let addressRegExp = new RegExp('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
        let testAddress = addressRegExp.test(inputAddress.value)
        if (testAddress) {
            formAddress.style.boxShadow = '0px 0px 10px green'
            formAddress.style.boxSizing = 'border-box'
            document.getElementById("addressErrorMsg").innerHTML = "Adresse valide !"
            document.getElementById("addressErrorMsg").style.color = '#A9F570'
        } else {
            formAddress.style.boxShadow = '0px 0px 10px red'
            formAddress.style.boxSizing = 'border-box'
            document.getElementById("addressErrorMsg").innerHTML = `${inputAddress.value} n'est pas valide !`
            document.getElementById("addressErrorMsg").style.color = '#F9BDBD'
        }
    };

    //LASTNAME
    formLastName.addEventListener('change', function() {
        validateLastName(this)
    });
    const validateLastName = function(inputLastName) {
        let lastNameRegExp = new RegExp('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
        let testLastName = lastNameRegExp.test(inputLastName.value)
        if (testLastName) {
            formLastName.style.boxShadow = '0px 0px 10px green'
            formLastName.style.boxSizing = 'border-box'
            document.getElementById("lastNameErrorMsg").innerHTML = "Nom valide !"
            document.getElementById("lastNameErrorMsg").style.color = '#A9F570'
        } else {
            formLastName.style.boxShadow = '0px 0px 10px red'
            formLastName.style.boxSizing = 'border-box'
            document.getElementById("lastNameErrorMsg").innerHTML = `${inputLastName.value} n'est pas valide !`
            document.getElementById("lastNameErrorMsg").style.color = '#F9BDBD'
        }
    };

    //FIRSTNAME
    formFirstName.addEventListener('change', function() {
        validateFirstName(this)
    });
    const validateFirstName = function(inputFirstName) {
        let firstNameRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
        let testFirstName = firstNameRegExp.test(inputFirstName.value)
        if (testFirstName) {
            formFirstName.style.boxShadow = '0px 0px 10px green'
            formFirstName.style.boxSizing = 'border-box'
            document.getElementById("firstNameErrorMsg").innerHTML = "Prénom valide !"
            document.getElementById("firstNameErrorMsg").style.color = '#A9F570'
        } else {
            formFirstName.style.boxShadow = '0px 0px 10px red'
            formFirstName.style.boxSizing = 'border-box'
            document.getElementById("firstNameErrorMsg").innerHTML = `${inputFirstName.value} n'est pas valide !`
            document.getElementById("firstNameErrorMsg").style.color = '#F9BDBD'
        }
    };

    //ENVOI FORMULAIRE
    formOrder.addEventListener('click', function(event) {
        event.preventDefault();
        if (!formFirstName.value ||
            !formLastName.value ||
            !formAddress.value ||
            !formCity.value ||
            !formEmail.value
        ) {
            const order = document.getElementById('order')
            order.setAttribute('value', 'Veuillez remplir tous les champs')
            return event.preventDefault();
        } else {
            const contact = {
                firstName: `${formFirstName.value}`,
                lastName: `${formLastName.value}`,
                address: `${formAddress.value}`,
                city: `${formCity.value}`,
                email: `${formEmail.value}`
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

            //RETOUR SERVEUR
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
}


addItem();
totalPriceProduct();
modifyCart();
deleteItem();
checkForm();