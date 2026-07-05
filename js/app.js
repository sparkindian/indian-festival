/**
 * Indian Festival Wishes - Main JavaScript Application
 * Handles festival selection, greeting generation, URL parameters, and sharing functionality
 */

// ============================================
// Festival Configuration Data
// ============================================

const festivals = {
    diwali: {
        name: 'Happy Diwali',
        icon: '🪔',
        decoration: '✨🎆🎇✨',
        theme: 'diwali',
        title: 'Happy Diwali Wishes',
        description: 'Send beautiful Diwali wishes to your loved ones'
    },
    holi: {
        name: 'Happy Holi',
        icon: '🎨',
        decoration: '🌈🎨💦🌈',
        theme: 'holi',
        title: 'Happy Holi Wishes',
        description: 'Share colorful Holi greetings with friends and family'
    },
    'raksha-bandhan': {
        name: 'Happy Raksha Bandhan',
        icon: '🧵',
        decoration: '🎀💝🎀',
        theme: 'raksha-bandhan',
        title: 'Happy Raksha Bandhan Wishes',
        description: 'Celebrate the bond of love between siblings'
    },
    dussehra: {
        name: 'Happy Dussehra',
        icon: '⚔️',
        decoration: '🏹🔥🏆🔥',
        theme: 'dussehra',
        title: 'Happy Dussehra Wishes',
        description: 'Share the victory of good over evil'
    },
    'new-year': {
        name: 'Happy New Year',
        icon: '🎆',
        decoration: '🎉🎊🥂🎊',
        theme: 'new-year',
        title: 'Happy New Year Wishes',
        description: 'Welcome the new year with joy and celebrations'
    },
    janmashtami: {
        name: 'Happy Janmashtami',
        icon: '🦚',
        decoration: '🪈🦚🎶🪈',
        theme: 'janmashtami',
        title: 'Happy Janmashtami Wishes',
        description: 'Celebrate the birth of Lord Krishna'
    }
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    // Input elements
    nameInput: document.getElementById('nameInput'),
    festivalSelect: document.getElementById('festivalSelect'),
    generateBtn: document.getElementById('generateBtn'),

    // Display elements
    greetingSection: document.getElementById('greetingSection'),
    greetingCard: document.getElementById('greetingCard'),
    festivalIcon: document.getElementById('festivalIcon'),
    greetingMessage: document.getElementById('greetingMessage'),
    senderName: document.getElementById('senderName'),
    festivalName: document.getElementById('festivalName'),
    festivalDecoration: document.getElementById('festivalDecoration'),

    // Share elements
    inputSection: document.getElementById('inputSection'),
    shareSection: document.getElementById('shareSection'),
    whatsappBtn: document.getElementById('whatsappBtn'),
    copyBtn: document.getElementById('copyBtn'),
    shareLink: document.getElementById('shareLink'),
    copyIconBtn: document.getElementById('copyIconBtn'),
    createNewBtn: document.getElementById('createNewBtn'),

    // Theme elements
    body: document.body,

    // Curtain elements
    curtainOverlay: document.getElementById('curtainOverlay'),
    touchHereBtn: document.getElementById('touchHereBtn'),
    festivalAnimation: document.getElementById('festivalAnimation'),

    // Toast notification
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// ============================================
// URL Parameter Handling
// ============================================

/**
 * Get URL parameters from query string
 * @returns {Object} Object containing URL parameters
 */
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        festival: params.get('festival')
    };
}

/**
 * Check if URL has valid parameters for displaying a greeting
 * @returns {boolean} True if valid parameters exist
 */
function hasValidUrlParameters() {
    const params = getUrlParameters();
    return params.name && params.festival && festivals[params.festival];
}

/**
 * Update page title and meta tags based on festival
 * @param {string} festivalKey - Festival key
 */
function updatePageMetadata(festivalKey) {
    const festival = festivals[festivalKey];
    if (!festival) return;
    
    // Update page title
    document.title = `${festival.title} - Indian Festival Wishes`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', festival.description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
        ogTitle.setAttribute('content', festival.title);
    }
    if (ogDescription) {
        ogDescription.setAttribute('content', festival.description);
    }
}

