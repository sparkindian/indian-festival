/**
 * Indian Festival Wishes
 * Two-mode UX: VIEW_WISH (receive an e-card) and CREATE_WISH (make & share).
 */




const MODE = {
    VIEW: 'view',
    CREATE: 'create'
};




const festivals = {
    diwali: {
        name: 'Happy Diwali',
        icon: '🪔',
        emblem: '🪔',
        theme: 'diwali'
    },
    holi: {
        name: 'Happy Holi',
        icon: '🎨',
        emblem: '🎨',
        theme: 'holi'
    },
    'raksha-bandhan': {
        name: 'Happy Raksha Bandhan',
        icon: '🧵',
        emblem: '🧵',
        theme: 'raksha-bandhan'
    },
    dussehra: {
        name: 'Happy Dussehra',
        icon: '🏹',
        emblem: '🏹',
        theme: 'dussehra'
    },
    janmashtami: {
        name: 'Happy Janmashtami',
        icon: '🦚',
        emblem: '🪈',
        theme: 'janmashtami'
    },
    'new-year': {
        name: 'Happy New Year',
        icon: '🎆',
        emblem: '🎇',
        theme: 'new-year'
    },
    lifeline: {
        name: 'Lifeline',
        icon: '❤️',
        emblem: '💘',
        theme: 'lifeline',
        // Custom template for the wish card (partner mode)
        romantic: true,
        subline: 'you are my forever',
        headline: 'Lifeline ❤️',
        nameLabel: "Partner's Name",
        chipLabel: 'Lifeline'
    }
};




