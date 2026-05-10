const yearNodeList = document.querySelectorAll('[data-year]');
yearNodeList.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const navToggle = document.querySelector('.nav-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

if (navToggle && primaryNavigation) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    primaryNavigation.classList.toggle('is-open', !isExpanded);
    document.body.classList.toggle('menu-open', !isExpanded);
  });

  primaryNavigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNavigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const cards = Array.from(carousel.querySelectorAll('.step-card'));
  let activeIndex = 0;

  const setActive = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === activeIndex));
    cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  prev?.addEventListener('click', () => setActive(activeIndex - 1));
  next?.addEventListener('click', () => setActive(activeIndex + 1));

  track?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') setActive(activeIndex - 1);
    if (event.key === 'ArrowRight') setActive(activeIndex + 1);
  });
}

const cookieBanner = document.querySelector('[data-cookie-banner]');
const acceptCookiesButton = document.querySelector('[data-cookie-accept]');
const necessaryCookiesButton = document.querySelector('[data-cookie-necessary]');
const cookieSettingsButtons = document.querySelectorAll('[data-cookie-settings]');
const mapConsentButton = document.querySelector('[data-map-consent]');
const mapContainer = document.querySelector('[data-map-container]');
const cookieStorageKey = 'svb-brueckers-cookie-consent';

const getConsent = () => localStorage.getItem(cookieStorageKey);
const setConsent = (value) => localStorage.setItem(cookieStorageKey, value);

const showCookieBanner = () => {
  if (cookieBanner) cookieBanner.hidden = false;
};

const hideCookieBanner = () => {
  if (cookieBanner) cookieBanner.hidden = true;
};

const loadGoogleMap = () => {
  if (!mapContainer) return;
  mapContainer.hidden = false;
  if (!mapContainer.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.title = 'Google Maps Anfahrt Ingenieurbüro Brückers in Stuttgart-Heumaden';
    iframe.src = 'https://www.google.com/maps?q=Am%20Sonnenweg%2015A%2C%2070619%20Stuttgart-Heumaden&output=embed';
    mapContainer.append(iframe);
  }
  if (mapConsentButton) mapConsentButton.hidden = true;
};

if (!getConsent()) showCookieBanner();
if (getConsent() === 'all') loadGoogleMap();

acceptCookiesButton?.addEventListener('click', () => {
  setConsent('all');
  hideCookieBanner();
  loadGoogleMap();
});

necessaryCookiesButton?.addEventListener('click', () => {
  setConsent('necessary');
  hideCookieBanner();
});

cookieSettingsButtons.forEach((button) => {
  button.addEventListener('click', () => showCookieBanner());
});

mapConsentButton?.addEventListener('click', () => {
  setConsent('all');
  hideCookieBanner();
  loadGoogleMap();
});
