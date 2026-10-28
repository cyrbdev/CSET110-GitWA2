
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
    for (let [name, price] of cart) {
        let add = document.createElement("div");
        add.className = "cart-row";
        add.innerHTML = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger">REMOVE</button>
        </div>
        `;
        cartItems.appendChild(add);
        let remove = add.querySelector(".btn-danger");
        remove.addEventListener("click", function(){
            cart.delete(name);
            aparecerProducto();
        });
        let quantity = add.querySelector(".cart-quantity-input");
        quantity.addEventListener("change", function(){
            actualizarTotal();
        });
    }
    actualizarTotal();
}

function actualizarTotal(){
    let total = 0;
    let rows = document.querySelectorAll(".cart-items .cart-row");

    for (let i = 0; i < rows.length; i++) {
        let price = rows[i].querySelector(".cart-price").innerText;
        let quantity = rows[i].querySelector(".cart-quantity-input").value;

        price = Number(price.replace("$", ""));
        quantity = Number(quantity);

        if (quantity < 1) {
            quantity = 1;
            rows[i].querySelector(".cart-quantity-input").value = 1;
        }

        total = total + price * quantity;
    }
    let result = document.querySelector(".cart-total-price");
    result.innerHTML = "$" + total.toFixed(2);
}

let purchase = document.querySelector(".btn-purchase");
purchase.addEventListener("click", function(){
    if (cart.size == 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart.clear();
        aparecerProducto();
    }
});
aparecerProducto();