// ============================================
// Theme Management
// ============================================

/**
 * Apply festival-specific theme to the page
 * @param {string} festivalKey - Festival key
 */
function applyTheme(festivalKey) {
    const festival = festivals[festivalKey];
    if (!festival) return;
    
    // Remove existing theme
    elements.body.removeAttribute('data-theme');
    
    // Apply new theme
    elements.body.setAttribute('data-theme', festival.theme);
}

// ============================================
// Greeting Display
// ============================================

/**
 * Display the greeting with provided name and festival
 * @param {string} name - Sender's name
 * @param {string} festivalKey - Festival key
 * @param {boolean} withAnimations - Whether to start festival animations
 */
function displayGreeting(name, festivalKey, withAnimations = false) {
    const festival = festivals[festivalKey];
    if (!festival) return;

    // Clear any existing festival animations before switching
    clearFestivalAnimations();

    // Apply theme
    applyTheme(festivalKey);

    // Update page metadata
    updatePageMetadata(festivalKey);

    // Update greeting elements
    elements.festivalIcon.textContent = festival.icon;
    elements.senderName.textContent = name || 'Someone';
    elements.festivalName.textContent = festival.name;
    elements.festivalDecoration.textContent = festival.decoration;

    // Show greeting section
    elements.greetingSection.style.display = 'block';

    // Hide input section
    elements.inputSection.style.display = 'none';

    // Show share section
    elements.shareSection.style.display = 'block';

    // Generate and display shareable link
    generateShareLink(name, festivalKey);

    // Start festival animations only if requested (from curtain reveal)
    if (withAnimations) {
        startFestivalAnimations(festivalKey);
    }
}

/**
 * Generate shareable URL with parameters
 * @param {string} name - Sender's name
 * @param {string} festivalKey - Festival key
 * @returns {string} Shareable URL
 */
function generateShareLink(name, festivalKey) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('festival', festivalKey);
    const shareUrl = `${baseUrl}?${params.toString()}`;
    
    elements.shareLink.value = shareUrl;
    return shareUrl;
}

// ============================================
// Event Handlers
// ============================================

/**
 * Handle generate button click
 */
function handleGenerate() {
    const name = elements.nameInput.value.trim();
    const festivalKey = elements.festivalSelect.value;

    if (!name) {
        showToast('Please enter your name!');
        elements.nameInput.focus();
        return;
    }

    if (!festivals[festivalKey]) {
        showToast('Please select a valid festival!');
        return;
    }

    // Clear any existing festival animations
    clearFestivalAnimations();

    // Hide curtain if visible
    if (elements.curtainOverlay) {
        elements.curtainOverlay.style.display = 'none';
        elements.curtainOverlay.classList.remove('open');
    }

    // Display greeting without animations (for main page generation)
    displayGreeting(name, festivalKey, false);

    // Update URL without reloading
    const newUrl = generateShareLink(name, festivalKey);
    window.history.pushState({ name, festival: festivalKey }, '', newUrl);
}

/**
 * Handle WhatsApp share button click
 */
