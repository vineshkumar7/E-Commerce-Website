document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    const orderSummaryTable = document.querySelector('#payment-section .order-summary table');
    const paymentSection = document.getElementById('payment-section');
    
    // Handle menu open/close
    const close = document.querySelector(".close");
    const open = document.querySelector(".ham");
    const menu = document.querySelector(".menu");

    close.addEventListener("click", () => {
        menu.style.visibility = "hidden";
    });

    open.addEventListener("click", () => {
        menu.style.visibility = "visible";
    });

    // Handle adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemDiv = button.closest('.items');
            addToCart(itemDiv);
        });
    });

    // Handle buying items immediately
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const itemDiv = button.closest('.items');
            addToCart(itemDiv);
            showPaymentSection();
        });
    });

    function addToCart(itemDiv) {
        const name = itemDiv.querySelector('.name').textContent;
        const price = parseInt(itemDiv.querySelector('.price').textContent.replace('₹', '').replace(',', ''), 10);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsDiv.innerHTML += `<div class="item-summary">${item.name} - ₹${item.price} x ${item.quantity}</div>`;
        });

        totalPriceDiv.textContent = `Total: ₹${total}`;
    }

    function showPaymentSection() {
        document.getElementById('payment-section').style.display = 'block';
        populateOrderSummary();
    }

    function populateOrderSummary() {
        orderSummaryTable.innerHTML = `
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        `;

        cart.forEach(item => {
            orderSummaryTable.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price * item.quantity}</td>
                </tr>
            `;
        });

        // Update the total price in the order summary section
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        orderSummaryTable.innerHTML += `
            <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>₹${total}</strong></td>
            </tr>
        `;
    }

    // Handle payment form submission
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment information submitted');
        // You can add further processing here
    });

    // Handle checkout
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Cart is empty');
        } else {
            showPaymentSection();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle contact info
    function toggleContactInfo() {
        var contactInfo = document.getElementById('contact-info');
        contactInfo.classList.toggle('hidden');
    }

    // Function to show payment section and hide cart summary
    function showPaymentSection() {
        document.getElementById('cart-summary').classList.add('hidden');
        document.getElementById('payment-section').classList.remove('hidden');
    }

    // Function to show personal details section and hide payment section
    function showPersonalDetailsSection() {
        document.getElementById('payment-section').classList.add('hidden');
        document.getElementById('personal-details-section').classList.remove('hidden');
    }

    // Attach event listener to the checkout button
    document.getElementById('checkout').addEventListener('click', function() {
        showPaymentSection();
    });

    // Attach event listener to the payment form submission
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        showPersonalDetailsSection();
    });
});