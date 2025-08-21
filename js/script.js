// Fine Stirka - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно #forma уже готово в Tilda
    // Все CTA-кнопки используют href="#forma" для открытия модалки
    
    // Инициализация функционала "Показать еще" для прайс-листа
    initPricingToggle();
    
    // Инициализация таймера обратного отсчета для акционного блока
    initPromoTimer();
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

// Инициализация таймера обратного отсчета для акционного блока
function initPromoTimer() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) {
        return;
    }
    
    // Запуск таймера
    startPromoCountdown();
    
    function startPromoCountdown() {
        // Получить текущую дату и время
        const now = new Date();
        
        // Установить окончание дня (23:59:59)
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        // Обновление таймера каждую секунду
        const timer = setInterval(function() {
            const currentTime = new Date().getTime();
            const timeLeft = endOfDay.getTime() - currentTime;
            
            // Если время истекло, перезапустить на следующий день
            if (timeLeft < 0) {
                clearInterval(timer);
                // Перезапуск через секунду для следующего дня
                setTimeout(startPromoCountdown, 1000);
                return;
            }
            
            // Рассчитать часы, минуты и секунды
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Обновить отображение
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
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