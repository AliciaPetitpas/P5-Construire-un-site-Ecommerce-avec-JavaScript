// récupération order id
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

const nbrOrder = document.getElementById("OrderID");
nbrOrder.innerHTML = id
localStorage.clear()