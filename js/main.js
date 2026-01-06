/**
 * Elena Vance Realty Microsite
 * Main JavaScript
 * 
 * Vanilla ES6+ - No dependencies
 */

(function() {
    'use strict';

    // ============================================
    // UTILITIES
    // ============================================
    
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
    
    const debounce = (fn, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    };

    const throttle = (fn, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ============================================
    // LOADER
    // ============================================
    
    const Loader = {
        el: $('.loader'),
        
        init() {
            if (!this.el) return;
            
            const hideLoader = () => {
                setTimeout(() => {
                    this.el.classList.add('is-hidden');
                    document.body.classList.remove('scroll-locked');
                    
                    // Remove from DOM after transition
                    setTimeout(() => {
                        this.el.remove();
                    }, 500);
                }, 600);
            };
            
            // Hide loader when page is ready
            if (document.readyState === 'complete') {
                // Already loaded
                hideLoader();
            } else {
                // Wait for load, but with a safety timeout
                window.addEventListener('load', hideLoader);
                
                // Fallback: hide after 3 seconds max regardless
                setTimeout(hideLoader, 3000);
            }
            
            // Lock scroll while loading
            document.body.classList.add('scroll-locked');
        }
    };

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    
    const Cursor = {
        cursor: $('.cursor'),
        dot: $('.cursor__dot'),
        ring: $('.cursor__ring'),
        pos: { x: 0, y: 0 },
        mouse: { x: 0, y: 0 },
        
        init() {
            if (!this.cursor || window.matchMedia('(pointer: coarse)').matches) {
                if (this.cursor) this.cursor.remove();
                return;
            }
            
            // Track mouse position
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            
            // Hover states
            const interactiveElements = $$('a, button, input, textarea, select, [data-cursor]');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor--hover'));
                el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor--hover'));
            });
            
            // Click states
            document.addEventListener('mousedown', () => this.cursor.classList.add('cursor--click'));
            document.addEventListener('mouseup', () => this.cursor.classList.remove('cursor--click'));
            
            // Animate
            this.animate();
        },
        
        animate() {
            // Smooth follow for ring
            this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
            this.pos.y += (this.mouse.y - this.pos.y) * 0.15;
            
            // Dot follows exactly
            this.dot.style.left = `${this.mouse.x}px`;
            this.dot.style.top = `${this.mouse.y}px`;
            
            // Ring follows with lag
            this.ring.style.left = `${this.pos.x}px`;
            this.ring.style.top = `${this.pos.y}px`;
            
            requestAnimationFrame(() => this.animate());
        }
    };

    // ============================================
    // HEADER
    // ============================================
    
    const Header = {
        el: $('.header'),
        lastScroll: 0,
        scrollThreshold: 100,
        hideThreshold: 500,
        
        init() {
            if (!this.el) return;
            
            window.addEventListener('scroll', throttle(() => this.onScroll(), 100));
            this.onScroll(); // Initial check
        },
        
        onScroll() {
            const currentScroll = window.scrollY;
            
            // Add/remove scrolled state
            if (currentScroll > this.scrollThreshold) {
                this.el.classList.add('is-scrolled');
            } else {
                this.el.classList.remove('is-scrolled');
            }
            
            // Hide/show on scroll direction (only after threshold)
            if (currentScroll > this.hideThreshold) {
                if (currentScroll > this.lastScroll && currentScroll > this.hideThreshold) {
                    // Scrolling down
                    this.el.classList.add('is-hidden');
                } else {
                    // Scrolling up
                    this.el.classList.remove('is-hidden');
                }
            } else {
                this.el.classList.remove('is-hidden');
            }
            
            this.lastScroll = currentScroll;
        }
    };

    // ============================================
    // MOBILE MENU
    // ============================================
    
    const MobileMenu = {
        menu: $('.mobile-menu'),
        btn: $('.header__menu-btn'),
        links: $$('.mobile-menu__link'),
        isOpen: false,
        
        init() {
            if (!this.menu || !this.btn) return;
            
            this.btn.addEventListener('click', () => this.toggle());
            
            // Close on link click
            this.links.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            
            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        },
        
        toggle() {
            this.isOpen ? this.close() : this.open();
        },
        
        open() {
            this.isOpen = true;
            this.menu.classList.add('is-open');
            this.menu.setAttribute('aria-hidden', 'false');
            this.btn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('scroll-locked');
        },
        
        close() {
            this.isOpen = false;
            this.menu.classList.remove('is-open');
            this.menu.setAttribute('aria-hidden', 'true');
            this.btn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('scroll-locked');
        }
    };

    // ============================================
    // SCROLL REVEAL
    // ============================================
    
    const ScrollReveal = {
        elements: [],
        
        init() {
            this.elements = $$('.reveal');
            if (this.elements.length === 0) return;
            
            // Create observer
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );
            
            this.elements.forEach(el => observer.observe(el));
        }
    };

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    const SmoothScroll = {
        init() {
            $$('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = $(href);
                    if (!target) return;
                    
                    e.preventDefault();
                    
                    const headerHeight = $('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        }
    };

    // ============================================
    // PROPERTY MODAL
    // ============================================
    
    const PropertyModal = {
        modal: $('#property-modal'),
        content: null,
        isOpen: false,
        
        // Property data (would typically come from an API)
        properties: {
            mitchell: {
                location: 'Ridgewood Hills',
                title: 'The Mitchell Residence',
                price: '$1,450,000',
                specs: {
                    beds: '4',
                    baths: '3',
                    sqft: '3,200',
                    acres: '0.8'
                },
                description: 'A masterfully restored 1958 post-and-beam residence by noted architect Harold Zellman. Original details including mahogany paneling, terrazzo floors, and floor-to-ceiling glass walls have been preserved while the kitchen and bathrooms received thoughtful contemporary updates.',
                features: [
                    'Original post-and-beam construction',
                    'Terrazzo floors throughout',
                    'Chef\'s kitchen with Sub-Zero',
                    'Primary suite with garden access',
                    'Detached studio/office',
                    'Mature oak grove setting'
                ],
                images: ['assets/images/property-1.jpg']
            },
            laurel: {
                location: 'Laurel Canyon',
                title: 'Cantilever House',
                price: '$1,875,000',
                specs: {
                    beds: '3',
                    baths: '2.5',
                    sqft: '2,800',
                    acres: '1.2'
                },
                description: 'A striking contemporary residence that appears to float above the hillside. Designed by emerging architect Maria Santos in 2019, the home maximizes its dramatic site with walls of glass, cantilevered living spaces, and seamless indoor-outdoor flow.',
                features: [
                    'Dramatic cantilever design',
                    '180-degree valley views',
                    'Board-formed concrete walls',
                    'Radiant floor heating',
                    'Infinity-edge pool',
                    'EV charging ready'
                ],
                images: ['assets/images/property-2.jpg']
            },
            oak: {
                location: 'Oak Hollow',
                title: 'The Pemberton',
                price: '$2,250,000',
                specs: {
                    beds: '5',
                    baths: '4',
                    sqft: '4,100',
                    acres: '2.1'
                },
                description: 'A rare offering in one of Ashford Valley\'s most coveted enclaves. This 1962 residence was designed by Richard Pemberton for his own family and has remained in their ownership until now. Exceptional original details meet a setting of unparalleled privacy.',
                features: [
                    'Designed by Richard Pemberton',
                    'Never before on market',
                    'Original built-in furnishings',
                    'Creek frontage',
                    'Guest house',
                    'Historic designation eligible'
                ],
                images: ['assets/images/property-3.jpg']
            },
            meadow: {
                location: 'Meadow Bend',
                title: 'Courtyard Residence',
                price: '$1,125,000',
                specs: {
                    beds: '3',
                    baths: '3',
                    sqft: '2,400',
                    acres: '0.6'
                },
                description: 'A serene single-story home organized around a central courtyard with reflecting pool. The design draws inspiration from Case Study principles, emphasizing connection to nature, flexible living spaces, and an honest expression of materials.',
                features: [
                    'Central courtyard design',
                    'Reflecting pool',
                    'All-bedroom suites',
                    'Clerestory windows',
                    'Drought-tolerant landscape',
                    'Solar panels'
                ],
                images: ['assets/images/property-4.jpg']
            }
        },
        
        init() {
            if (!this.modal) return;
            
            this.content = $('.modal__content', this.modal);
            
            // Open modal buttons
            $$('[data-modal]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const propertyId = btn.dataset.modal;
                    this.open(propertyId);
                });
            });
            
            // Close modal
            $$('[data-close-modal]', this.modal).forEach(el => {
                el.addEventListener('click', () => this.close());
            });
            
            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        },
        
        open(propertyId) {
            const property = this.properties[propertyId];
            if (!property) return;
            
            this.renderContent(property);
            
            this.isOpen = true;
            this.modal.classList.add('is-open');
            this.modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('scroll-locked');
            
            // Focus trap
            const closeBtn = $('.modal__close', this.modal);
            if (closeBtn) closeBtn.focus();
        },
        
        close() {
            this.isOpen = false;
            this.modal.classList.remove('is-open');
            this.modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('scroll-locked');
        },
        
        renderContent(property) {
            this.content.innerHTML = `
                <div class="modal__gallery">
                    <img 
                        src="${property.images[0]}" 
                        alt="${property.title}" 
                        class="modal__gallery-image"
                    >
                </div>
                <div class="modal__details">
                    <span class="modal__location">${property.location}</span>
                    <h3 class="modal__title">${property.title}</h3>
                    <p class="modal__price">${property.price}</p>
                    
                    <div class="modal__specs-grid">
                        <div class="modal__spec">
                            <span class="modal__spec-value">${property.specs.beds}</span>
                            <span class="modal__spec-label">Bedrooms</span>
                        </div>
                        <div class="modal__spec">
                            <span class="modal__spec-value">${property.specs.baths}</span>
                            <span class="modal__spec-label">Bathrooms</span>
                        </div>
                        <div class="modal__spec">
                            <span class="modal__spec-value">${property.specs.sqft}</span>
                            <span class="modal__spec-label">Sq Ft</span>
                        </div>
                        <div class="modal__spec">
                            <span class="modal__spec-value">${property.specs.acres}</span>
                            <span class="modal__spec-label">Acres</span>
                        </div>
                    </div>
                    
                    <p class="modal__description">${property.description}</p>
                    
                    <div class="modal__features">
                        <h4 class="modal__features-title">Features</h4>
                        <ul class="modal__features-list">
                            ${property.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal__cta">
                        <a href="#contact" class="btn btn--primary" onclick="PropertyModal.close()">Schedule a Showing</a>
                        <button class="btn btn--secondary" onclick="PropertyModal.close()">Close</button>
                    </div>
                </div>
            `;
        }
    };
    
    // Make PropertyModal accessible globally for inline onclick
    window.PropertyModal = PropertyModal;

    // ============================================
    // FORM HANDLING
    // ============================================
    
    const Forms = {
        init() {
            this.initContactForm();
            this.initGuideForm();
        },
        
        initContactForm() {
            const form = $('#contact-form');
            if (!form) return;
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm(form)) return;
                
                const btn = $('button[type="submit"]', form);
                btn.classList.add('is-loading');
                
                // Simulate API call
                await this.simulateSubmit();
                
                btn.classList.remove('is-loading');
                this.showSuccess(form, 'Message Sent', 'Thank you for reaching out. I\'ll be in touch within 24 hours.');
            });
        },
        
        initGuideForm() {
            const form = $('#guide-form');
            if (!form) return;
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm(form)) return;
                
                const btn = $('button[type="submit"]', form);
                btn.classList.add('is-loading');
                
                // Simulate API call
                await this.simulateSubmit();
                
                btn.classList.remove('is-loading');
                this.showSuccess(form, 'Check Your Inbox', 'The Considered Buyer\'s Guide is on its way to your email.');
            });
        },
        
        validateForm(form) {
            let isValid = true;
            const inputs = $$('input[required], select[required], textarea[required]', form);
            
            // Clear previous errors
            $$('.input-error', form).forEach(el => el.remove());
            $$('.is-invalid', form).forEach(el => el.classList.remove('is-invalid'));
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    this.showInputError(input, 'This field is required');
                    isValid = false;
                } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                    this.showInputError(input, 'Please enter a valid email');
                    isValid = false;
                }
            });
            
            return isValid;
        },
        
        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        
        showInputError(input, message) {
            input.classList.add('is-invalid');
            const error = document.createElement('p');
            error.className = 'input-error';
            error.textContent = message;
            input.parentNode.appendChild(error);
        },
        
        showSuccess(form, title, message) {
            form.innerHTML = `
                <div class="form-success">
                    <svg class="form-success__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12l3 3 5-6"/>
                    </svg>
                    <h3 class="form-success__title">${title}</h3>
                    <p class="form-success__text">${message}</p>
                </div>
            `;
        },
        
        simulateSubmit() {
            return new Promise(resolve => setTimeout(resolve, 1500));
        }
    };

    // ============================================
    // BACK TO TOP
    // ============================================
    
    const BackToTop = {
        btn: null,
        
        init() {
            // Create button
            this.btn = document.createElement('button');
            this.btn.className = 'back-to-top';
            this.btn.setAttribute('aria-label', 'Back to top');
            this.btn.innerHTML = `
                <svg class="back-to-top__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
            `;
            document.body.appendChild(this.btn);
            
            // Click handler
            this.btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Show/hide based on scroll
            window.addEventListener('scroll', throttle(() => {
                if (window.scrollY > 500) {
                    this.btn.classList.add('is-visible');
                } else {
                    this.btn.classList.remove('is-visible');
                }
            }, 100));
        }
    };

    // ============================================
    // COPYRIGHT YEAR
    // ============================================
    
    const CopyrightYear = {
        init() {
            const el = $('#copyright-year');
            if (el) {
                el.textContent = new Date().getFullYear();
            }
        }
    };

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    
    const CounterAnimation = {
        init() {
            const counters = $$('.neighborhood__stat-value');
            if (counters.length === 0) return;
            
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animate(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            
            counters.forEach(counter => observer.observe(counter));
        },
        
        animate(el) {
            const text = el.textContent;
            const match = text.match(/^([\d.]+)(.*)$/);
            
            if (!match) return;
            
            const target = parseFloat(match[1]);
            const suffix = match[2] || '';
            const duration = 2000;
            const isFloat = text.includes('.');
            
            let start = 0;
            const startTime = performance.now();
            
            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;
                
                el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = text; // Ensure exact final value
                }
            };
            
            requestAnimationFrame(update);
        }
    };

    // ============================================
    // INITIALIZE
    // ============================================
    
    const init = () => {
        Loader.init();
        Cursor.init();
        Header.init();
        MobileMenu.init();
        ScrollReveal.init();
        SmoothScroll.init();
        PropertyModal.init();
        Forms.init();
        BackToTop.init();
        CopyrightYear.init();
        CounterAnimation.init();
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
