/* ==========================================================================
   PATATOS Food Truck | main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STICKY NAV ---
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. MOBILE MENU ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-footer .btn');

    function toggleMobileMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');

        if (!isExpanded) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
        } else {
            document.body.style.overflow = '';
        }
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- 3. SMOOTH SCROLL FOR ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Account for fixed header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. INTERSECTION OBSERVER (SCROLL REVEAL) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // If reduced motion, show all immediately
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- 5. GOOGLE MAPS INIT ---
    // (Moved to global scope below)

    // --- 6. FORM VALIDATION & AJAX ---
    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset message
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';
            formMessage.textContent = '';

            const submitBtn = bookingForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;

            // Basic Frontend Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showMessage('error', 'Vul alstublieft alle verplichte velden in.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('error', 'Voer een geldig e-mailadres in.');
                return;
            }

            // Prepare Data
            const formData = {
                name: name,
                email: email,
                message: message
            };

            // Loading state
            submitBtn.classList.add('is-loading');
            submitBtn.disabled = true;

            try {
                const response = await fetch('/assets/php/booking-handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showMessage('success', result.message);
                    bookingForm.reset();
                } else {
                    showMessage('error', result.message || 'Er is een fout opgetreden.');
                }
            } catch (error) {
                showMessage('error', 'Kan geen verbinding maken met de server. Probeer het later opnieuw.');
            } finally {
                submitBtn.classList.remove('is-loading');
                submitBtn.disabled = false;
            }
        });
    }

    function showMessage(type, text) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
});

// --- 7. STATIC CONTENT INITIALIZATION ---

// Store events globally for map sync
window.PATATOS_EVENTS = [];

// Helper text sanitation
const escapeHtml = (unsafe) => {
    return (unsafe || '').toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const initFaqInteractions = () => {
    const faqTabs = document.querySelectorAll('.faq-tab-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    // Tabs
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            faqTabs.forEach(t => t.classList.remove('active'));
            faqCategories.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Accordion Logic
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            const inner = content.querySelector('.accordion-inner');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all others in the same category
            const parentCategory = item.closest('.faq-category');
            parentCategory.querySelectorAll('.accordion-trigger').forEach(t => {
                if (t !== this) {
                    t.setAttribute('aria-expanded', 'false');
                    const c = t.parentElement.querySelector('.accordion-content');
                    c.style.maxHeight = null;
                    t.parentElement.classList.remove('active');
                }
            });

            // Toggle current
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
                item.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                // Calculate height including padding
                content.style.maxHeight = inner.offsetHeight + 'px';
                item.classList.add('active');
            }
        });
    });
};

const extractEventsFromDOM = () => {
    const eventCards = document.querySelectorAll('.events-list .event-card');
    window.PATATOS_EVENTS = Array.from(eventCards).map(card => {
        return {
            lat: parseFloat(card.getAttribute('data-lat')),
            lng: parseFloat(card.getAttribute('data-lng')),
            name: card.querySelector('.event-name').textContent,
            type: card.querySelector('.event-badge').textContent,
            date: card.querySelector('.event-date').textContent.replace('📅 ', '').split(' | ')[0],
            time: card.querySelector('.event-date').textContent.replace('📅 ', '').split(' | ')[1],
            address: card.querySelector('.event-address').textContent.replace('📍 ', '')
        };
    });
    setupMapSidebarClicks();
};

const setupMapSidebarClicks = () => {
    if (!window.googleMarkers || window.googleMarkers.length === 0) return;

    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        // Ensure index matches correctly if not set in HTML
        if (!card.hasAttribute('data-index')) {
            card.setAttribute('data-index', index);
        }

        card.addEventListener('click', function () {
            const idx = this.getAttribute('data-index');
            const targetMarker = window.googleMarkers[idx];
            if (targetMarker) {
                google.maps.event.trigger(targetMarker, 'click');
                // Scroll map into view on mobile
                if (window.innerWidth < 1024) {
                    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

// Orchestrate initialization
const initStaticContent = () => {
    initFaqInteractions();
    extractEventsFromDOM();
};

// Wait for DOM to be fully loaded before initializing static interactions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStaticContent);
} else {
    initStaticContent();
}

// --- 8. GOOGLE MAPS INIT ---
let map;
window.googleMarkers = []; // Stored globally for sidebar sync
let infoWindow;

// Required globally for Google Maps callback
window.initMap = function () {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return; // Note: Events might not be loaded yet, we'll draw map and add markers below

    // Netherlands Center point
    const nlCenter = { lat: 52.1326, lng: 5.2913 };

    // Custom Dark Map Style
    const darkMapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#1a1815" }] },
        { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8070" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a1815" }] },
        { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#c0522a" }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#12110d" }] },
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#2c2a26" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#1a1815" }] },
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8070" }] },
        { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f0e0b" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8070" }] }
    ];

    map = new google.maps.Map(mapContainer, {
        zoom: 7,
        center: nlCenter,
        styles: darkMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        backgroundColor: '#0f0e0b'
    });

    infoWindow = new google.maps.InfoWindow();

    // Check periodically if window.PATATOS_EVENTS has been populated by HTML extraction
    const checkEventsAndDrawMarkers = setInterval(() => {
        if (window.PATATOS_EVENTS && window.PATATOS_EVENTS.length > 0) {
            clearInterval(checkEventsAndDrawMarkers);

            const markerIcon = {
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                fillColor: "#c0522a",
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 1.5,
                anchor: new google.maps.Point(12, 22),
            };

            // Add markers
            window.PATATOS_EVENTS.forEach((event, index) => {
                const position = { lat: parseFloat(event.lat), lng: parseFloat(event.lng) };

                const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: event.name,
                    icon: markerIcon
                });

                window.googleMarkers.push(marker);

                let typeColor = '#d4a843'; // gold
                if (event.type === 'Festival') typeColor = '#c0522a'; // terracotta
                if (event.type === 'Pop-up') typeColor = '#39ff14'; // neon
                if (event.type === 'Vast') typeColor = '#7c3aed'; // purple

                const contentString = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h4 style="font-family: 'Playfair Display', serif; color: ${typeColor}; margin: 0 0 5px 0; font-size: 16px;">${escapeHtml(event.name)}</h4>
                        <p style="margin: 0; color: #f5f0e8; font-size: 13px;">📅 ${escapeHtml(event.date)}</p>
                        <p style="margin: 2px 0 0 0; color: #8a8070; font-size: 13px;">⏰ ${escapeHtml(event.time)}</p>
                        <p style="margin: 8px 0 0 0; color: #f5f0e8; font-size: 12px;">📍 ${escapeHtml(event.address)}</p>
                    </div>
                `;

                marker.addListener('click', () => {
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                    map.panTo(position);
                    map.setZoom(14);
                });
            });

            // Link up any sidebar items
            setupMapSidebarClicks();
        }
    }, 100);
};
