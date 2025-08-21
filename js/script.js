document.addEventListener('DOMContentLoaded', () => {
    // Динамическая замена H1 для маркетинговых кампаний
    const newTitle = new URLSearchParams(location.search).get('h');
    if (newTitle) {
        document.querySelectorAll('h1').forEach(h1 => h1.innerHTML = newTitle);
    }
    
    initPricingToggle();
    initPromoTimer();
});

// Показать/скрыть дополнительные услуги в прайс-листе
function initPricingToggle() {
    const btn = document.getElementById('showMoreBtn');
    const rows = document.querySelectorAll('.pricing__row-hidden');
    
    if (!btn || !rows.length) return;
    
    let expanded = false;
    btn.addEventListener('click', () => {
        expanded = !expanded;
        rows.forEach(row => row.style.display = expanded ? 'table-row' : 'none');
        btn.innerHTML = expanded 
            ? '<i class="ri-subtract-line"></i> Скрыть'
            : '<i class="ri-add-line"></i> Показать еще';
    });
}

// Таймер обратного отсчета до конца дня
function initPromoTimer() {
    const elements = {
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    if (!Object.values(elements).every(Boolean)) return;
    
    const updateTimer = () => {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const timeLeft = endOfDay.getTime() - Date.now();
        
        if (timeLeft < 0) {
            setTimeout(updateTimer, 1000);
            return;
        }
        
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        
        elements.hours.textContent = hours.toString().padStart(2, '0');
        elements.minutes.textContent = minutes.toString().padStart(2, '0');
        elements.seconds.textContent = seconds.toString().padStart(2, '0');
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Плавная прокрутка к элементу
const smoothScroll = target => {
    document.querySelector(target)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};