const el = {
    body: document.body,
    particles: document.getElementById('particles'),
    confetti: document.getElementById('confetti'),
    hearts: document.getElementById('hearts'),
    heroEmoji: document.getElementById('heroEmoji'),
    chipsContainer: document.getElementById('chipsContainer'),
    wishName: document.getElementById('wishName'),
    wishBadge: document.getElementById('wishBadge'),
    wishSublineText: document.getElementById('wishSublineText'),
    wishHeadline: document.getElementById('wishHeadline'),
    dividerEmblem: document.getElementById('dividerEmblem'),
    nameLabelText: document.getElementById('nameLabelText'),
    nameInput: document.getElementById('nameInput'),
    clearBtn: document.getElementById('clearBtn'),
    generateBtn: document.getElementById('generateBtn'),
    whatsappBtn: document.getElementById('whatsappBtn'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    createOwnBtn: document.getElementById('createOwnBtn'),
    musicBtn: document.getElementById('musicBtn'),
    menuBtn: document.getElementById('menuBtn'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};




const DEFAULT_SUBLINE = 'wishes you a very';
const DEFAULT_NAME_LABEL = 'Enter Your Name';




let currentMode = MODE.CREATE;
let currentFestival = null;
let currentName = '';
let musicOn = false;




// Base path of the deployment (e.g. "/" on a custom domain,
// "/indian-festival/" on a GitHub Pages project site).
// Computed once from the initial URL and always ends with "/".
const BASE_PATH = (() => {
    let path = window.location.pathname.replace(/index\.html$/, '');
    if (!path.endsWith('/')) path += '/';
    const festMatch = path.match(/([a-z-]+)\/$/);
    if (festMatch && festivals[festMatch[1]]) {
        path = path.slice(0, -(festMatch[1].length + 1));
    }
    return path;
})();




// Neutral placeholders shown when no festival is picked yet
const PLACEHOLDER = {
    icon: '🎁',
    emblem: '✦',
    headline: 'Choose a festival'
};




// Ambient theme used only for background/gradient colors when nothing is picked
const AMBIENT_THEME = 'janmashtami';




function init() {
    createParticles(24);
    createHearts(18);
    bindEvents();
    resolveMode();
}




function createHearts(count) {
    if (!el.hearts) return;
    const glyphs = ['❤️', '💖', '💕', '💗', '💘', '💓'];
    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.className = 'heart';
        h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        h.style.left = `${Math.random() * 100}%`;
        h.style.fontSize = `${16 + Math.random() * 20}px`;
        h.style.animationDelay = `${Math.random() * 12}s`;
        h.style.animationDuration = `${8 + Math.random() * 10}s`;
        el.hearts.appendChild(h);
    }
}




function getFestivalFromPath() {
    // Matches the last path segment so it works under any base path
    // (root or GitHub Pages project subpath).
    const path = window.location.pathname.replace(/index\.html$/, '');
    const match = path.match(/\/([a-z-]+)\/?$/);
    if (match && festivals[match[1]]) return match[1];
    return null;
}




function resolveMode() {
    const params = new URLSearchParams(window.location.search);
    const name = (params.get('name') || '').trim();
    const pathFestival = getFestivalFromPath();
    // Prefer path-based festival; fall back to query param for backward compat.
    const festival = pathFestival || params.get('festival');




    if (festival && festivals[festival]) {
        setFestival(festival);
        if (pathFestival) {
            lockPathFestival(festival);
        } else {
            unlockPathFestival();
        }
        if (name) {
            currentName = name;
            updateWishCard(name, festival);
            setMode(MODE.VIEW);
            return;
        }
    } else {
        clearFestival();
        unlockPathFestival();
    }




    updateWishCard('', currentFestival);
    setMode(MODE.CREATE);
}




function setMode(mode) {
    currentMode = mode;
    el.body.setAttribute('data-mode', mode);




    if (mode === MODE.VIEW) {
        launchConfetti(60);
    } else {
        clearConfetti();
    }
}




function createParticles(count) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 18}s`;
        p.style.animationDuration = `${12 + Math.random() * 12}s`;
        p.style.width = p.style.height = `${2 + Math.random() * 3}px`;
        el.particles.appendChild(p);
    }
}




function launchConfetti(count) {
    clearConfetti();
    const styles = getComputedStyle(el.body);
    const palette = [
        `rgb(${styles.getPropertyValue('--primary-rgb').trim()})`,
        `rgb(${styles.getPropertyValue('--secondary-rgb').trim()})`,
        `rgb(${styles.getPropertyValue('--accent-rgb').trim()})`,
        '#ffffff'
    ];




    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = palette[Math.floor(Math.random() * palette.length)];
        piece.style.width = `${6 + Math.random() * 6}px`;
        piece.style.height = `${8 + Math.random() * 8}px`;
        piece.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
        piece.style.animationDelay = `${Math.random() * 2}s`;
        piece.style.animationDuration = `${3 + Math.random() * 3}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        el.confetti.appendChild(piece);
    }




    // Auto-clean after the last animation ends (~6s max)
    clearTimeout(launchConfetti._t);
    launchConfetti._t = setTimeout(clearConfetti, 7000);
}




function clearConfetti() {
    el.confetti.innerHTML = '';
}




function bindEvents() {
    el.chipsContainer.addEventListener('click', onFestivalSelect);
    el.nameInput.addEventListener('input', onNameInput);
    el.clearBtn.addEventListener('click', clearName);
    el.generateBtn.addEventListener('click', onGenerate);
    el.whatsappBtn.addEventListener('click', shareWhatsApp);
    el.copyBtn.addEventListener('click', copyLink);
    el.downloadBtn.addEventListener('click', downloadImage);
    el.createOwnBtn.addEventListener('click', switchToCreateMode);
    el.musicBtn.addEventListener('click', toggleMusic);
    el.menuBtn.addEventListener('click', () => showToast('Menu coming soon'));
    el.nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') onGenerate();
    });




    window.addEventListener('popstate', resolveMode);
}




function switchToCreateMode() {
    const festival = currentFestival;
    currentName = '';
    el.nameInput.value = '';




    if (festival) {
        // Keep the festival locked from URL; only clear the name.
        updateUrl('', festival);
        lockPathFestival(festival);
        updateWishCard('', festival);
    } else {
        clearFestival();
        updateWishCard('', null);
        clearUrl();
    }




    setMode(MODE.CREATE);
    onNameInput();
    setTimeout(() => el.nameInput.focus(), 250);
}




