// Handle User Authentication
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email }));
        window.location.href = 'home.html';
    } else {
        alert('Please enter valid credentials');
    }
}

function checkAuth() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'login.html';
    }
}

function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Handle Products and Cart
const products = [
    { id: 1, name: 'Product 1', image: 'img1.jpg', description: 'Description 1', price: 10 },
    { id: 2, name: 'Product 2', image: 'img2.jpg', description: 'Description 2', price: 20 }
];

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('product-list')) {
        displayProducts();
    }
    if (document.getElementById('cart-items')) {
        displayCart();
    }
});

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach((product, index) => {
        total += product.price;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    document.getElementById('total-price').innerText = `Total: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