function handleWhatsAppShare() {
    const shareUrl = elements.shareLink.value;
    const festivalKey = elements.festivalSelect.value || getUrlParameters().festival;
    const festival = festivals[festivalKey];
    
    const message = `*${festival.name}*! 🎉\n\n${elements.senderName.textContent} wishes you a very ${festival.name}!\n\n👉 ${shareUrl}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Handle copy link button click
 */
function handleCopyLink() {
    const shareUrl = elements.shareLink.value;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                showToast('Link copied to clipboard!');
            })
            .catch(() => {
                fallbackCopyText(shareUrl);
            });
    } else {
        fallbackCopyText(shareUrl);
    }
}

/**
 * Fallback method for copying text to clipboard
 * @param {string} text - Text to copy
 */
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy link. Please try again.');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Handle create new greeting button click
 */
function handleCreateNew() {
    // Clear any existing festival animations
    clearFestivalAnimations();

    // Hide curtain if visible
    if (elements.curtainOverlay) {
        elements.curtainOverlay.style.display = 'none';
        elements.curtainOverlay.classList.remove('open');
    }

    // Clear input
    elements.nameInput.value = '';
    elements.festivalSelect.value = 'diwali';

    // Reset theme
    elements.body.removeAttribute('data-theme');

    // Reset page metadata
    document.title = 'Indian Festival Wishes - Send Personalized Greetings';

    // Hide share section
    elements.shareSection.style.display = 'none';

    // Show input section
    elements.inputSection.style.display = 'block';

    // Clear URL
    window.history.pushState({}, '', window.location.pathname);

    // Focus on name input
    elements.nameInput.focus();
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Input Validation
// ============================================

/**
 * Validate name input
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
function isValidName(name) {
    return name && name.trim().length > 0 && name.trim().length <= 50;
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// ============================================
// Curtain and Animation Functions
// ============================================

/**
 * Handle curtain reveal on touch/click
 */
function handleCurtainReveal() {
    const curtain = elements.curtainOverlay;
    if (!curtain) return;

    // Add open class to trigger animation
    curtain.classList.add('open');

    // Play sound effect
    playCurtainSound();

    // After curtain opens, show greeting with festival animations
    setTimeout(() => {
        // Use stored params from shared link
        const params = window.sharedParams || getUrlParameters();
        const festivalKey = params.festival || 'diwali';
        const name = params.name || 'Someone';

        // Display the greeting with animations
        displayGreeting(name, festivalKey, true);
    }, 1500);

    // Remove curtain from DOM after animation completes
    setTimeout(() => {
        curtain.style.display = 'none';
    }, 3000);
}

/**
 * Start festival-specific animations
 * @param {string} festivalKey - Festival key
 */
function startFestivalAnimations(festivalKey) {
    const animationContainer = elements.festivalAnimation;
    if (!animationContainer) return;

    // Clear existing animations
    animationContainer.innerHTML = '';
    animationContainer.classList.add('active');

    // Create festival-specific animations
    switch (festivalKey) {
        case 'diwali':
            createDiwaliAnimations(animationContainer);
            break;
        case 'holi':
            createHoliAnimations(animationContainer);
            break;
        case 'raksha-bandhan':
            createRakshaBandhanAnimations(animationContainer);
            break;
        case 'dussehra':
            createDussehraAnimations(animationContainer);
            break;
        case 'new-year':
            createNewYearAnimations(animationContainer);
            break;
        case 'janmashtami':
            createJanmashtamiAnimations(animationContainer);
            break;
        default:
            createDiwaliAnimations(animationContainer);
    }

    // Play festival sound
    playFestivalSound(festivalKey);
}

/**
 * Clear festival animations
 */
function clearFestivalAnimations() {
    const animationContainer = elements.festivalAnimation;
    if (!animationContainer) return;

    // Remove active class
    animationContainer.classList.remove('active');

    // Clear all animations
    animationContainer.innerHTML = '';
}

/**
 * Create Diwali-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createDiwaliAnimations(container) {
    // Add diyas with realistic structure
    for (let i = 0; i < 8; i++) {
        const diya = document.createElement('div');
        diya.className = 'diya';
        diya.style.left = `${Math.random() * 90}%`;
        diya.style.top = `${Math.random() * 80 + 10}%`;
        diya.style.animationDelay = `${Math.random() * 2}s`;

        // Diya base
        const diyaBase = document.createElement('div');
        diyaBase.className = 'diya-base';
        diya.appendChild(diyaBase);

        // Diya rim
        const diyaRim = document.createElement('div');
        diyaRim.className = 'diya-rim';
        diya.appendChild(diyaRim);

        // Diya oil
        const diyaOil = document.createElement('div');
        diyaOil.className = 'diya-oil';
        diya.appendChild(diyaOil);

        // Flame
        const flame = document.createElement('div');
        flame.className = 'flame';

        const flameCore = document.createElement('div');
        flameCore.className = 'flame-core';
        flame.appendChild(flameCore);

        const flameOuter = document.createElement('div');
        flameOuter.className = 'flame-outer';
        flame.appendChild(flameOuter);

        // Add sparks
        for (let j = 0; j < 3; j++) {
            const spark = document.createElement('div');
            spark.className = 'flame-spark';
            spark.style.left = `${Math.random() * 20 - 10}px`;
            spark.style.animationDelay = `${Math.random() * 0.5}s`;
            flame.appendChild(spark);
        }

        diya.appendChild(flame);
        container.appendChild(diya);
    }

    // Add Lakshmi Ji with realistic glow
    const lakshmi = document.createElement('div');
    lakshmi.className = 'lakshmi-ji';
    lakshmi.style.left = '50%';
    lakshmi.style.top = '30%';
    lakshmi.style.transform = 'translate(-50%, -50%)';

    const lakshmiGlow = document.createElement('div');
    lakshmiGlow.className = 'lakshmi-glow';
    lakshmi.appendChild(lakshmiGlow);

    const lakshmiCenter = document.createElement('div');
    lakshmiCenter.className = 'lakshmi-center';
    lakshmi.appendChild(lakshmiCenter);

    const lakshmiRays = document.createElement('div');
    lakshmiRays.className = 'lakshmi-rays';
    lakshmi.appendChild(lakshmiRays);

    // Add rays
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';
        ray.style.transform = `rotate(${i * 30}deg)`;
        ray.style.animationDelay = `${i * 0.1}s`;
        lakshmiRays.appendChild(ray);
    }

    container.appendChild(lakshmi);

    // Add crackers with realistic firework burst
    for (let i = 0; i < 6; i++) {
        const cracker = document.createElement('div');
        cracker.className = 'cracker';
        cracker.style.left = `${Math.random() * 80 + 10}%`;
        cracker.style.top = `${Math.random() * 60 + 20}%`;
        cracker.style.animationDelay = `${Math.random() * 3}s`;

        const fireworkBurst = document.createElement('div');
        fireworkBurst.className = 'firework-burst';
        cracker.appendChild(fireworkBurst);

        // Add particles in all directions
        const colors = ['#ff6b35', '#ffd700', '#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
        for (let j = 0; j < 20; j++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

            // Set random direction
            const angle = (j / 20) * 360;
            const distance = 50 + Math.random() * 30;
            const tx = Math.cos(angle * Math.PI / 180) * distance;
            const ty = Math.sin(angle * Math.PI / 180) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.animationDelay = `${Math.random() * 0.2}s`;

            fireworkBurst.appendChild(particle);
        }

        container.appendChild(cracker);
    }

    // Add sparks
    for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        spark.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(spark);
    }

    // Add rangoli with petals
    const rangoli = document.createElement('div');
    rangoli.className = 'rangoli';
    rangoli.style.left = '50%';
    rangoli.style.bottom = '10%';
    rangoli.style.transform = 'translateX(-50%)';

    // Add petals in circular pattern
    for (let i = 0; i < 8; i++) {
        const petal = document.createElement('div');
        petal.className = 'rangoli-petal';
        petal.style.transform = `rotate(${i * 45}deg) translateY(-30px)`;
        rangoli.appendChild(petal);
    }

    container.appendChild(rangoli);
}

/**
 * Create Holi-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createHoliAnimations(container) {
    // Add color splashes with realistic colors
    const holiColors = ['#ff69b4', '#00ff00', '#ffff00', '#ff0000', '#0000ff', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 15; i++) {
        const splash = document.createElement('div');
        splash.className = 'color-splash';
        splash.style.left = `${Math.random() * 90}%`;
        splash.style.top = `${Math.random() * 80 + 10}%`;
        splash.style.animationDelay = `${Math.random() * 3}s`;
        splash.style.background = holiColors[Math.floor(Math.random() * holiColors.length)];
        splash.style.boxShadow = `0 0 20px ${splash.style.background}`;
        container.appendChild(splash);
    }

    // Add water splashes
    for (let i = 0; i < 10; i++) {
        const water = document.createElement('div');
        water.className = 'water-splash';
        water.style.left = `${Math.random() * 80 + 10}%`;
        water.style.top = `${Math.random() * 70 + 15}%`;
        water.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(water);
    }
}

/**
 * Create Raksha Bandhan-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createRakshaBandhanAnimations(container) {
    // Add rakhi threads
    for (let i = 0; i < 10; i++) {
        const thread = document.createElement('div');
        thread.className = 'rakhi-thread';
        thread.style.left = `${Math.random() * 90}%`;
        thread.style.top = `${Math.random() * 80 + 10}%`;
        thread.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(thread);
    }

    // Add hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 90}%`;
        heart.style.top = `${Math.random() * 80 + 10}%`;
        heart.style.animationDelay = `${Math.random() * 1}s`;
        container.appendChild(heart);
    }
}

