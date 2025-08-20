// Fine Stirka - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('forma');
    const closeBtn = document.querySelector('.close');
    
    // Function to open modal
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Open modal when clicking CTA links
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#forma') {
            e.preventDefault();
            openModal();
        }
    });
    
    // Close modal when clicking X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Form submission
    const modalForm = document.querySelector('.modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here would be form submission logic
            alert('0O2:0 >B?@02;5=0! K A2O65<AO A 20<8 2 1;8609H55 2@5<O.');
            closeModal();
            modalForm.reset();
        });
    }
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