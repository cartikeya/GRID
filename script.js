document.addEventListener("DOMContentLoaded", () => {
  /* --- Navigation Logic --- */
  // Highlight active link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.style.color = "var(--primary-color)";
      link.style.fontWeight = "700";
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      // Animate hamburger
      hamburger.textContent = navLinksContainer.classList.contains("active")
        ? "✕"
        : "☰";
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* --- Gate Interface Animations --- */
  // Floating nodes removed for Spline background integration

  // Gate "Get Started" Smooth Transition
  const enterBtn = document.getElementById("enter-btn");
  if (enterBtn) {
    enterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const gateContent = document.querySelector(".gate-content");
      gateContent.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      gateContent.style.opacity = "0";
      gateContent.style.transform = "scale(0.9)";

      setTimeout(() => {
        window.location.href = enterBtn.getAttribute("href");
      }, 500);
    });
  }

  /* --- Button Operations & Interactivity --- */

  // 1. Join Club Buttons - show feedback before redirect
  const joinBtns = document.querySelectorAll(".js-join-btn");
  joinBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Optional: prevent default if you want to control the opening precisely
      // e.preventDefault();
      // window.open(btn.href, '_blank');

      showToast("Redirecting to Registration Form...", "info");
    });
  });

  // 2. Smooth Scrolling for "Explore" buttons
  const scrollBtns = document.querySelectorAll(".js-scroll-btn");
  scrollBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 3. Resource Buttons in Materials Page
  const resourceBtns = document.querySelectorAll(".js-resource-btn");
  resourceBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const resourceName = btn.getAttribute("data-resource") || "Resource";
      const originalText = btn.textContent;

      // Determine link to open: prefer `href` (if not '#'), then `data-url`
      const href = btn.getAttribute("href");
      const dataUrl = btn.getAttribute("data-url");
      const urlToOpen =
        href && href !== "#" && href !== "" ? href : dataUrl || null;

      if (!urlToOpen) {
        showToast(`No Drive link configured for ${resourceName}.`, "error");
        return;
      }

      // Simulate loading state then open in new tab
      btn.textContent = "Opening...";
      btn.style.opacity = "0.7";

      setTimeout(() => {
        try {
          window.open(urlToOpen, "_blank", "noopener");
          showToast(`Opened ${resourceName} Folder.`, "success");
        } catch (err) {
          showToast("Unable to open link.", "error");
        }
        btn.textContent = originalText;
        btn.style.opacity = "1";
      }, 600);
    });
  });

  // Toast Notification System
  function showToast(message, type = "info") {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Append to body
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  /* --- Mock Data Content --- */
  // Announcements Data
  const announcementsContainer = document.getElementById(
    "announcements-container",
  );
  if (announcementsContainer) {
    const announcements = [
      {
        date: "Oct 24, 2023",
        title: "Annual Hackathon Registration",
        desc: "Teams of 4. 24 hours. Infinite coffee. Register now to showcase your skills and win prizes worth 50k!",
      },
      {
        date: "Oct 15, 2023",
        title: "System Design Workshop",
        desc: "Learn how to scale applications from 100 to 1 million users with our guest speaker from Google.",
      },
      {
        date: "Oct 01, 2023",
        title: "Data Structures Bootcamp",
        desc: "A 4-week intensive bootcamp covering everything from Arrays to Graphs. Valid for 1st and 2nd years.",
      },
      {
        date: "Sep 20, 2023",
        title: "Club Orientation",
        desc: "Welcome to G R I D! Meet the team and learn about our mission and upcoming activities.",
      },
    ];

    // Clear fallback content
    announcementsContainer.innerHTML = "";

    announcements.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <span class="date-badge">${item.date}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
      announcementsContainer.appendChild(card);
    });
  }
  // Index Page "Join Now" Button
  const joinNowBtn = document.getElementById("join-now-btn");
  if (joinNowBtn) {
    joinNowBtn.addEventListener("click", () => {
      window.location.href = "home.html";
    });
  }
  // Initialize AOS if loaded
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  // --- Remove Spline attribution if injected by the viewer ---
  (function removeSplineAttribution() {
    const removeNow = () => {
      try {
        const selectors = [
          'a[href*="splinetool"]',
          'a[href*="spline.design"]',
          'a[href*="studio.spline.design"]',
          '[title*="Spline"]',
        ];
        const els = document.querySelectorAll(selectors.join(","));
        els.forEach((el) => el.remove());
      } catch (e) {
        // ignore
      }
    };

    // Run shortly after load in case viewer injects later
    setTimeout(removeNow, 250);

    // Observe for dynamic injections for a short window
    const obs = new MutationObserver(removeNow);
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 5000);
  })();

  /* --- Remove Spline Logo --- */
  function removeSplineLogo() {
    const viewers = document.querySelectorAll("spline-viewer");
    viewers.forEach((viewer) => {
      // Wait for shadow root to be populated or check if it exists
      if (viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector("#logo");
        if (logo) {
          logo.remove();
        }

        // Also inject a style to hiding it just in case it regenerates
        const style = document.createElement("style");
        style.textContent = "#logo { display: none !important; }";
        viewer.shadowRoot.appendChild(style);
      }
    });
  }

  // Attempt removal multiple times to catch async rendering
  removeSplineLogo();
  setInterval(removeSplineLogo, 1000); // Check every second to ensure it stays gone
});
