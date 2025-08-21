// Fine Stirka - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно #forma уже готово в Tilda
    // Все CTA-кнопки используют href="#forma" для открытия модалки
    
    // Инициализация функционала "Показать еще" для прайс-листа
    initPricingToggle();
});

// Функционал показа/скрытия дополнительных услуг в прайс-листе
function initPricingToggle() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenRows = document.querySelectorAll('.pricing__row-hidden');
    
    if (showMoreBtn && hiddenRows.length > 0) {
        let isExpanded = false;
        
        showMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Показать скрытые строки
                hiddenRows.forEach(row => {
                    row.style.display = 'table-row';
                });
                
                // Изменить текст и иконку кнопки
                showMoreBtn.innerHTML = '<i class="ri-subtract-line"></i> Скрыть';
                isExpanded = true;
            } else {
                // Скрыть строки
                hiddenRows.forEach(row => {
                    row.style.display = 'none';
                });
                
                // Вернуть исходный текст и иконку
                showMoreBtn.innerHTML = '<i class="ri-add-line"></i> Показать еще';
                isExpanded = false;
            }
        });
    }
}

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