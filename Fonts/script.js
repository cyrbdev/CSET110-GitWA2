let cart = new Map();
let buttons = document.querySelectorAll(".shop-item-button");

for (let i = 0; i < buttons.length; i++) {
buttons[i].addEventListener("click", function() {
    let product = buttons[i].closest(".shop-item");

    let name = product.querySelector(".shop-item-title").innerText;
    let price = product.querySelector(".shop-item-price").innerText;

    cartInformation(name, price);
});
}

function cartInformation(name, price) {
    if (cart.has(name)) {
        alert("This item is already in your cart!");
    } else {
        cart.set(name, price);
        console.log(cart);
        aparecerProducto();
    }
}

function aparecerProducto(){
    let cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = "";
    
}