/**
 * Create Dussehra-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createDussehraAnimations(container) {
    // Add bow and arrows
    for (let i = 0; i < 8; i++) {
        const arrow = document.createElement('div');
        arrow.className = 'bow-arrow';
        arrow.style.left = `${Math.random() * 70 + 15}%`;
        arrow.style.top = `${Math.random() * 60 + 20}%`;
        arrow.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(arrow);
    }

    // Add fire
    for (let i = 0; i < 10; i++) {
        const fire = document.createElement('div');
        fire.className = 'fire';
        fire.style.left = `${Math.random() * 80 + 10}%`;
        fire.style.top = `${Math.random() * 70 + 15}%`;
        fire.style.animationDelay = `${Math.random() * 1}s`;
        container.appendChild(fire);
    }

    // Add trophies
    for (let i = 0; i < 3; i++) {
        const trophy = document.createElement('div');
        trophy.className = 'trophy';
        trophy.style.left = `${20 + i * 30}%`;
        trophy.style.top = '20%';
        trophy.style.animationDelay = `${i * 0.5}s`;
        container.appendChild(trophy);
    }
}

/**
 * Create New Year-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createNewYearAnimations(container) {
    // Add confetti with realistic colors
    const confettiColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 4}s`;
        confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.boxShadow = `0 0 5px ${confetti.style.background}`;
        container.appendChild(confetti);
    }

    // Add champagne
    for (let i = 0; i < 5; i++) {
        const champagne = document.createElement('div');
        champagne.className = 'champagne';
        champagne.style.left = `${10 + i * 20}%`;
        champagne.style.top = '60%';
        champagne.style.animationDelay = `${i * 0.4}s`;
        container.appendChild(champagne);
    }

    // Add clock with hands
    const clock = document.createElement('div');
    clock.className = 'clock';
    clock.style.left = '50%';
    clock.style.top = '30%';
    clock.style.transform = 'translate(-50%, -50%)';

    // Add clock hands
    const hourHand = document.createElement('div');
    hourHand.className = 'clock-hand';
    hourHand.style.width = '4px';
    hourHand.style.height = '20px';
    hourHand.style.transform = 'translate(-50%, -100%) rotate(30deg)';
    clock.appendChild(hourHand);

    const minuteHand = document.createElement('div');
    minuteHand.className = 'clock-hand';
    minuteHand.style.width = '3px';
    minuteHand.style.height = '25px';
    minuteHand.style.transform = 'translate(-50%, -100%) rotate(90deg)';
    clock.appendChild(minuteHand);

    container.appendChild(clock);
}

/**
 * Create Janmashtami-specific animations
 * @param {HTMLElement} container - Animation container
 */
