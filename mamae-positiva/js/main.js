document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const initMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const spans = mobileMenu.querySelectorAll('span');
                
                spans.forEach((span, index) => {
                    if (navLinks.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
                    } else {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenu.querySelectorAll('span').forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });

            // Close mobile menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenu.querySelectorAll('span').forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                });
            });
        }
    };

    // Form handling
    const initContactForm = () => {
        const contactForm = document.querySelector('.contato-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Simple form validation
                if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    alert('Por favor, insira um email válido.');
                    return;
                }

                // Phone validation
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(data.telefone)) {
                    alert('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX');
                    return;
                }

                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            });
        }
    };

    // Phone mask
    const initPhoneMask = () => {
        const telefoneInput = document.querySelector('input[name="telefone"]');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length >= 2) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                }
                if (value.length >= 10) {
                    value = `${value.slice(0, 9)}-${value.slice(9)}`;
                }
                
                e.target.value = value;
            });
        }
    };

    // Smooth scroll
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Header scroll effect
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        if (header) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    return;
                }
                
                if (currentScroll > lastScroll) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }
                
                lastScroll = currentScroll;
            });
        }
    };

    // Initialize all components
    initMobileMenu();
    initContactForm();
    initPhoneMask();
    initSmoothScroll();
    initHeaderScroll();
});
