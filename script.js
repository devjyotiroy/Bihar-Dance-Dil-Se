// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function toggleMenu(forceOpen) {
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', shouldOpen);
    hamburger.classList.toggle('active', shouldOpen);
    hamburger.setAttribute('aria-expanded', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());

hamburger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Progressive content reveal
const advancedSectionIds = ['styles', 'gallery', 'timings', 'contact'];

function expandSite() {
    if (!document.body.classList.contains('site-expanded')) {
        document.body.classList.add('site-expanded');
    }
}

if (advancedSectionIds.includes(window.location.hash.replace('#', ''))) {
    expandSite();

    setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
    }, 0);
}

// Hero Slideshow
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentSlide = 0;
let slideTimer;

if (slides.length && dotsContainer) {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slide-dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Show slide ${index + 1}`);
        dot.addEventListener('click', () => {
            showSlide(index);
            restartSlideshow();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slide-dot');

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === currentSlide);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentSlide);
        });
    }

    function nextHeroSlide() {
        showSlide(currentSlide + 1);
    }

    function restartSlideshow() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextHeroSlide, 4500);
    }

    prevSlide?.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        restartSlideshow();
    });

    nextSlide?.addEventListener('click', () => {
        nextHeroSlide();
        restartSlideshow();
    });

    restartSlideshow();
}

// Hero Counters
const counters = document.querySelectorAll('.count');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = Number(counter.dataset.target || 0);
        const duration = 1400;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(update);
    });
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters();
            counterObserver.disconnect();
        }
    }, { threshold: 0.4 });

    counterObserver.observe(heroStats);
}

// Scroll Reveal
const revealElements = document.querySelectorAll(
    '.section-header, .about-card, .style-card, .feature-card, .gallery-item, .testimonial-card, .timing-card, .contact-form, .contact-info, .portal-card, .dashboard'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// Dance Style Details
const styleDetails = {
    hiphop: {
        title: 'Hip Hop',
        tag: 'Beginner Friendly',
        image: 'assets/images/performance-1.jpg',
        article: 'Hip Hop at BDDS focuses on rhythm, confidence, musicality and strong body control. Students learn grooves, footwork, isolations, popping basics and performance choreography in a way that feels energetic but structured. The class is perfect for students who want stage presence, stamina and a bold urban dance style.',
        points: [
            ['Groove Training', 'Build rhythm, bounce and clean musical timing.'],
            ['Choreography', 'Learn powerful routines for reels, stage and events.'],
            ['Body Control', 'Improve isolation, coordination and stamina.'],
            ['Confidence', 'Practice performance attitude with every routine.']
        ]
    },
    bollywood: {
        title: 'Bollywood',
        tag: 'Most Popular',
        image: 'assets/images/group-performance.jpg',
        article: 'Bollywood dance brings expression, drama and celebration together. In this class students learn filmy choreography, facial expressions, hand movements, footwork and group formations. It is one of the best choices for weddings, school functions, stage shows and anyone who wants joyful performance energy.',
        points: [
            ['Expression', 'Learn face, hands and body language for performance.'],
            ['Stage Moves', 'Practice clean entries, exits and group formations.'],
            ['Song Variety', 'Train on energetic, romantic and festive tracks.'],
            ['All Levels', 'Easy progressions for beginners and advanced students.']
        ]
    },
    contemporary: {
        title: 'Contemporary',
        tag: 'Intermediate',
        image: 'assets/images/event-highlight.jpg',
        article: 'Contemporary dance is about flow, emotion and storytelling. BDDS teaches floorwork, extensions, balance, transitions and expressive choreography. Students learn how to connect movement with meaning, making this class ideal for stage performances, competitions and creative dancers.',
        points: [
            ['Flow', 'Develop smooth transitions and expressive movement quality.'],
            ['Technique', 'Work on balance, extensions, turns and control.'],
            ['Storytelling', 'Connect choreography with emotion and theme.'],
            ['Performance', 'Prepare polished pieces for stage and competition.']
        ]
    },
    semiclassical: {
        title: 'Semi Classical - Kathak',
        tag: 'Kathak Only',
        image: 'assets/images/practice-session.jpg',
        article: 'BDDS teaches Semi Classical dance with a Kathak foundation only. Students work on graceful posture, hand gestures, spins, rhythm, footwork and expressions inspired by Kathak. The class blends traditional elegance with stage-friendly choreography, making it suitable for cultural programs and refined performances.',
        points: [
            ['Kathak Base', 'Practice tatkar-inspired footwork and graceful posture.'],
            ['Expressions', 'Learn nazakat, hand gestures and facial storytelling.'],
            ['Spins', 'Build controlled turns with balance and rhythm.'],
            ['Culture', 'Prepare elegant routines for classical and cultural events.']
        ]
    },
    freestyle: {
        title: 'Freestyle',
        tag: 'Advanced',
        image: 'assets/images/performance-2.jpg',
        article: 'Freestyle helps dancers discover their own movement identity. The class combines improvisation, rhythm drills, body control and creative choreography. Students learn how to move naturally with music, adapt to different songs and perform with originality.',
        points: [
            ['Improvisation', 'Respond to music with your own movement choices.'],
            ['Versatility', 'Mix grooves, turns, waves and performance steps.'],
            ['Musicality', 'Understand beats, accents and transitions.'],
            ['Creativity', 'Build your own unique dance personality.']
        ]
    },
    kids: {
        title: 'Kids Dance',
        tag: 'Age 4-12',
        image: 'assets/images/competition.jpg',
        article: 'Kids Dance at BDDS is safe, fun and confidence-building. Children learn rhythm, simple choreography, coordination and stage manners through age-friendly activities. The focus is on joy, discipline and expression, so every child feels comfortable while improving step by step.',
        points: [
            ['Safe Learning', 'Age-friendly warmups and simple movement practice.'],
            ['Coordination', 'Improve rhythm, memory and body awareness.'],
            ['Confidence', 'Encourage children to perform without fear.'],
            ['Fun Routines', 'Learn cheerful choreography for school and stage.']
        ]
    }
};

const styleModal = document.getElementById('styleModal');
const styleModalClose = document.getElementById('styleModalClose');
const styleModalVisual = document.getElementById('styleModalVisual');
const styleModalTag = document.getElementById('styleModalTag');
const styleModalTitle = document.getElementById('styleModalTitle');
const styleModalArticle = document.getElementById('styleModalArticle');
const styleModalHighlights = document.getElementById('styleModalHighlights');
const styleModalCta = document.getElementById('styleModalCta');
let lastFocusedStyleCard = null;

function openStyleModal(styleKey, trigger) {
    const detail = styleDetails[styleKey];
    if (!detail) return;

    lastFocusedStyleCard = trigger;
    styleModalVisual.style.backgroundImage = `url('${detail.image}')`;
    styleModalTag.textContent = detail.tag;
    styleModalTitle.textContent = detail.title;
    styleModalArticle.textContent = detail.article;
    styleModalHighlights.innerHTML = detail.points.map(([title, text]) => `
        <div class="style-modal-point">
            <i class="fas fa-check"></i>
            <strong>${title}</strong>
            <span>${text}</span>
        </div>
    `).join('');

    styleModal.classList.add('open');
    styleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    styleModalClose.focus();
}

function closeStyleModal() {
    styleModal.classList.remove('open');
    styleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    lastFocusedStyleCard?.focus();
}

document.querySelectorAll('.style-card[data-style]').forEach(card => {
    card.addEventListener('click', () => openStyleModal(card.dataset.style, card));
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openStyleModal(card.dataset.style, card);
        }
    });
});

styleModalClose?.addEventListener('click', closeStyleModal);
styleModal?.addEventListener('click', event => {
    if (event.target === styleModal) closeStyleModal();
});

styleModalCta?.addEventListener('click', closeStyleModal);

// Learning Portal
const danceStyleNames = {
    hiphop: 'Hip Hop',
    bollywood: 'Bollywood',
    contemporary: 'Contemporary',
    semiclassical: 'Semi Classical - Kathak',
    freestyle: 'Freestyle',
    kids: 'Kids Dance'
};

const starterResources = [
    {
        title: 'Bollywood Warmup Basics',
        style: 'bollywood',
        type: 'Practice Video',
        link: 'https://www.youtube.com/',
        note: 'Start with this before choreography practice.',
        teacher: 'BDDS Team',
        createdAt: '2026-05-08'
    },
    {
        title: 'Hip Hop Groove Drill',
        style: 'hiphop',
        type: 'Assignment',
        link: 'https://www.youtube.com/',
        note: 'Practice bounce, rock, and timing for 15 minutes.',
        teacher: 'BDDS Team',
        createdAt: '2026-05-08'
    },
    {
        title: 'Kathak Footwork Count Practice',
        style: 'semiclassical',
        type: 'Class Notes',
        link: 'https://drive.google.com/',
        note: 'Use slow counts first, then increase tempo gradually.',
        teacher: 'BDDS Team',
        createdAt: '2026-05-08'
    }
];

const resourceStorageKey = 'bddsResources';
const portalSessionKey = 'bddsPortalSession';
const portalLoginGrid = document.getElementById('portalLoginGrid');
const teacherDashboard = document.getElementById('teacherDashboard');
const studentDashboard = document.getElementById('studentDashboard');
const teacherWelcome = document.getElementById('teacherWelcome');
const studentWelcome = document.getElementById('studentWelcome');
const resourceForm = document.getElementById('resourceForm');
const teacherResourceList = document.getElementById('teacherResourceList');
const studentResourceList = document.getElementById('studentResourceList');
const studentStyleFilter = document.getElementById('studentStyleFilter');
let portalSession = null;

function getResources() {
    const saved = JSON.parse(localStorage.getItem(resourceStorageKey) || 'null');
    if (Array.isArray(saved)) return saved;
    localStorage.setItem(resourceStorageKey, JSON.stringify(starterResources));
    return starterResources;
}

function saveResources(resources) {
    localStorage.setItem(resourceStorageKey, JSON.stringify(resources));
}

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function resourceCard(resource) {
    return `
        <article class="resource-card">
            <div class="resource-meta">
                <span class="resource-pill">${escapeHtml(danceStyleNames[resource.style] || resource.style)}</span>
                <span class="resource-pill">${escapeHtml(resource.type)}</span>
            </div>
            <h4>${escapeHtml(resource.title)}</h4>
            <p>${escapeHtml(resource.note || 'Practice this resource before your next class.')}</p>
            <p>Uploaded by ${escapeHtml(resource.teacher || 'BDDS Teacher')}</p>
            <a href="${escapeHtml(resource.link)}" target="_blank" rel="noopener">Open Resource <i class="fas fa-arrow-up-right-from-square"></i></a>
        </article>
    `;
}

function renderTeacherResources() {
    if (!teacherResourceList) return;
    const resources = getResources();
    teacherResourceList.innerHTML = resources.length
        ? resources.map(resourceCard).join('')
        : '<div class="resource-empty">No resources uploaded yet.</div>';
}

function renderStudentResources() {
    if (!studentResourceList || !studentStyleFilter) return;
    const selectedStyle = studentStyleFilter.value;
    const resources = getResources().filter(resource => resource.style === selectedStyle);
    studentResourceList.innerHTML = resources.length
        ? resources.map(resourceCard).join('')
        : `<div class="resource-empty">No ${escapeHtml(danceStyleNames[selectedStyle])} resources yet. Please check again after your teacher uploads them.</div>`;
}

function showPortal(role) {
    portalLoginGrid.hidden = Boolean(role);
    teacherDashboard.hidden = role !== 'teacher';
    studentDashboard.hidden = role !== 'student';

    if (role === 'teacher') {
        teacherWelcome.textContent = `Welcome, ${portalSession.name}. Upload Class Resources`;
        teacherDashboard.classList.add('visible');
        renderTeacherResources();
    }

    if (role === 'student') {
        studentWelcome.textContent = `Welcome, ${portalSession.name}. Your Class Resources`;
        studentDashboard.classList.add('visible');
        studentStyleFilter.value = portalSession.style || 'bollywood';
        renderStudentResources();
    }
}

document.querySelectorAll('.portal-form').forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        portalSession = {
            role: form.dataset.role,
            name: formData.get('name'),
            email: formData.get('email'),
            style: formData.get('style') || ''
        };
        localStorage.setItem(portalSessionKey, JSON.stringify(portalSession));
        showPortal(portalSession.role);
    });
});

resourceForm?.addEventListener('submit', event => {
    event.preventDefault();
    const resources = getResources();
    resources.unshift({
        title: document.getElementById('resourceTitle').value,
        style: document.getElementById('resourceStyle').value,
        type: document.getElementById('resourceType').value,
        link: document.getElementById('resourceLink').value,
        note: document.getElementById('resourceNote').value,
        teacher: portalSession?.name || 'BDDS Teacher',
        createdAt: new Date().toISOString().slice(0, 10)
    });
    saveResources(resources);
    resourceForm.reset();
    renderTeacherResources();
});

studentStyleFilter?.addEventListener('change', () => {
    if (portalSession?.role === 'student') {
        portalSession.style = studentStyleFilter.value;
        localStorage.setItem(portalSessionKey, JSON.stringify(portalSession));
    }
    renderStudentResources();
});

document.querySelectorAll('.portal-logout').forEach(button => {
    button.addEventListener('click', () => {
        portalSession = null;
        localStorage.removeItem(portalSessionKey);
        showPortal(null);
    });
});

try {
    portalSession = JSON.parse(localStorage.getItem(portalSessionKey) || 'null');
    showPortal(portalSession?.role || null);
} catch {
    localStorage.removeItem(portalSessionKey);
    showPortal(null);
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const targetId = href.replace('#', '');

        if (anchor.hasAttribute('data-expand-site') || advancedSectionIds.includes(targetId)) {
            expandSite();
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            requestAnimationFrame(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    });
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
    });
});

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox?.classList.contains('open')) {
        closeLightbox();
    }

    if (event.key === 'Escape' && styleModal?.classList.contains('open')) {
        closeStyleModal();
    }

    if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
        toggleMenu(false);
    }
});
