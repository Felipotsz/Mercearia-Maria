// Gerenciamento de tema
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;

        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
}

window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
        const isActive = mobileNav.classList.toggle('active');

        const spans = mobileMenuBtn.querySelectorAll('span');
        if (spans.length === 3) {
            if (isActive) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        this.classList.add('active');
        const targetTab = document.getElementById(`${tabId}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    });
});

function openWhatsApp() {
    const phoneNumber = '5515998617035';
    const message = 'Olá! Gostaria de mais informações sobre os produtos da Mercearia Maria.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = new Map();
        this.toastId = 0;

        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toastContainer';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    show(title, message, type = 'info', duration = 5000) {
        const id = ++this.toastId;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        `;

        this.container.appendChild(toast);
        this.toasts.set(id, toast);

        setTimeout(() => {
            this.dismiss(id);
        }, duration);

        toast.addEventListener('click', () => {
            this.dismiss(id);
        });

        return id;
    }

    dismiss(id) {
        const toast = this.toasts.get(id);
        if (toast) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                this.toasts.delete(id);
            }, 300);
        }
    }

    success(title, message, duration = 5000) {
        return this.show(title, message, 'success', duration);
    }

    error(title, message, duration = 5000) {
        return this.show(title, message, 'error', duration);
    }

    info(title, message, duration = 5000) {
        return this.show(title, message, 'info', duration);
    }
}

const toastManager = new ToastManager();

class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        toastManager.success(
            'Mensagem Enviada!',
            'Obrigado pelo seu contato. Retornaremos em breve.',
            4000
        );

        this.form.reset();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeManager = new ThemeManager();

    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const firstTabBtn = document.querySelector('.tab-btn');
    const firstTabContent = document.querySelector('.tab-content');

    if (firstTabBtn && firstTabContent && !firstTabBtn.classList.contains('active')) {
        firstTabBtn.classList.add('active');
        firstTabContent.classList.add('active');
    }

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    setTimeout(() => {
        toastManager.info(
            'Bem-vindo!',
            'Explore nossos produtos e serviços.',
            3000
        );
    }, 1000);
});

const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for theme switching */
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
`;
document.head.appendChild(style);

const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    formatPhoneNumber(phone) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.value-card, .product-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ToastManager,
        FormHandler,
        Utils,
        openWhatsApp
    };
}

class ProductsCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicators .indicator');
        this.prevBtn = document.querySelector('.carousel-nav.nav-prev');
        this.nextBtn = document.querySelector('.carousel-nav.nav-next');

        if (!this.slides.length) return;

        this.currentSlide = 0;
        this.slideInterval = null;
        this.rotationDelay = 5000;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoRotation();
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoRotation();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoRotation();
            });
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoRotation();
            });
        });

        const carousel = document.querySelector('.products-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.pauseAutoRotation();
            });

            carousel.addEventListener('mouseleave', () => {
                this.startAutoRotation();
            });

            carousel.addEventListener('touchstart', () => {
                this.pauseAutoRotation();
            });
        }

        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    goToSlide(slideIndex) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        this.slides[slideIndex].classList.add('active');
        this.indicators[slideIndex].classList.add('active');

        this.currentSlide = slideIndex;
    }

    nextSlide() {
        const nextSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextSlide);
    }

    prevSlide() {
        const prevSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevSlide);
    }

    startAutoRotation() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.rotationDelay);
    }

    pauseAutoRotation() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    resetAutoRotation() {
        this.pauseAutoRotation();
        this.startAutoRotation();
    }

    handleKeyboardNavigation(e) {
        const carousel = document.querySelector('.products-carousel');
        if (!carousel) return;

        const rect = carousel.getBoundingClientRect();
        const isCarouselVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isCarouselVisible) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                this.resetAutoRotation();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                this.resetAutoRotation();
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new ProductsCarousel();
});