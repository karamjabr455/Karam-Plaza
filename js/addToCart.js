// عرض المنتجات في صفحة السلة
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('tr');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
         
                <td><img src="${item.image}" alt="${item.name}" class="cart-item-image"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="remove-btn" data-index="${index}">حذف</button></td>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // إضافة أحداث النقر إلى أزرار الحذف
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                displayCartItems();
                updateCartCounter();
            });
        });
    }

    function updateCartCounter() {
        const cartCounter = document.getElementById('cart-counter');
        cartCounter.textContent = cartItems.length;
    }

    displayCartItems();
    updateCartCounter();
});