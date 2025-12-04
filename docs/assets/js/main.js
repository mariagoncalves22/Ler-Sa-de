/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Ensure the nav 'active' class reflects the current page (not just on-scroll hash links)
  function syncActiveNav() {
    try {
      const current = window.location.pathname.split('/').pop();
      document.querySelectorAll('#navmenu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        const linkPath = href.split('/').pop().split('#')[0];
        if (linkPath === current || (linkPath === '' && current === 'index.html') || (href === 'index.html' && current === 'index.html')) {
          link.classList.add('active');
        }
      });
    } catch (e) {}
  }
  window.addEventListener('load', syncActiveNav);

})();

/* Demo form handling for Ler+Saúde */
document.addEventListener('DOMContentLoaded', function() {
  const abKey = 'ler_saude_ab_variant';
  // Config from meta tags
  const gaId = document.querySelector('meta[name="analytics-ga-id"]')?.getAttribute('content') || '';
  const plausibleDomain = document.querySelector('meta[name="analytics-plausible-domain"]')?.getAttribute('content') || '';
  const sheetsWebhook = document.querySelector('meta[name="sheets-webhook-url"]')?.getAttribute('content') || '';
  // optionally add GA / Plausible script tags dynamically
  try {
    if (plausibleDomain && !window.plausible) {
      const s = document.createElement('script');
      s.async = true;
      s.defer = true;
      s.setAttribute('data-domain', plausibleDomain);
      s.src = `https://plausible.io/js/plausible.js`;
      document.head.appendChild(s);
    }
    if (gaId && !window.gtag) {
      // Load Google Analytics gtag (GA4)
      const s1 = document.createElement('script');
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s1);
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
      window.gtag = gtag;
      window.gtag('js', new Date());
      window.gtag('config', gaId);
    }
  } catch (e) {}

  // Analytics helper - sends to local mock API analytics endpoint if available.
  async function sendAnalytics(event, payload = {}) {
    // Plausible
    try {
      if (plausibleDomain && typeof window.plausible === 'function') {
        window.plausible(event, { props: payload });
      }
    } catch (e) {}
    // Google Analytics (call gtag if available even when gaId meta not present)
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', event, payload);
      }
    } catch (e) {}
    // Mock analytics for local validation
    try {
      await fetch('http://localhost:3000/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload })
      });
    } catch (e) {
      // ignore
    }
  }

  // Hero background YouTube video loader: read meta or data attribute, use IFrame API for segment loop
  try {
    const heroWrapper = document.querySelector('.hero-video-wrapper');
    const metaVideoId = document.querySelector('meta[name="hero-youtube-id"]')?.content?.trim();
    const videoId = heroWrapper?.getAttribute('data-video-id') || metaVideoId || '';
    const startTime = parseInt(document.querySelector('meta[name="hero-youtube-start"]')?.content || '0', 10) || 0;
    const endTime = parseInt(document.querySelector('meta[name="hero-youtube-end"]')?.content || '10', 10) || 10;

    async function loadYouTubeAPI() {
      if (window.YT && window.YT.Player) return window.YT;
      return new Promise((resolve) => {
        const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
        if (existing) {
          // Wait for API ready
          const check = setInterval(()=>{
            if (window.YT && window.YT.Player) { clearInterval(check); resolve(window.YT); }
          }, 100);
          return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // global callback
        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function() {
          if (typeof prevReady === 'function') prevReady();
          resolve(window.YT);
        };
      });
    }

    if (videoId && heroWrapper) {
      const playerContainer = document.getElementById('hero-video');
      playerContainer.style.display = 'block';
      // Ensure the YouTube API is loaded
      loadYouTubeAPI().then((YT) => {
        try {
          const player = new YT.Player('hero-video', {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              start: startTime
            },
            events: {
              onReady: function(e) {
                try { e.target.playVideo(); } catch (err) {}
              },
              onStateChange: function(e) {
                // Use interval to loop between start and end times
                if (e.data == YT.PlayerState.PLAYING) {
                  if (player._segmentLoopInterval) clearInterval(player._segmentLoopInterval);
                  player._segmentLoopInterval = setInterval(() => {
                    try {
                      const t = player.getCurrentTime();
                      if (t >= endTime || player.getPlayerState() === YT.PlayerState.ENDED) {
                        player.seekTo(startTime);
                      }
                    } catch (err) {}
                  }, 250);
                } else {
                  if (player._segmentLoopInterval) { clearInterval(player._segmentLoopInterval); player._segmentLoopInterval = null; }
                }
              }
            }
          });
        } catch (err) {
          // Fallback: hide wrapper
          heroWrapper.style.display = 'none';
        }
      }).catch(() => { heroWrapper.style.display = 'none'; });
    } else {
      // No video id: remove video wrapper to avoid blank overlay
      const v = document.querySelector('.hero-video-wrapper');
      if (v) v.style.display = 'none';
    }
  } catch (e) {}

  // Demo features removed: Demo UI and interactions have been moved to demo.html placeholder.

  // A/B test for hero headline
  try {
    const heroP = document.querySelector('#hero p');
    let abVariant = localStorage.getItem(abKey);
    if (!abVariant) {
      abVariant = Math.random() > 0.5 ? 'A' : 'B';
      localStorage.setItem(abKey, abVariant);
      sendAnalytics('ab_variant_assigned', { variant: abVariant });
    }
    if (heroP) {
      if (abVariant === 'A') {
        heroP.innerHTML = 'Explicações clínicas claras';
      } else {
        heroP.innerHTML = 'Torne relatórios e exames fáceis de entender';
      }
    }
  } catch (e) {}

  // Wire CTA analytics (click on elements with data-analytics)
  document.querySelectorAll('[data-analytics]').forEach(el => {
    el.addEventListener('click', (ev) => {
      const eventName = el.getAttribute('data-analytics');
      const abVariantNow = localStorage.getItem(abKey) || 'A';
      sendAnalytics(eventName, { text: el.innerText ? el.innerText.substring(0, 80) : '', abVariant: abVariantNow });
    });
  });

  // Send lead to mock-api
  async function sendLead(payload) {
    try {
      // Prefer Google Sheets webhook if configured
      const url = (sheetsWebhook && sheetsWebhook !== '') ? sheetsWebhook : 'http://localhost:3000/leads';
      await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
    } catch (e) {
      // ignore
    }
  }

  // Intercept contact form submissions to also send mock lead and analytics
  const contactForm = document.querySelector('form[action="forms/contact.php"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      const fd = new FormData(contactForm);
      const obj = {};
      fd.forEach((v, k) => {
        if (k === 'message') return; // avoid sending raw messages (PII)
        obj[k] = v;
      });
      // include message length only
      if (fd.get('message')) obj.message_length = String((fd.get('message') || '').toString().length);
      sendLead({ source: 'contact_form', form: obj });
      const abVariantNow = localStorage.getItem(abKey) || 'A';
      sendAnalytics('contact_submit', { source: 'contact_form', abVariant: abVariantNow });
    });
  }

  // Intercept newsletter / pricing survey forms (action = forms/newsletter.php)
  document.querySelectorAll('form[action="forms/newsletter.php"]').forEach(f => {
    f.addEventListener('submit', function(e) {
      try {
        const fd = new FormData(f);
        const obj = {};
        fd.forEach((v, k) => obj[k] = v);
        // Add additional context
        obj.page = window.location.pathname;
        sendLead({ source: 'newsletter_form', form: obj });
        const abVariantNow = localStorage.getItem(abKey) || 'A';
        sendAnalytics('newsletter_submit', { source: 'newsletter_form', would_buy: obj.would_buy || null, abVariant: abVariantNow });
      } catch (e) {}
    });
  });

  // Fill hidden page fields
  try {
    const surveyPage = document.getElementById('survey-page');
    const contactPage = document.getElementById('contact-page');
    if (surveyPage) surveyPage.value = window.location.pathname || '/';
    if (contactPage) contactPage.value = window.location.pathname || '/';
  } catch (e) {}
});