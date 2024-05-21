
const productList = [
    { name: 'لابتوب', price: 1000, category: 'electronics', image: '../img/Blue And Violet Modern New Product Facebook Post.png', reviews: [{ rating: 4, comment: 'جيد جدًا' }, { rating: 5, comment: 'ممتاز' }] },
    { name: 'هاتف ذكي', price: 800, category: 'electronics', image: '../img/Beige Electronic Sale Facebook Post.png', reviews: [{ rating: 3, comment: 'متوسط' }, { rating: 4, comment: 'جيد' }] },
    { name: 'قميص اطفال', price: 50, category: 'clothing', image: '../img/Green and Orange Modern Fashion Business Instagram Post.png', reviews: [{ rating: 5, comment: 'ممتاز' }, { rating: 4, comment: 'جيد جدًا' }] },
    { name: 'بنطال نسائي', price: 80, category: 'clothing', image: '../img/Clothing Sale Instagram Post.png', reviews: [{ rating: 4, comment: 'جيد' }, { rating: 3, comment: 'لا بأس' }] },
    { name: 'مكياجات', price: 500, category: 'home-garden', image: '../img/22222222222222.png', reviews: [{ rating: 5, comment: 'رائعة' }, { rating: 4, comment: 'جيدة جدًا' }] },
    { name: 'اسوارة', price: 30, category: 'home-garden', image: '../img/3232323.png', reviews: [{ rating: 4, comment: 'مفيدة' }, { rating: 3, comment: 'متوسطة' }] },
    { name: 'لابتوب', price: 1000, category: 'electronics', image: '../img/Blue And Violet Modern New Product Facebook Post.png', reviews: [{ rating: 4, comment: 'جيد جدًا' }, { rating: 5, comment: 'ممتاز' }] },
    { name: 'هاتف ذكي', price: 800, category: 'electronics', image: '../img/Beige Electronic Sale Facebook Post.png', reviews: [{ rating: 3, comment: 'متوسط' }, { rating: 4, comment: 'جيد' }] },
    { name: 'قميص اطفال', price: 50, category: 'clothing', image: '../img/Green and Orange Modern Fashion Business Instagram Post.png', reviews: [{ rating: 5, comment: 'ممتاز' }, { rating: 4, comment: 'جيد جدًا' }] },
    { name: 'بنطال نسائي', price: 80, category: 'clothing', image: '../img/Clothing Sale Instagram Post.png', reviews: [{ rating: 4, comment: 'جيد' }, { rating: 3, comment: 'لا بأس' }] },
    { name: 'مكياجات', price: 500, category: 'home-garden', image: '../img/22222222222222.png', reviews: [{ rating: 5, comment: 'رائعة' }, { rating: 4, comment: 'جيدة جدًا' }] },
    { name: 'اسوارة', price: 30, category: 'home-garden', image: '../img/3232323.png', reviews: [{ rating: 4, comment: 'مفيدة' }, { rating: 3, comment: 'متوسطة' }] }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(productList);
    updateCartCount();
});

// عرض المنتجات
function displayProducts(productList) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // مسح المحتوى القديم

    productList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p class="price">${product.price}$</p>
            <button class="add-to-cart-btn">إضافة إلى السلة</button>
            <div class="reviews">
                <h4>التقييمات والمراجعات</h4>
                ${product.reviews.map(review => `
                    <div class="review">
                        <p class="rating">التقييم: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                        <p>التعليق: ${review.comment}</p>
                    </div>
                `).join('')}
            </div>
        `;
        productsContainer.appendChild(productElement);

        // إضافة حدث النقر لزر "إضافة إلى السلة"
        productElement.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(product);
            showConfirmationMessage();
            updateCartCount();
        });
    });
}

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function showConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = cartItems.length;
}

// تصفية المنتجات حسب الفئة
document.getElementById('category').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredProducts = category === 'all' ? productList : productList.filter(product => product.category === category);
    displayProducts(filteredProducts);
});

// تحديث قيمة النطاق (السعر)
document.getElementById('price').addEventListener('input', (e) => {
    document.getElementById('price-value').textContent = e.target.value;
});

// تصفية المنتجات حسب السعر
document.getElementById('price').addEventListener('change', (e) => {
    const maxPrice = e.target.value;
    const filteredProducts = productList.filter(product => product.price <= maxPrice);
    displayProducts(filteredProducts);
});

// بحث المنتجات
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = productList.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
});