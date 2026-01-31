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
  facebookUrl: "https://facebook.com/zzinn18", // REPLACE: Add actual Facebook URL
  instagramUrl: "https://instagram.com/zzinn18", // REPLACE: Add actual Instagram URL
  emailAddress: "Zwong650@gmail.com", // REPLACE: Add actual email
  wechatQrImagePath: "assets/wechat-qr.svg", // REPLACE: Use actual QR image
  
  // Form endpoint - REPLACE with your Formspree endpoint
  formEndpoint: "https://formspree.io/f/xxxxxxx",
  
  // Video content - REPLACE/ADD your actual videos
  // Categories: training, competition, tutorials
  videoItems: [
    {
      id: 1,
      category: "training",
      title: "Turning Kick Drill",
      caption: "Speed and power technique breakdown",
      // REPLACE: Use actual YouTube embed URL or video source
      embedUrl: "", // e.g., "https://www.youtube.com/embed/VIDEO_ID"
      videoSrc: "", // e.g., "assets/videos/turning-kick.mp4"
    },
    {
      id: 2,
      category: "competition",
      title: "Korea Open 2025",
      caption: "Gold medal winning performance",
      embedUrl: "",
      videoSrc: "",
    },
    {
      id: 3,
      category: "tutorials",
      title: "Poomsae Rhythm",
      caption: "Mastering timing and flow",
      embedUrl: "",
      videoSrc: "",
    },
    {
      id: 4,
      category: "training",
      title: "High Kick Fundamentals",
      caption: "Flexibility and balance exercises",
      embedUrl: "",
      videoSrc: "",
    },
    {
      id: 5,
      category: "competition",
      title: "SEA Games 2025",
      caption: "Team gold medal highlights",
      embedUrl: "",
      videoSrc: "",
    },
    {
      id: 6,
      category: "tutorials",
      title: "Stance Fundamentals",
      caption: "Building a strong foundation",
      embedUrl: "",
      videoSrc: "",
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
  facebookBtn: document.getElementById("facebookBtn"),
  emailBtn: document.getElementById("emailBtn"),
  instagramBtn: document.getElementById("instagramBtn"),
  contactForm: document.getElementById("contactForm"),
  
  // Modal
  wechatModal: document.getElementById("wechatModal"),
  
  // Footer
  currentYear: document.getElementById("currentYear"),
  footerWhatsapp: document.getElementById("footerWhatsapp"),
  footerFacebook: document.getElementById("footerFacebook"),
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
  
  DOM.videosGrid.innerHTML = videos.map((video) => {
    const mediaContent = video.embedUrl
      ? `<iframe src="${video.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
      : video.videoSrc
      ? `<video src="${video.videoSrc}" controls preload="metadata"></video>`
      : `<div class="video-card__placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Video Coming Soon</span>
        </div>`;
    
    return `
      <article class="video-card animate-on-scroll" data-category="${video.category}">
        <div class="video-card__media">
          ${mediaContent}
        </div>
        <div class="video-card__content">
          <span class="video-card__category">${video.category}</span>
          <h3 class="video-card__title">${video.title}</h3>
          <p class="video-card__caption">${video.caption}</p>
        </div>
      </article>
    `;
  }).join("");
  
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
  
  // Facebook
  if (DOM.facebookBtn) DOM.facebookBtn.href = CONFIG.facebookUrl;
  if (DOM.footerFacebook) DOM.footerFacebook.href = CONFIG.facebookUrl;
  
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
  
  // Update form action
  DOM.contactForm.action = CONFIG.formEndpoint;
  
  DOM.contactForm.addEventListener("submit", (e) => {
    // Basic client-side validation
    const email = DOM.contactForm.querySelector("#email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailPattern.test(email.value)) {
      e.preventDefault();
      email.setCustomValidity("Please enter a valid email address");
      email.reportValidity();
      return;
    }
    
    // Form will submit to Formspree
    // You can add loading state here if desired
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
