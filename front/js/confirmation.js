// récupération order id
let params = new URL(document.location).searchParams;
let showId = params.get("id");
console.log(showId);

const nbrOrder = document.getElementById("orderId");
nbrOrder.innerHTML = showId;
localStorage.clear()