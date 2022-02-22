// récupération order id
let params = new URL(document.location).searchParams;
let showId = params.get("id");
console.log(showId); //récupère l'ID de la commande dans l'URL

const nbrOrder = document.getElementById("orderId");
nbrOrder.innerHTML = showId; //Affiche le numéro de commande
localStorage.clear() //Vide le local storage