function updateUrl(name, festival) {
    const url = new URL(window.location);
    url.pathname = `${BASE_PATH}${festival}/`;
    if (name) url.searchParams.set('name', name);
    else url.searchParams.delete('name');
    // Drop legacy query param
    url.searchParams.delete('festival');
    window.history.pushState({}, '', url);
}




function clearUrl() {
    const url = new URL(window.location);
    url.pathname = BASE_PATH;
    url.searchParams.delete('name');
    url.searchParams.delete('festival');
    window.history.pushState({}, '', url);
}




function onFestivalSelect(e) {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const festival = chip.dataset.festival;
    if (!festivals[festival]) return;
    setFestival(festival);
    const typed = el.nameInput.value.trim();
    updateWishCard(typed, festival);
    el.body.classList.remove('attempted-generate');
    // On root, keep selector visible while user experiments; don't lock the path
    // festival flag here (that only happens via direct navigation to /diwali/).
    updateUrl(currentName, festival);
}




function setFestival(festival) {
    currentFestival = festival;
    el.body.setAttribute('data-theme', festival);
    el.body.classList.remove('no-festival');




    document.querySelectorAll('.chip').forEach(c => {
        c.classList.toggle('active', c.dataset.festival === festival);
    });




    const data = festivals[festival];
    el.heroEmoji.textContent = data.icon;
    el.wishBadge.textContent = data.icon;
    el.dividerEmblem.textContent = data.emblem;
    if (el.wishSublineText) {
        el.wishSublineText.textContent = data.subline || DEFAULT_SUBLINE;
    }
    if (el.nameLabelText) {
        el.nameLabelText.textContent = data.nameLabel || DEFAULT_NAME_LABEL;
    }
    if (el.nameInput) {
        el.nameInput.placeholder = data.romantic ? "Partner's name" : 'Your name';
    }
}




function clearFestival() {
    currentFestival = null;
    el.body.setAttribute('data-theme', AMBIENT_THEME);
    el.body.classList.add('no-festival');
    delete el.body.dataset.pathFestival;




    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));




    el.heroEmoji.textContent = PLACEHOLDER.icon;
    el.wishBadge.textContent = PLACEHOLDER.icon;
    el.dividerEmblem.textContent = PLACEHOLDER.emblem;
    if (el.wishSublineText) el.wishSublineText.textContent = DEFAULT_SUBLINE;
    if (el.nameLabelText) el.nameLabelText.textContent = DEFAULT_NAME_LABEL;
    if (el.nameInput) el.nameInput.placeholder = 'Your name';
}




function lockPathFestival(festival) {
    el.body.dataset.pathFestival = festival;
}




function unlockPathFestival() {
    delete el.body.dataset.pathFestival;
}




function updateWishCard(name, festival) {
    const data = festival && festivals[festival];
    const placeholderName = data && data.romantic ? 'Their Name' : 'Your Name';
    el.wishName.textContent = name || placeholderName;
    if (data) {
        el.wishHeadline.textContent = data.headline || `${data.name}!`;
    } else {
        el.wishHeadline.textContent = PLACEHOLDER.headline;
    }
}




function onNameInput() {
    const value = el.nameInput.value.trim();
    el.clearBtn.classList.toggle('visible', value.length > 0);
    updateWishCard(value, currentFestival);
}




function requireFestival() {
    if (!currentFestival) {
        showToast('Please choose a festival first');
        el.body.classList.add('attempted-generate');
        setTimeout(() => el.body.classList.remove('attempted-generate'), 800);
        document.querySelector('.festival-selector')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }
    return true;
}




function clearName() {
    el.nameInput.value = '';
    onNameInput();
    el.nameInput.focus();
}




function onGenerate() {
    if (!requireFestival()) return;
    const name = el.nameInput.value.trim();
    if (!name) {
        showToast('Please enter your name');
        el.nameInput.focus();
        return;
    }
    currentName = name;
    updateWishCard(name, currentFestival);
    updateUrl(name, currentFestival);
    launchConfetti(40);


    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => showToast('Wish generated & link copied ✨'))
            .catch(() => fallbackCopyWithMessage(url, 'Wish generated & link copied ✨'));
    } else {
        fallbackCopyWithMessage(url, 'Wish generated & link copied ✨');
    }
}




