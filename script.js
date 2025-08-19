document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Marcar items con submenú
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.querySelector('.submenu')) {
            item.querySelector('.nav-link').classList.add('has-submenu');
        }
    });
    
    // Manejo de clics en móvil
    function setupMobileMenu() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Remover eventos previos para evitar duplicados
            link.removeEventListener('click', handleClick);
            link.addEventListener('click', handleClick);
        });
        
        function handleClick(e) {
            const parentItem = this.closest('.nav-item');
            const submenu = parentItem.querySelector('.submenu');
            
            if (submenu) {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar otros submenús
                document.querySelectorAll('.submenu').forEach(sm => {
                    if (sm !== submenu) {
                        sm.classList.remove('active');
                        sm.closest('.nav-item').querySelector('.nav-link').classList.remove('active');
                    }
                });
                
                // Toggle submenú actual
                submenu.classList.toggle('active');
                this.classList.toggle('active');
            } else {
                // Cerrar todo al seleccionar item final
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.querySelectorAll('.submenu').forEach(sm => {
                    sm.classList.remove('active');
                });
                document.querySelectorAll('.nav-link').forEach(lnk => {
                    lnk.classList.remove('active');
                });
            }
        }
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.querySelectorAll('.submenu').forEach(sm => {
                sm.classList.remove('active');
            });
            document.querySelectorAll('.nav-link').forEach(lnk => {
                lnk.classList.remove('active');
            });
        }
    });
    
    // Configurar menú según tamaño de pantalla
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            setupMobileMenu();
        } else {
            // Resetear estilos en desktop
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.querySelectorAll('.submenu').forEach(sm => {
                sm.classList.remove('active');
            });
            document.querySelectorAll('.nav-link').forEach(lnk => {
                lnk.classList.remove('active');
            });
        }
    }
    
    // Inicializar y redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Marcar página activa (se mantiene igual)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .submenu a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active-page');
            
            if (link.parentElement.parentElement.classList.contains('submenu')) {
                const parentItem = link.closest('.nav-item');
                if (parentItem) {
                    const parentLink = parentItem.querySelector('.nav-link');
                    parentLink.classList.add('active-page');
                    
                    if (window.innerWidth <= 768) {
                        const submenu = parentItem.querySelector('.submenu');
                        if (submenu) {
                            submenu.classList.add('active');
                        }
                    }
                }
            }
        }
    });

    // Animación de aparición escalonada
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach((producto, index) => {
        // Retraso escalonado para la animación
        setTimeout(() => {
            producto.classList.add('visible');
        }, 150 * index);
    });

    // Efecto hover mejorado
    productos.forEach(producto => {
        producto.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        producto.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });

    // Aparecer elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    productos.forEach(producto => {
        observer.observe(producto);
    });

    const pasos = document.querySelectorAll(".paso");

    const pasoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                pasoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    pasos.forEach(paso => pasoObserver.observe(paso));

    const seccion = document.querySelector('.historia-negocio');
    if (!seccion) return;

    const observerHistoria = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    observerHistoria.observe(seccion);

    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elementos = document.querySelectorAll('.eslogan, .galeria');
        
        elementos.forEach(elemento => {
            const elementoPos = elemento.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            
            if (elementoPos < screenPos) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Establecer propiedades iniciales
    const eslogans = document.querySelectorAll('.eslogan');
    const galeria = document.querySelector('.galeria');
    
    eslogans.forEach(eslogan => {
        eslogan.style.opacity = '0';
        eslogan.style.transform = 'translateY(50px)';
        eslogan.style.transition = 'all 0.8s ease';
    });
    
    galeria.style.opacity = '0';
    galeria.style.transform = 'translateY(50px)';
    galeria.style.transition = 'all 0.8s ease';
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Efecto hover para items de galería
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    
    itemsGaleria.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
            this.querySelector('p').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('p').style.transform = 'translateY(100%)';
        });
    });
});

