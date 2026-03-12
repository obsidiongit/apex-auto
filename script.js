/* ===================================
   WEBSITE TEMPLATE - JavaScript Utilities
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initScrollEffects();
    initForms();
    initReviewCarousel();
    initPopup();
    initBooking();
    initHeroCarousel();
});

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ===================================
   SMOOTH SCROLL
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const topBarHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   SCROLL EFFECTS
   =================================== */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.service-card, .visual-card, .testimonial-card, .stat, .contact-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // URL-based active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');

        // precise match or home page
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ===================================
   FORMS
   =================================== */
function initForms() {
    // Quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this, 'Quote request submitted! We\'ll be in touch soon.');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this, 'Thank you! Your message has been sent.');
        });
    }
}

function handleFormSubmit(form, successMessage) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification(successMessage, 'success');

        // Reset form
        form.reset();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success'
            ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        }
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    // Add styles - uses CSS variable for primary color
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary, #D4A853)' : 'var(--error, #EF4444)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-content svg {
                width: 24px;
                height: 24px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ===================================
   REVIEW CAROUSEL
   =================================== */
function initReviewCarousel() {
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const wrapper = document.querySelector('.review-card-wrapper');

    if (!prevBtn || !nextBtn || !wrapper) return;

    // For now, just add a subtle animation on button click
    // Expand this for multiple reviews as needed

    let currentIndex = 0;

    prevBtn.addEventListener('click', () => {
        wrapper.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            wrapper.style.transform = 'translateX(0)';
        }, 150);
    });

    nextBtn.addEventListener('click', () => {
        wrapper.style.transform = 'translateX(10px)';
        setTimeout(() => {
            wrapper.style.transform = 'translateX(0)';
        }, 150);
    });

    wrapper.style.transition = 'transform 0.15s ease';
}

/* ===================================
   $25 OFF POPUP
   =================================== */
function initPopup() {
    const popup = document.getElementById('discountPopup');
    const closeBtn = document.getElementById('popupClose');
    const dismissBtn = document.getElementById('popupDismiss');
    const popupForm = document.getElementById('popupForm');

    if (!popup) return;

    // Check if popup was already dismissed
    if (localStorage.getItem('apexPopupDismissed')) return;

    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('active');
    }, 3000);

    function closePopup() {
        popup.classList.remove('active');
        localStorage.setItem('apexPopupDismissed', 'true');
    }

    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (dismissBtn) dismissBtn.addEventListener('click', closePopup);

    // Close on overlay click
    popup.addEventListener('click', function (e) {
        if (e.target === popup) closePopup();
    });

    // Handle form submit
    if (popupForm) {
        popupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Thanks! Your $25 discount has been applied.', 'success');
            closePopup();
        });
    }
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone number formatting (US format)
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
});

// Console branding
console.log('%c🏆 Apex Auto Studio', 'font-size: 24px; font-weight: bold; color: #D4A853;');
console.log('%cPremium Mobile Auto Detailing', 'font-size: 14px; color: #D4A853;');

/* ===================================
   BOOKING SYSTEM
   =================================== */
