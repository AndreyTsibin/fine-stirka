// Fine Stirka - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно #forma уже готово в Tilda
    // Все CTA-кнопки используют href="#forma" для открытия модалки
});

// Countdown timer function (for promotional section)
function startCountdown() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate time until end of day (23:59)
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const endOfDay = today.getTime();
    
    // Update countdown every second
    const timer = setInterval(function() {
        const currentTime = new Date().getTime();
        const timeLeft = endOfDay - currentTime;
        
        // Calculate hours, minutes and seconds
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Display countdown
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // If countdown is finished, restart for next day
        if (timeLeft < 0) {
            clearInterval(timer);
            setTimeout(startCountdown, 1000);
        }
    }, 1000);
}

// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Reviews carousel auto-scroll (будет добавлено позднее)
function initReviewsCarousel() {
    // Функционал для автопрокрутки отзывов
}