function createJanmashtamiAnimations(container) {
    // Add peacocks
    for (let i = 0; i < 5; i++) {
        const peacock = document.createElement('div');
        peacock.className = 'peacock';
        peacock.style.left = `${10 + i * 20}%`;
        peacock.style.top = `${20 + Math.random() * 40}%`;
        peacock.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(peacock);
    }

    // Add flutes
    for (let i = 0; i < 8; i++) {
        const flute = document.createElement('div');
        flute.className = 'flute';
        flute.style.left = `${Math.random() * 80 + 10}%`;
        flute.style.top = `${Math.random() * 70 + 15}%`;
        flute.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(flute);
    }

    // Add lotus with petals
    for (let i = 0; i < 6; i++) {
        const lotus = document.createElement('div');
        lotus.className = 'lotus';
        lotus.style.left = `${15 + i * 15}%`;
        lotus.style.bottom = '10%';
        lotus.style.animationDelay = `${i * 0.3}s`;

        // Add petals
        for (let j = 0; j < 6; j++) {
            const petal = document.createElement('div');
            petal.className = 'lotus-petal';
            petal.style.transform = `rotate(${j * 60}deg) translateY(-15px)`;
            lotus.appendChild(petal);
        }

        container.appendChild(lotus);
    }
}

/**
 * Play curtain reveal sound effect
 */
