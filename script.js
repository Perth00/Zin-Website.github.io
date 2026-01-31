/**
 * =====================================================
 * TRIPLEZIN - TAEKWONDO POOMSAE COACH WEBSITE
 * JavaScript - Animations & Interactivity
 * =====================================================
 */

// ===================== CONFIGURATION =====================
// REPLACE: Update these values with actual information
const CONFIG = {
  coachName: "TripleZin",
  tagline: "Taekwondo Poomsae Coach • Former National Team Athlete",
  heroBadge: "2025 SEA Games Gold Medalist",
  
  // Contact Information
  whatsappNumber: "+60163091778", // Format: country code + number, no spaces
  instagramUrl: "https://instagram.com/zzinn18",
  emailAddress: "zwong650@gmail.com",
  wechatQrImagePath: "assets/wechat-qr.jpeg",
  
  // Form endpoint - REPLACE with your Formspree endpoint
  formEndpoint: "https://formspree.io/f/xxxxxxx",
  
  // Video content - Korea Open & SEA Games footage
  videoItems: [
    {
      id: 1,
      category: "competition",
      videoSrc: "assets/video and pic/WhatsApp Video 2026-02-01 at 00.47.02.mp4",
    },
    {
      id: 2,
      category: "competition",
      videoSrc: "assets/video and pic/WhatsApp Video 2026-02-01 at 00.46.45.mp4",
    },
    {
      id: 3,
      category: "competition",
      videoSrc: "assets/video and pic/WhatsApp Video 2026-02-01 at 00.46.36.mp4",
    },
    {
      id: 4,
      category: "competition",
      videoSrc: "assets/video and pic/WhatsApp Video 2026-02-01 at 00.46.26.mp4",
    },
    {
      id: 5,
      category: "competition",
      videoSrc: "assets/video and pic/WhatsApp Video 2026-02-01 at 00.46.15.mp4",
    },
  ],
  
  // Animation settings
  introDuration: 3000, // Duration before auto-hiding intro (ms)
  animationDelay: 100, // Stagger delay for scroll animations (ms)
};

// ===================== DOM ELEMENTS =====================
const DOM = {
  // Intro
  intro: document.getElementById("intro"),
  skipIntro: document.getElementById("skipIntro"),
  mainContent: document.getElementById("mainContent"),
  
  // Navigation
  header: document.getElementById("header"),
  navToggle: document.getElementById("navToggle"),
  navMenu: document.getElementById("navMenu"),
  navLinks: document.querySelectorAll(".nav__link"),
  
  // Hero
  heroName: document.getElementById("heroName"),
  heroTagline: document.getElementById("heroTagline"),
  heroBadge: document.getElementById("heroBadge"),
  
  // Videos
  videosGrid: document.getElementById("videosGrid"),
  videoFilterBtns: document.querySelectorAll(".videos__filter-btn"),
  
  // Contact
  whatsappBtn: document.getElementById("whatsappBtn"),
  wechatBtn: document.getElementById("wechatBtn"),
  emailBtn: document.getElementById("emailBtn"),
  instagramBtn: document.getElementById("instagramBtn"),
  contactForm: document.getElementById("contactForm"),
  
  // Modal
  wechatModal: document.getElementById("wechatModal"),
  
  // Footer
  currentYear: document.getElementById("currentYear"),
  footerWhatsapp: document.getElementById("footerWhatsapp"),
  footerInstagram: document.getElementById("footerInstagram"),
  
  // WhatsApp CTAs in pricing cards
  whatsappCtas: document.querySelectorAll("[data-whatsapp]"),
  
  // Scroll animations
  animateElements: document.querySelectorAll(".animate-on-scroll"),
};

// ===================== UTILITIES =====================
/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Format WhatsApp URL
 */
