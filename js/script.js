document.addEventListener('DOMContentLoaded', () => {
    // Динамическая замена H1 для маркетинговых кампаний
    const newTitle = new URLSearchParams(location.search).get('h');
    if (newTitle) {
        document.querySelectorAll('h1').forEach(h1 => h1.innerHTML = newTitle);
    }
    
    initPricingToggle();
    initPromoTimer();
    initTestimonialsCarousel();
    initSmoothScrolling();
    initMobileMenu();
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

// Карусель отзывов с автопрокруткой
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const slides = document.querySelectorAll('.testimonials__slide');
    const indicators = document.querySelectorAll('.testimonials__indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (!track || !slides.length || !indicators.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    // Показать слайд
    const showSlide = (index) => {
        // Убрать active у всех слайдов и индикаторов
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Добавить active к текущему слайду и индикатору
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    };
    
    // Следующий слайд
    const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };
    
    // Предыдущий слайд
    const prevSlide = () => {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    };
    
    // Обработчики для стрелок
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Инициализация плавной прокрутки для всех ссылок
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Плавная прокрутка к элементу (резервная функция)
const smoothScroll = target => {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const targetElement = document.querySelector(target);
    
    if (targetElement) {
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Мобильное меню
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.header__mobile-nav-link');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    // Переключение мобильного меню
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = mobileMenuToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Закрытие меню при клике на ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Закрытие меню при нажатии ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuToggle.setAttribute('aria-label', 'Закрыть меню');
        document.body.style.overflow = 'hidden'; // Предотвращаем скролл страницы
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
        document.body.style.overflow = ''; // Восстанавливаем скролл страницы
    }
}