// Get the "Add to Cart" buttons across the page
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Get the notification element
const cartNotification = document.getElementById('cart-notification');

// Item to display the number of products in the cart
const cartCounter = document.getElementById('cart-counter');

// A variable to store the number of products in the cart
let productsInCart = 0;

// Get products from localStorage if they exist
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update the display of the number of products in the cart when the page loads
if (cartItems.length > 0) {
    productsInCart = cartItems.length;
    cartCounter.textContent = productsInCart;
}

//Add a click event to each "add to cart" button
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
       // Show notification
        cartNotification.style.display = 'block';

       // Increase the number of products in the cart by one
        productsInCart++;

        // Update the display of the number of products in the cart
        cartCounter.textContent = productsInCart;

       // Add the product to the shopping cart
        const product = {
            name: button.getAttribute('data-name'),
            price: button.getAttribute('data-price'),
            image: button.getAttribute('data-image')
        };
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

       // Hide the notification after 4 seconds
        setTimeout(function() {
            cartNotification.style.display = 'none';
        }, 4000);
    });
});


// .............................announcements..........................................................................


const announcements = document.querySelectorAll('.announcement');
let currentIndex = 0;

function showNextAnnouncements() {
    // إخفاء جميع الإعلانات
    announcements.forEach(announcement => announcement.style.display = 'none');

    // عرض الإعلانات الجديدة
    for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % announcements.length;
        announcements[index].style.display = 'block';
    }

    // تحديث الفهرس للانتقال إلى الإعلانات التالية
    currentIndex = (currentIndex + 4) % announcements.length;
}

setInterval(showNextAnnouncements, 3000); // تغيير الإعلانات كل 3 ثوانٍ

// عرض أول أربع صور عند تحميل الصفحة
showNextAnnouncements();








//...........................................................................................................






// Products for each category
const products = {
    electronics: [
        { name: 'لابتوب', price: '$1000', image: '../img/Yellow Geometric Electronic Sale Facebook Post.png' },
        { name: 'هيدفون&هاتف ذكي', price: '$800', image: '../img/Beige Electronic Sale Facebook Post.png' },
        { name: 'لابتوب', price: '$1000', image: '../img/Blue And Violet Modern New Product Facebook Post.png' },

       //Add more products here
    ],
    clothing: [
        { name: 'قميص اطفال', price: '$50', image: '../img/Green and Orange Modern Fashion Business Instagram Post.png' },
        { name: 'بنطال نسائي', price: '$80' , image: '../img/Clothing Sale Instagram Post.png'},
        { name: 'قميص رجالي', price: '$50', image: '../img/Green and Orange Modern Fashion Business Instagram Pos1t.png' },
        //Add more products here
    ],
    'home-garden': [
        { name: 'مكياجات', price: '$50', image: '../img/22222222222222.png' },
        { name: 'اسوارة', price: '$30', image: '../img/3232323.png' },
      //Add more products here
    ]
};

// العناوين لكل فئة
const titles = {
    electronics: 'إلكترونيات',
    clothing: 'ملابس',
    'home-garden': 'اكسسوارات'
};

// العنصر المستهدف
const productsBox = document.getElementById('products-box');
const boxTitle = document.getElementById('box-title');
const boxProducts = document.getElementById('box-products');

// إضافة حدث النقر لكل رابط في الأقسام
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // منع السلوك الافتراضي للرابط

        const category = this.getAttribute('data-category');
        updateBox(category); // تحديث البوكس مع المنتجات المتعلقة بالفئة المحددة
    });
});

// تحديث محتوى البوكس
function updateBox(category) {
    boxTitle.textContent = titles[category]; // تحديث عنوان البوكس

    // مسح المنتجات السابقة
    boxProducts.innerHTML = '';

    // إضافة المنتجات الجديدة
    products[category].forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h4>${product.name}</h4>
            <img src="${product.image}" alt="${product.name}">
            <p class="price">${product.price}</p>
            <button class="add-to-cart-btn">إضافة إلى السلة</button>
        `;
        boxProducts.appendChild(productElement);
    });

    // إضافة أحداث النقر لأزرار "إضافة إلى السلة"
    const addToCartButtons = boxProducts.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            addToCart(products[category][index]);
        });
    });

    // إظهار البوكس
    productsBox.style.display = 'block';
}

// الحصول على زر الإغلاق
const closeBtn = document.getElementById('close-btn');

// إضافة حدث النقر لزر الإغلاق
closeBtn.addEventListener('click', function() {
    productsBox.style.display = 'none'; // إخفاء البوكس
});

// إضافة المنتج إلى السلة وتحديث العداد
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // تحديث عداد السلة
    const cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = cartItems.length;

    // إظهار الإشعار وإخفائه بعد 4 ثوانٍ
    const cartNotification = document.getElementById('cart-notification');
    cartNotification.style.display = 'block';
    setTimeout(function() {
        cartNotification.style.display = 'none';
    }, 4000);
}

//.......................................................................

// تاريخ نهاية العرض (نهاية الشهر)
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 1);
endDate.setDate(0); // تعيين التاريخ ليكون آخر يوم في الشهر الحالي

// تحديث العد التنازلي كل ثانية
const countdownElement = document.getElementById('countdown');
const countdownText = document.getElementById('countdown-text');

function updateCountdown() {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) {
        countdownElement.textContent = 'انتهى العرض';
        countdownElement.classList.add('expired');
        countdownText.style.display = 'none'; // إخفاء النص الأصلي عند انتهاء العرض
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.textContent = `يتبقى ${days} يوم و ${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`;
        countdownElement.classList.remove('expired');
    }
}

// تحديث العد التنازلي كل ثانية
updateCountdown();
setInterval(updateCountdown, 1000);