const getWhatsAppUrl = (message = "") => {
  const phone = CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ""}`;
};

/**
 * Debounce function for scroll events
 */
const debounce = (func, wait = 10) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// ===================== INTRO ANIMATION =====================
const initIntro = () => {
  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion()) {
    hideIntro(true);
    return;
  }
  
  // Auto-hide intro after duration
  const introTimer = setTimeout(() => {
    hideIntro();
  }, CONFIG.introDuration);
  
  // Skip button handler
  DOM.skipIntro?.addEventListener("click", () => {
    clearTimeout(introTimer);
    hideIntro();
  });
  
  // Allow keyboard skip
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !DOM.intro?.classList.contains("hidden")) {
      clearTimeout(introTimer);
      hideIntro();
    }
  });
};

const hideIntro = (instant = false) => {
  if (!DOM.intro || !DOM.mainContent) return;
  
  if (instant) {
    DOM.intro.style.display = "none";
    DOM.mainContent.classList.add("visible");
    DOM.mainContent.removeAttribute("aria-hidden");
    document.body.classList.remove("no-scroll");
    return;
  }
  
  DOM.intro.classList.add("hidden");
  DOM.mainContent.classList.add("visible");
  DOM.mainContent.removeAttribute("aria-hidden");
  
  // Remove intro from DOM after transition
  setTimeout(() => {
    DOM.intro.style.display = "none";
    document.body.classList.remove("no-scroll");
  }, 600);
};

// ===================== NAVIGATION =====================
const initNavigation = () => {
  // Mobile menu toggle
  DOM.navToggle?.addEventListener("click", () => {
    const isOpen = DOM.navMenu?.classList.toggle("open");
    DOM.navToggle.classList.toggle("active");
    DOM.navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("no-scroll", isOpen);
  });
  
  // Close menu on link click
  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      DOM.navMenu?.classList.remove("open");
      DOM.navToggle?.classList.remove("active");
      DOM.navToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });
  
  // Header scroll effect
  const handleScroll = debounce(() => {
    const scrolled = window.scrollY > 50;
    DOM.header?.classList.toggle("scrolled", scrolled);
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  window.addEventListener("scroll", handleScroll, { passive: true });
  
  // Initial check
  handleScroll();
};

const updateActiveNavLink = () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      DOM.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
};

// ===================== HERO CONTENT =====================
const initHeroContent = () => {
  if (DOM.heroName) DOM.heroName.textContent = CONFIG.coachName;
  if (DOM.heroTagline) DOM.heroTagline.textContent = CONFIG.tagline;
  if (DOM.heroBadge) DOM.heroBadge.textContent = CONFIG.heroBadge;
};

// ===================== VIDEO GALLERY =====================
const initVideoGallery = () => {
  if (!DOM.videosGrid) return;
  
  // Render video cards
  renderVideoCards(CONFIG.videoItems);
  
  // Filter functionality
  DOM.videoFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      DOM.videoFilterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      // Filter videos
      filterVideos(filter);
    });
  });
};

const renderVideoCards = (videos) => {
  if (!DOM.videosGrid) return;
  
  DOM.videosGrid.innerHTML = videos.map((video, index) => {
    return `
      <article class="video-card video-card--portrait animate-on-scroll" data-category="${video.category}" data-video-id="${index}">
        <div class="video-card__media">
          <video src="${video.videoSrc}" controls preload="metadata" playsinline></video>
        </div>
      </article>
    `;
  }).join("");
  
  // Detect video orientation after metadata loads
  DOM.videosGrid.querySelectorAll("video").forEach((video) => {
    video.addEventListener("loadedmetadata", () => {
      const card = video.closest(".video-card");
      if (video.videoWidth > video.videoHeight) {
        // Landscape video
        card.classList.remove("video-card--portrait");
        card.classList.add("video-card--landscape");
      } else {
        // Portrait video (default)
        card.classList.remove("video-card--landscape");
        card.classList.add("video-card--portrait");
      }
    });
  });
  
  // Re-initialize scroll animations for new elements
  initScrollAnimations();
};

const filterVideos = (category) => {
  const cards = DOM.videosGrid?.querySelectorAll(".video-card");
  
  cards?.forEach((card) => {
    const cardCategory = card.dataset.category;
    const shouldShow = category === "all" || cardCategory === category;
    
    if (shouldShow) {
      card.classList.remove("hidden");
      // Re-trigger animation
      card.classList.remove("visible");
      setTimeout(() => card.classList.add("visible"), 50);
    } else {
      card.classList.add("hidden");
    }
  });
};

// ===================== CONTACT LINKS =====================
const initContactLinks = () => {
  // WhatsApp
  const whatsappUrl = getWhatsAppUrl("Hi TripleZin! I'm interested in Taekwondo training.");
  
  if (DOM.whatsappBtn) DOM.whatsappBtn.href = whatsappUrl;
  if (DOM.footerWhatsapp) DOM.footerWhatsapp.href = whatsappUrl;
  
  // Instagram
  if (DOM.instagramBtn) DOM.instagramBtn.href = CONFIG.instagramUrl;
  if (DOM.footerInstagram) DOM.footerInstagram.href = CONFIG.instagramUrl;
  
  // Email
  if (DOM.emailBtn) {
    DOM.emailBtn.href = `mailto:${CONFIG.emailAddress}?subject=Taekwondo Training Inquiry`;
  }
  
  // Pricing card WhatsApp buttons
  DOM.whatsappCtas.forEach((btn) => {
    const level = btn.dataset.whatsapp;
    const messages = {
      beginner: "Hi TripleZin! I'm interested in Beginner class training.",
      intermediate: "Hi TripleZin! I'm interested in Intermediate class training.",
      competition: "Hi TripleZin! I'm interested in Competition Prep training.",
    };
    btn.href = getWhatsAppUrl(messages[level] || "Hi TripleZin! I'm interested in training.");
  });
  
  // WeChat modal
  DOM.wechatBtn?.addEventListener("click", () => {
    openModal(DOM.wechatModal);
  });
};

// ===================== MODAL =====================
const initModal = () => {
  // Close modal handlers
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      const modal = el.closest(".modal");
      closeModal(modal);
    });
  });
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal.open");
      if (openModal) closeModal(openModal);
    }
  });
};

const openModal = (modal) => {
  if (!modal) return;
  
  modal.hidden = false;
  document.body.classList.add("no-scroll");
  
  // Trigger reflow for animation
  modal.offsetHeight;
  modal.classList.add("open");
  
  // Focus first focusable element
  const focusable = modal.querySelector("button, [href], input, select, textarea");
  focusable?.focus();
};

const closeModal = (modal) => {
  if (!modal) return;
  
  modal.classList.remove("open");
  document.body.classList.remove("no-scroll");
  
  setTimeout(() => {
    modal.hidden = true;
  }, 300);
};

// ===================== CONTACT FORM =====================
const initContactForm = () => {
  if (!DOM.contactForm) return;
  
  DOM.contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form values
    const name = DOM.contactForm.querySelector("#name")?.value || "";
    const email = DOM.contactForm.querySelector("#email")?.value || "";
    const phone = DOM.contactForm.querySelector("#phone")?.value || "";
    const message = DOM.contactForm.querySelector("#message")?.value || "";
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      const emailInput = DOM.contactForm.querySelector("#email");
      emailInput.setCustomValidity("Please enter a valid email address");
      emailInput.reportValidity();
      return;
    }
    
    // Construct email body
    const subject = `Taekwondo Training Inquiry from ${name}`;
    const body = `Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}`;
    
    // Open mailto link
    const mailtoUrl = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    // Show success feedback
    alert("Opening your email client to send the message!");
  });
  
  // Clear custom validity on input
  DOM.contactForm.querySelector("#email")?.addEventListener("input", (e) => {
    e.target.setCustomValidity("");
  });
};

// ===================== SCROLL ANIMATIONS =====================
const initScrollAnimations = () => {
  if (prefersReducedMotion()) {
    // Show all elements immediately if reduced motion is preferred
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("visible");
    });
    return;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * CONFIG.animationDelay);
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    }
  );
  
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
};

// ===================== SMOOTH SCROLL =====================
const initSmoothScroll = () => {
  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      const headerHeight = DOM.header?.offsetHeight || 70;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  });
};

// ===================== FOOTER =====================
const initFooter = () => {
  // Update current year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
};

// ===================== FAQ ACCORDION =====================
const initFAQ = () => {
  const faqItems = document.querySelectorAll(".faq__item");
  
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    
    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");
          otherItem.querySelector(".faq__question")?.setAttribute("aria-expanded", "false");
        }
      });
      
      // Toggle current item
      item.classList.toggle("open");
      question.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });
};

// ===================== GALLERY =====================
const initGallery = () => {
  const galleryInstagramBtn = document.getElementById("instagramGalleryBtn");
  if (galleryInstagramBtn) {
    galleryInstagramBtn.href = CONFIG.instagramUrl;
  }
  
  // Make gallery images clickable for lightbox
  const galleryItems = document.querySelectorAll(".gallery__item");
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      item.addEventListener("click", () => {
        openLightbox(img.src);
      });
    }
  });
  
  // Make about photo clickable
  const aboutPhoto = document.querySelector(".about__photo img");
  if (aboutPhoto) {
    aboutPhoto.style.cursor = "pointer";
    aboutPhoto.addEventListener("click", () => {
      openLightbox(aboutPhoto.src);
    });
  }
};

// ===================== LIGHTBOX =====================
let currentZoom = 100;
const MIN_ZOOM = 50;
const MAX_ZOOM = 300;
const ZOOM_STEP = 25;

const initLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const zoomIn = document.getElementById("zoomIn");
  const zoomOut = document.getElementById("zoomOut");
  const zoomReset = document.getElementById("zoomReset");
  const zoomLevel = document.getElementById("zoomLevel");
  
  if (!lightbox) return;
  
  // Close lightbox handlers
  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  
  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
  
  // Zoom controls
  zoomIn?.addEventListener("click", () => {
    if (currentZoom < MAX_ZOOM) {
      currentZoom += ZOOM_STEP;
      updateZoom();
    }
  });
  
  zoomOut?.addEventListener("click", () => {
    if (currentZoom > MIN_ZOOM) {
      currentZoom -= ZOOM_STEP;
      updateZoom();
    }
  });
  
  zoomReset?.addEventListener("click", () => {
    currentZoom = 100;
    updateZoom();
  });
  
  // Mouse wheel zoom
  lightbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && currentZoom < MAX_ZOOM) {
      currentZoom += ZOOM_STEP;
    } else if (e.deltaY > 0 && currentZoom > MIN_ZOOM) {
      currentZoom -= ZOOM_STEP;
    }
    updateZoom();
  }, { passive: false });
  
  // Double click to zoom
  lightboxImage?.addEventListener("dblclick", () => {
    if (currentZoom === 100) {
      currentZoom = 200;
    } else {
      currentZoom = 100;
    }
    updateZoom();
  });
  
  // Pinch to zoom on touch devices
  let initialDistance = 0;
  let initialZoom = 100;
  
  lightbox.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      initialZoom = currentZoom;
    }
  }, { passive: true });
  
  lightbox.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const scale = currentDistance / initialDistance;
      currentZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, initialZoom * scale));
      updateZoom();
    }
  }, { passive: true });
  
  function updateZoom() {
    if (lightboxImage) {
      lightboxImage.style.transform = `scale(${currentZoom / 100})`;
    }
    if (zoomLevel) {
      zoomLevel.textContent = `${Math.round(currentZoom)}%`;
    }
  }
  
  // Make WeChat QR clickable for lightbox
  const wechatQr = document.querySelector(".modal__qr img");
  if (wechatQr) {
    wechatQr.addEventListener("click", () => {
      closeModal(document.getElementById("wechatModal"));
      setTimeout(() => openLightbox(wechatQr.src), 300);
    });
  }
};

const openLightbox = (imageSrc) => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  
  if (!lightbox || !lightboxImage) return;
  
  currentZoom = 100;
  lightboxImage.src = imageSrc;
  lightboxImage.style.transform = "scale(1)";
  document.getElementById("zoomLevel").textContent = "100%";
  
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  
  // Trigger animation
  requestAnimationFrame(() => {
    lightbox.classList.add("open");
  });
};

const closeLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
  
  setTimeout(() => {
    lightbox.hidden = true;
  }, 400);
};

// ===================== ACCESSIBILITY =====================
const initAccessibility = () => {
  // Add skip link functionality
  const skipLink = document.querySelector(".skip-link");
  skipLink?.addEventListener("click", (e) => {
    e.preventDefault();
    const main = document.querySelector("main");
    main?.focus();
    main?.scrollIntoView();
  });
  
  // Trap focus in modal when open
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    
    const modal = document.querySelector(".modal.open");
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });
};

// ===================== INITIALIZATION =====================
const init = () => {
  // Lock scroll during intro
  document.body.classList.add("no-scroll");
  
  // Initialize all modules
  initIntro();
  initNavigation();
  initHeroContent();
  initVideoGallery();
  initGallery();
  initLightbox();
  initContactLinks();
  initModal();
  initContactForm();
  initFAQ();
  initScrollAnimations();
  initSmoothScroll();
  initFooter();
  initAccessibility();
};

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export config for debugging (optional)
window.TRIPLEZIN_CONFIG = CONFIG;