function playCurtainSound() {
    // Create audio context for sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

/**
 * Play festival-specific sound effects
 * @param {string} festivalKey - Festival key
 */
function playFestivalSound(festivalKey) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Different sound patterns for different festivals
        switch (festivalKey) {
            case 'diwali':
                // Cracker sounds - rapid bursts
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        playCrackSound(audioContext);
                    }, i * 300);
                }
                break;
            case 'holi':
                // Cheerful sound
                playCheerfulSound(audioContext);
                break;
            case 'raksha-bandhan':
                // Soft, gentle sound
                playSoftSound(audioContext);
                break;
            case 'dussehra':
                // Triumphant sound
                playTriumphantSound(audioContext);
                break;
            case 'new-year':
                // Celebration sound
                playCelebrationSound(audioContext);
                break;
            case 'janmashtami':
                // Devotional sound
                playDevotionalSound(audioContext);
                break;
            default:
                playCheerfulSound(audioContext);
        }
    } catch (e) {
        console.log('Audio not supported');
    }
}

/**
 * Play cracker explosion sound
 * @param {AudioContext} audioContext - Audio context
 */
function playCrackSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

/**
 * Play cheerful sound
 * @param {AudioContext} audioContext - Audio context
 */
function playCheerfulSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
}

/**
 * Play soft, gentle sound
 * @param {AudioContext} audioContext - Audio context
 */
function playSoftSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.6);
}

/**
 * Play triumphant sound
 * @param {AudioContext} audioContext - Audio context
 */
function playTriumphantSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
    oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime + 0.15); // E4
    oscillator.frequency.setValueAtTime(392, audioContext.currentTime + 0.3); // G4
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.45); // C5
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.6);
}

/**
 * Play celebration sound
 * @param {AudioContext} audioContext - Audio context
 */
function playCelebrationSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // C6
    oscillator.type = 'triangle';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

/**
 * Play devotional sound
 * @param {AudioContext} audioContext - Audio context
 */
function playDevotionalSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime); // D4
    oscillator.frequency.setValueAtTime(369.99, audioContext.currentTime + 0.2); // F#4
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.4); // A4
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.6);
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 */
function init() {
    // Add curtain reveal event listener
    if (elements.touchHereBtn) {
        elements.touchHereBtn.addEventListener('click', handleCurtainReveal);
    }

    // Check if URL has valid parameters (shared link)
    if (hasValidUrlParameters()) {
        const params = getUrlParameters();
        const sanitizedName = sanitizeInput(params.name);

        // Show curtain for shared links
        if (elements.curtainOverlay) {
            elements.curtainOverlay.style.display = 'flex';
        }

        // Hide input section
        elements.inputSection.style.display = 'none';
        elements.greetingSection.style.display = 'none';
        elements.shareSection.style.display = 'none';

        // Store params for after curtain reveal
        window.sharedParams = {
            name: sanitizedName,
            festival: params.festival
        };
    } else {
        // Main page - hide curtain and show input section
        if (elements.curtainOverlay) {
            elements.curtainOverlay.style.display = 'none';
        }

        // Show input section by default
        elements.inputSection.style.display = 'block';
        elements.greetingSection.style.display = 'none';
        elements.shareSection.style.display = 'none';

        // Don't apply any theme on main page
        elements.body.removeAttribute('data-theme');
    }

    // Add event listeners
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.whatsappBtn.addEventListener('click', handleWhatsAppShare);
    elements.copyBtn.addEventListener('click', handleCopyLink);
    elements.copyIconBtn.addEventListener('click', handleCopyLink);
    elements.createNewBtn.addEventListener('click', handleCreateNew);

    // Allow Enter key to generate greeting
    elements.nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    });

    // Handle browser back button
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.name && event.state.festival) {
            displayGreeting(event.state.name, event.state.festival);
        } else {
            handleCreateNew();
        }
    });
}

// ============================================
// Start Application
// ============================================

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
