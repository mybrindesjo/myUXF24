document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    let cart = [];

    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(ticketForm);
        const ticket = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            tickets: formData.get('tickets'),
            days: formData.get('days'),
            ticketType: formData.get('ticketType'),
            price: getPrice(formData.get('ticketType'))
        };
        cart.push(ticket);
        updateCart();
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Tack för din beställning!');
        cart = [];
        updateCart();
    });

    function getPrice(ticketType) {
        switch (ticketType) {
            case 'Dagpass': return 500;
            case 'Kvällspass': return 750;
            case 'Helgpass': return 1500;
            case 'VIP': return 3000;
            default: return 0;
        }
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.ticketType} - ${item.tickets} biljetter - ${item.price * item.tickets} kr</p>
                <button onclick="removeItem(${index})">Ta bort</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.tickets;
        });
        cartTotal.innerText = `Total: ${total} kr`;
    }

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
    };
});