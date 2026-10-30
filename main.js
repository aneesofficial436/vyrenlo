(function () {
  const calendlyUrl = window.VYRENLO_CALENDLY_URL;
  if (calendlyUrl) {
    document.querySelectorAll(".calendly-cta").forEach((el) => {
      el.href = calendlyUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }

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
    const statusEl =
      form.querySelector("[data-form-status]") ||
      (() => {
        const p = document.createElement("p");
        p.className = "form-status";
        p.setAttribute("data-form-status", "");
        p.hidden = true;
        form.appendChild(p);
        return p;
      })();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = window.VYRENLO_FORMSPREE_ENDPOINT;
      const btn = form.querySelector('button[type="submit"]');
      const prev = btn.textContent;

      const showStatus = (text, isError) => {
        statusEl.hidden = false;
        statusEl.textContent = text;
        statusEl.classList.toggle("form-status-error", isError);
      };

      if (!endpoint) {
        showStatus("Form is not configured yet. Email us at contact@vyrenlo.com.", true);
        return;
      }

      btn.disabled = true;
      btn.textContent = "Sending…";
      statusEl.hidden = true;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Request failed");
        showStatus("Thanks — we received your message and will reply within one business day.", false);
        form.reset();
      } catch {
        showStatus("Something went wrong. Please email contact@vyrenlo.com directly.", true);
      } finally {
        btn.textContent = prev;
        btn.disabled = false;
      }
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
