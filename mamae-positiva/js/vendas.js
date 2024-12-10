document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const inscricaoForm = document.querySelector('.inscricao-form');
    if (inscricaoForm) {
        inscricaoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(inscricaoForm);
            const data = Object.fromEntries(formData);
            
            // Validate phone number
            const phone = data.telefone.replace(/\D/g, '');
            if (phone.length < 10 || phone.length > 11) {
                alert('Por favor, insira um número de telefone válido.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll show a success message
            const message = `Obrigado pelo interesse, ${data.nome}! Em breve nossa equipe entrará em contato com você para dar início à sua jornada no programa ${data.programa}.`;
            alert(message);
            inscricaoForm.reset();
        });
    }

    // Phone number mask
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 9) {
                value = `${value.slice(0, 9)}-${value.slice(9)}`;
            }
            
            e.target.value = value;
        });
    }

    // Smooth scroll for anchor links
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

    // Animate numbers in resultados section
    const animateNumbers = () => {
        const numeros = document.querySelectorAll('.numero');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numero = entry.target;
                    const valor = parseInt(numero.textContent);
                    let contador = 0;
                    
                    const incremento = valor / 50; // Ajuste para velocidade da animação
                    const duracao = 1500; // Duração total da animação em ms
                    const intervalo = duracao / 50;
                    
                    const animation = setInterval(() => {
                        contador += incremento;
                        if (contador >= valor) {
                            numero.textContent = valor + '%';
                            clearInterval(animation);
                        } else {
                            numero.textContent = Math.round(contador) + '%';
                        }
                    }, intervalo);
                    
                    observer.unobserve(numero);
                }
            });
        }, {
            threshold: 0.5
        });

        numeros.forEach(numero => observer.observe(numero));
    };

    animateNumbers();

    // Highlight featured plan
    const destacarPlano = () => {
        const planoDestaque = document.querySelector('.oferta-card.destaque');
        if (planoDestaque) {
            setInterval(() => {
                planoDestaque.classList.add('pulse');
                setTimeout(() => {
                    planoDestaque.classList.remove('pulse');
                }, 1000);
            }, 5000);
        }
    };

    destacarPlano();

    // Add animation class to cards on scroll
    const observeCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.beneficio-card, .resultado-card, .oferta-card, .faq-item');
        elements.forEach(element => observer.observe(element));
    };

    observeCards();
});
