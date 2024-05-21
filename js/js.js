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




document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const progressCount = document.querySelector('.progress-count');

    // مدة تحميل الشريط
    const loaderDuration = 3000; // مدة حركة الشريط بالمللي ثانية

    // بدء عملية العد
    function startCounting() {
        let startTime = performance.now();
        function animateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(1, elapsedTime / loaderDuration);
            const progressPercent = Math.round(progress * 100);
            progressCount.textContent = progressPercent + '%';
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                preloader.classList.add('fade-out');
            }
        }
        requestAnimationFrame(animateCount);
    }

    // عند انتهاء حركة التلاشي
    preloader.addEventListener('animationend', () => {
        preloader.style.display = 'none';
        content.style.display = 'block';
    });

    // بدء العد بعد تحميل الصفحة
    startCounting();
});