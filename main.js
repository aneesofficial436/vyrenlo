(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        nav.querySelectorAll(".nav-item-has-menu").forEach((item) => item.classList.remove("open"));
      });
    });
  }

  document.querySelectorAll(".nav-item-has-menu .nav-parent").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = btn.closest(".nav-item-has-menu");
      if (!item || window.matchMedia("(min-width: 901px)").matches) return;
      e.preventDefault();
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  const tabs = document.querySelectorAll(".spotlight-tab");
  const panels = {
    genai: document.getElementById("panel-genai"),
    agents: document.getElementById("panel-agents"),
    vision: document.getElementById("panel-vision"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      tabs.forEach((t) => {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        const show = key === id;
        panel.classList.toggle("active", show);
        panel.hidden = !show;
      });
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const prev = btn.textContent;
      btn.textContent = "Message ready — connect your backend";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = prev;
        btn.disabled = false;
        form.reset();
      }, 2500);
    });
  }

  const header = document.querySelector(".site-header");
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 20 ? "0 8px 32px rgba(0,0,0,0.35)" : "none";
      }
      lastY = y;
    },
    { passive: true }
  );
})();
