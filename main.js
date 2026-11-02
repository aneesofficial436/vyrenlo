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
    nav.querySelectorAll(".nav-actions a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
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

  /* Hero workflow cycle */
  const flowRoot = document.querySelector("[data-hero-flow]");
  if (flowRoot) {
    const steps = [...flowRoot.querySelectorAll(".flow-step")];
    let flowIndex = 0;
    const advanceFlow = () => {
      steps.forEach((s, i) => s.classList.toggle("active", i === flowIndex));
      flowIndex = (flowIndex + 1) % steps.length;
    };
    advanceFlow();
    setInterval(advanceFlow, 2400);
  }

  /* Interactive process journey */
  const journey = document.querySelector("[data-process-journey]");
  if (journey) {
    const btns = [...journey.querySelectorAll(".process-journey-btn")];
    const journeyPanels = [...journey.querySelectorAll(".process-journey-panel")];
    const showProcess = (key) => {
      btns.forEach((b) => {
        const on = b.dataset.process === key;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      journeyPanels.forEach((p) => {
        const on = p.dataset.processPanel === key;
        p.classList.toggle("active", on);
        p.hidden = !on;
      });
    };
    btns.forEach((btn) => {
      btn.addEventListener("click", () => showProcess(btn.dataset.process));
    });
  }

  /* Work carousel */
  const carousel = document.querySelector("[data-work-carousel]");
  if (carousel) {
    const slides = [...carousel.querySelectorAll(".work-slide")];
    const counter = carousel.querySelector("[data-carousel-counter]");
    const dots = [...carousel.querySelectorAll("[data-carousel-goto]")];
    const total = slides.length;
    let index = 0;

    const goTo = (i) => {
      index = (i + total) % total;
      slides.forEach((slide, si) => {
        const on = si === index;
        slide.classList.toggle("active", on);
        slide.hidden = !on;
      });
      dots.forEach((dot, di) => {
        const on = di === index;
        dot.classList.toggle("active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
      });
      if (counter) {
        counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      }
    };

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => goTo(index - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => goTo(Number(dot.dataset.carouselGoto)));
    });
  }

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
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 20 ? "0 8px 32px rgba(0, 0, 0, 0.35)" : "none";
      }
    },
    { passive: true }
  );
})();
