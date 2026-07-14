// ============================================================
// UNIFY TECHNOLOGIES - Advanced Dynamic Website Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
            initScrollReveal();
        }, 1800);
    });

    // ========== COPYRIGHT YEAR ==========
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // ========== CUSTOM CURSOR ==========
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .glass-card, .service-card, .industry-card, .tech-item, .contact-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('dot-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('dot-hover');
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }

    // ========== PARTICLE SYSTEM ==========
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? '#00d4ff' : '#7b2ff7';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function initParticles() {
            const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#00d4ff';
                        ctx.globalAlpha = 0.08 * (1 - dist / 150);
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationFrameId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Mouse interaction with particles
        let particleMouseX = 0, particleMouseY = 0;
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            particleMouseX = e.clientX - rect.left;
            particleMouseY = e.clientY - rect.top;
            particles.forEach(p => {
                const dx = p.x - particleMouseX;
                const dy = p.y - particleMouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x += dx * 0.02;
                    p.y += dy * 0.02;
                }
            });
        });
    }

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNavLink() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = navbar.offsetHeight + 20;
                    const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            } catch (err) {
                console.warn('Invalid scroll target selector:', href);
            }
        });
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========== ANIMATED COUNTERS ==========
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Hero stats counter
    const heroStatNumbers = document.querySelectorAll('.stat-number');
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroStatNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    animateCounter(num, target);
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroStatsObserver.observe(heroStats);

    // Stats section counter
    const statCounts = document.querySelectorAll('.stat-count');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statCounts.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    animateCounter(num, target, 2500);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) statsObserver.observe(statsSection);

    // ========== GLASS CARD TILT EFFECT ==========
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Move glow with mouse
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.15), transparent 60%)`;
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = 'transparent';
            }
        });
    });

    // ========== TECH STACK TABS ==========
    const techTabs = document.querySelectorAll('.tech-tab');
    const techGrids = document.querySelectorAll('.tech-grid');

    techTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active from all
            techTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Animate grid switch
            techGrids.forEach(grid => {
                if (grid.classList.contains('active')) {
                    grid.style.opacity = '0';
                    grid.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        grid.classList.remove('active');
                        grid.style.display = 'none';
                    }, 300);
                }
            });

            setTimeout(() => {
                const targetGrid = document.querySelector(`.tech-grid[data-content="${targetTab}"]`);
                if (targetGrid) {
                    targetGrid.style.display = 'grid';
                    targetGrid.classList.add('active');
                    requestAnimationFrame(() => {
                        targetGrid.style.opacity = '1';
                        targetGrid.style.transform = 'translateY(0)';
                    });

                    // Stagger animate individual items
                    const items = targetGrid.querySelectorAll('.tech-item');
                    items.forEach((item, i) => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, i * 80);
                    });
                }
            }, 350);
        });
    });

    // ========== TESTIMONIAL SLIDER ==========
    const testimonialTrack = document.getElementById('testimonialTrack');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDotsContainer = document.getElementById('sliderDots');

    if (testimonialTrack) {
        const testimonialCards = testimonialTrack.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        let slidesPerView = getSlidesPerView();
        let totalSlides = Math.ceil(testimonialCards.length / slidesPerView);
        let isAutoPlaying = true;
        let autoPlayTimer;

        function getSlidesPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1200) return 2;
            return 3;
        }

        function createDots() {
            sliderDotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                sliderDotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index) {
            currentSlide = index;
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = 30;
            const offset = currentSlide * slidesPerView * (cardWidth + gap);
            testimonialTrack.style.transform = `translateX(-${offset}px)`;

            // Update dots
            const dots = sliderDotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }

        function startAutoPlay() {
            autoPlayTimer = setInterval(() => {
                if (isAutoPlaying) nextSlide();
            }, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
        }

        sliderNext.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        sliderPrev.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        }, { passive: true });

        // Handle resize
        window.addEventListener('resize', () => {
            slidesPerView = getSlidesPerView();
            totalSlides = Math.ceil(testimonialCards.length / slidesPerView);
            createDots();
            goToSlide(0);
        });

        createDots();
        startAutoPlay();
    }

    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const btn = newsletterForm.querySelector('button');
            
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Subscribed!</span>';
            btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
            emailInput.value = '';
            
            setTimeout(() => {
                btn.innerHTML = '<span>Subscribe</span><i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
            }, 3000);
        });
    }

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== TYPING EFFECT FOR HERO SUBTITLE ==========
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const phrases = [
            'We take pride in delivering premium IT solutions with our experience & expertise.',
            'Transforming ideas into powerful digital products.',
            'Building the future, one line of code at a time.',
            'Your vision, our innovation — limitless possibilities.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingCursor = heroSubtitle.querySelector('.typing-cursor');

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            heroSubtitle.textContent = currentPhrase.substring(0, charIndex);
            heroSubtitle.appendChild(typingCursor);

            let speed = isDeleting ? 30 : 50;

            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500; // Pause before new phrase
            }

            setTimeout(typeEffect, speed);
        }

        // Start typing after preloader
        setTimeout(typeEffect, 2500);
    }

    // ========== PARALLAX ON MOUSE MOVE (Hero) ==========
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

            const badges = heroSection.querySelectorAll('.floating-badge');
            badges.forEach((badge, i) => {
                const factor = (i + 1) * 1.5;
                badge.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });

            const orbs = heroSection.querySelectorAll('.orb');
            orbs.forEach((orb, i) => {
                const factor = (i + 1) * 0.5;
                orb.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });
    }

    // ========== SERVICE CARD HOVER EFFECTS ==========
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').style.transform = 'rotateY(360deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-icon').style.transform = 'rotateY(0deg)';
        });
    });

    // ========== PROCESS STEP ANIMATIONS ==========
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => processObserver.observe(step));

    // ========== INDUSTRY CARD HOVER RIPPLE ==========
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== MAGNETIC BUTTONS ==========
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-cta');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========== DROPDOWN MENU BEHAVIOR ==========
    const dropdownParents = document.querySelectorAll('.has-dropdown');
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('.nav-link');
        const dropdown = parent.querySelector('.dropdown-menu');
        
        // Mobile: toggle on click
        if (window.innerWidth <= 992) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                parent.classList.toggle('dropdown-open');
            });
        }
    });

    // ========== SMOOTH SECTION TRANSITIONS ==========
    // Add parallax scrolling effect to sections
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                // Parallax for hero section
                const hero = document.querySelector('.hero-content');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========== INITIALIZE VISIBLE TECH GRIDS ==========
    techGrids.forEach(grid => {
        if (!grid.classList.contains('active')) {
            grid.style.display = 'none';
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(20px)';
        } else {
            grid.style.display = 'grid';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        }
    });

    console.log('🚀 Unify Technologies - Dynamic Website Loaded Successfully!');
});