function initBooking() {
    // Only run on booking page
    const bookingSection = document.querySelector('.booking-section');
    if (!bookingSection) return;

    // State
    let currentStep = 1;
    let selectedService = null;
    let selectedDate = null;
    let selectedTime = null;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Service name mapping
    const serviceNames = {
        exterior: 'Exterior Detail',
        interior: 'Interior Detail',
        full: 'Full Detail',
        executive: 'Executive Detail',
        paint: 'Paint Correction'
    };

    // Elements
    const steps = document.querySelectorAll('.booking-step');
    const stepItems = document.querySelectorAll('.step-item');
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarTitle = document.getElementById('calendarTitle');
    const serviceCards = document.querySelectorAll('.booking-service-card');
    const timeSlots = document.querySelectorAll('.time-slot');
    const step1Next = document.getElementById('step1Next');
    const step2Next = document.getElementById('step2Next');
    const step2Back = document.getElementById('step2Back');
    const step3Back = document.getElementById('step3Back');
    const bookingSubmit = document.getElementById('bookingSubmit');
    const bookingModal = document.getElementById('bookingModal');
    const modalClose = document.getElementById('modalClose');

    // Summary elements
    const summaryServiceValue = document.getElementById('summaryServiceValue');
    const summaryDateValue = document.getElementById('summaryDateValue');
    const summaryTimeValue = document.getElementById('summaryTimeValue');
    const summaryPriceValue = document.getElementById('summaryPriceValue');

    // === Service Selection ===
    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            serviceCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');

            selectedService = {
                id: this.dataset.service,
                name: serviceNames[this.dataset.service],
                price: parseInt(this.dataset.price)
            };

            step1Next.disabled = false;
            updateSummary();
        });
    });

    // === Step Navigation ===
    function goToStep(step) {
        currentStep = step;

        // Update step panels
        steps.forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById('bookingStep' + step);
        if (targetStep) targetStep.classList.add('active');

        // Update step indicators
        stepItems.forEach(item => {
            const itemStep = parseInt(item.dataset.step);
            item.classList.remove('active', 'completed');
            if (itemStep === step) {
                item.classList.add('active');
            } else if (itemStep < step) {
                item.classList.add('completed');
            }
        });

        // Render calendar when entering step 2
        if (step === 2) {
            renderCalendar();
        }

        // Scroll to top of booking section
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (step1Next) step1Next.addEventListener('click', () => goToStep(2));
    if (step2Back) step2Back.addEventListener('click', () => goToStep(1));
    if (step2Next) step2Next.addEventListener('click', () => goToStep(3));
    if (step3Back) step3Back.addEventListener('click', () => goToStep(2));

    // === Calendar ===
    function renderCalendar() {
        if (!calendarGrid || !calendarTitle) return;

        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        calendarGrid.innerHTML = '';

        // Empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            calendarGrid.appendChild(empty);
        }

        // Day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const date = new Date(currentYear, currentMonth, day);
            date.setHours(0, 0, 0, 0);

            // Disable past dates and Sundays
            if (date < today || date.getDay() === 0) {
                dayEl.classList.add('disabled');
            } else {
                // Highlight today
                if (date.getTime() === today.getTime()) {
                    dayEl.classList.add('today');
                }

                // Check if this date is selected
                if (selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === currentMonth &&
                    selectedDate.getFullYear() === currentYear) {
                    dayEl.classList.add('selected');
                }

                dayEl.addEventListener('click', function () {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedDate = new Date(currentYear, currentMonth, day);
                    updateSummary();
                    updateStep2Button();
                });
            }

            calendarGrid.appendChild(dayEl);
        }
    }

    // Calendar navigation
    const calendarPrev = document.getElementById('calendarPrev');
    const calendarNext = document.getElementById('calendarNext');

    if (calendarPrev) {
        calendarPrev.addEventListener('click', () => {
            const today = new Date();
            // Don't go before current month
            if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }

    if (calendarNext) {
        calendarNext.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }

    // === Time Slots ===
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.dataset.time;
            updateSummary();
            updateStep2Button();
        });
    });

    function updateStep2Button() {
        if (step2Next) {
            step2Next.disabled = !(selectedDate && selectedTime);
        }
    }

    // === Summary Updates ===
    function updateSummary() {
        if (summaryServiceValue) {
            summaryServiceValue.textContent = selectedService ? selectedService.name : '—';
        }
        if (summaryDateValue) {
            if (selectedDate) {
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                summaryDateValue.textContent = selectedDate.toLocaleDateString('en-US', options);
            } else {
                summaryDateValue.textContent = '—';
            }
        }
        if (summaryTimeValue) {
            summaryTimeValue.textContent = selectedTime || '—';
        }
        if (summaryPriceValue) {
            if (selectedService && selectedService.price > 0) {
                summaryPriceValue.textContent = `From $${selectedService.price}`;
            } else if (selectedService) {
                summaryPriceValue.textContent = 'Custom Quote';
            } else {
                summaryPriceValue.textContent = '—';
            }
        }
    }

    // === Booking Submission ===
    if (bookingSubmit) {
        bookingSubmit.addEventListener('click', function () {
            const name = document.getElementById('bookName');
            const phone = document.getElementById('bookPhone');
            const vehicle = document.getElementById('bookVehicle');

            // Basic validation
            if (!name || !name.value.trim()) {
                name && name.focus();
                showNotification('Please enter your name.', 'error');
                return;
            }
            if (!phone || !phone.value.trim()) {
                phone && phone.focus();
                showNotification('Please enter your phone number.', 'error');
                return;
            }
            if (!vehicle || !vehicle.value.trim()) {
                vehicle && vehicle.focus();
                showNotification('Please enter your vehicle info.', 'error');
                return;
            }

            // Show loading state
            bookingSubmit.disabled = true;
            bookingSubmit.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="40" stroke-dashoffset="10"></circle>
                </svg>
                Processing...
            `;

            // Add spin animation
            if (!document.querySelector('#spin-style')) {
                const spinStyle = document.createElement('style');
                spinStyle.id = 'spin-style';
                spinStyle.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
                document.head.appendChild(spinStyle);
            }

            // Simulate submission
            setTimeout(() => {
                bookingSubmit.disabled = false;
                bookingSubmit.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Confirm Booking
                `;

                // Build modal details
                const modalDetails = document.getElementById('modalDetails');
                if (modalDetails) {
                    const dateStr = selectedDate
                        ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                        : 'N/A';
                    const priceStr = selectedService && selectedService.price > 0
                        ? `From $${selectedService.price}`
                        : 'Custom Quote';

                    modalDetails.innerHTML = `
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Service</span>
                            <span class="modal-detail-value">${selectedService ? selectedService.name : 'N/A'}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Date</span>
                            <span class="modal-detail-value">${dateStr}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Time</span>
                            <span class="modal-detail-value">${selectedTime || 'N/A'}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Name</span>
                            <span class="modal-detail-value">${name.value}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Phone</span>
                            <span class="modal-detail-value">${phone.value}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Vehicle</span>
                            <span class="modal-detail-value">${vehicle.value}</span>
                        </div>
                        <div class="modal-detail-row">
                            <span class="modal-detail-label">Estimated Price</span>
                            <span class="modal-detail-value" style="color: var(--primary); font-weight: 800;">${priceStr}</span>
                        </div>
                    `;
                }

                // Show modal
                if (bookingModal) {
                    bookingModal.classList.add('active');
                }
            }, 1500);
        });
    }

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });
    }
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) bookingModal.classList.remove('active');
        });
    }
}

/* ===================================
   HERO VIDEO CAROUSEL
   =================================== */
function initHeroCarousel() {
    const videoPlayer = document.getElementById('heroVideoPlayer');
    if (!videoPlayer) return;

    const videos = ['assets/hero1.mp4', 'assets/hero2.mp4', 'assets/hero3.mp4'];
    let currentIndex = 0;

    videoPlayer.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % videos.length;
        videoPlayer.src = videos[currentIndex];
        videoPlayer.play().catch(e => console.error("Video playback prevented:", e));
    });
}