function fallbackCopyWithMessage(text, successMessage) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast(successMessage);
    } catch {
        showToast('Wish generated! Share it below ✨');
    }
    document.body.removeChild(ta);
}




function shareWhatsApp() {
    if (!requireFestival()) return;
    const name = getShareName();
    if (!name) return;
    const data = festivals[currentFestival];
    const url = window.location.href;
    const msg = data.romantic
        ? `${name}, you are my Lifeline ❤️\n\n${url}`
        : `${name} wishes you a very ${data.name}! 🎉\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}




function copyLink() {
    if (!requireFestival()) return;
    const name = getShareName();
    if (!name) return;
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => showToast('Link copied to clipboard'))
            .catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}




function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast('Link copied to clipboard');
    } catch {
        showToast('Failed to copy link');
    }
    document.body.removeChild(ta);
}




function getShareName() {
    const name = el.nameInput.value.trim() || currentName;
    if (!name) {
        showToast('Please enter your name first');
        el.nameInput.focus();
        return null;
    }
    if (!currentName) {
        currentName = name;
        updateUrl(name, currentFestival);
    }
    return name;
}




function downloadImage() {
    if (!requireFestival()) return;
    const name = getShareName();
    if (!name) return;




    const data = festivals[currentFestival];
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');




    const rootStyles = getComputedStyle(el.body);
    const primary = rgbTriplet(rootStyles.getPropertyValue('--primary-rgb'));
    const secondary = rgbTriplet(rootStyles.getPropertyValue('--secondary-rgb'));
    const accent = rgbTriplet(rootStyles.getPropertyValue('--accent-rgb'));




    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, '#0a0416');
    bg.addColorStop(0.5, '#100826');
    bg.addColorStop(1, '#050210');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);




    const glow = ctx.createRadialGradient(540, 540, 100, 540, 540, 700);
    glow.addColorStop(0, `rgba(${primary}, 0.4)`);
    glow.addColorStop(0.5, `rgba(${accent}, 0.2)`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);




    ctx.font = '260px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data.icon, canvas.width / 2, 380);




    ctx.font = 'italic bold 130px "Playfair Display", serif';
    const nameGrad = ctx.createLinearGradient(0, 600, canvas.width, 700);
    nameGrad.addColorStop(0, `rgb(${primary})`);
    nameGrad.addColorStop(1, `rgb(${secondary})`);
    ctx.fillStyle = nameGrad;
    ctx.fillText(name, canvas.width / 2, 700);




    ctx.font = 'italic 48px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText('✦  wishes you a very  ✦', canvas.width / 2, 820);




    ctx.font = 'italic bold 88px "Playfair Display", serif';
    const headGrad = ctx.createLinearGradient(0, 900, canvas.width, 1000);
    headGrad.addColorStop(0, `rgb(${secondary})`);
    headGrad.addColorStop(0.5, `rgb(${primary})`);
    headGrad.addColorStop(1, `rgb(${accent})`);
    ctx.fillStyle = headGrad;
    ctx.fillText(`${data.name}!`, canvas.width / 2, 960);




    ctx.strokeStyle = `rgba(${secondary}, 0.8)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(280, 1080);
    ctx.lineTo(500, 1080);
    ctx.moveTo(580, 1080);
    ctx.lineTo(800, 1080);
    ctx.stroke();




    ctx.font = '48px Arial';
    ctx.fillText(data.emblem, canvas.width / 2, 1080);




    ctx.font = '32px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('Festival Wishes', canvas.width / 2, 1230);




    const link = document.createElement('a');
    link.download = `festival-wish-${currentFestival}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Image downloaded 📥');
}




function rgbTriplet(cssValue) {
    return (cssValue || '255,255,255').trim();
}




function toggleMusic() {
    musicOn = !musicOn;
    el.musicBtn.classList.toggle('active', musicOn);
    showToast(musicOn ? 'Music on 🎵' : 'Music off');
}




function showToast(message) {
    el.toastMessage.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.toast.classList.remove('show'), 2400);
}




document.addEventListener('DOMContentLoaded', init);



