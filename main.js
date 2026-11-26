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

  const initDotCarousel = (root, slideSelector) => {
    if (!root) return;
    const slides = [...root.querySelectorAll(slideSelector)];
    if (!slides.length) return;
    const counter = root.querySelector("[data-carousel-counter]");
    const dots = [...root.querySelectorAll("[data-carousel-goto]")];
    const total = slides.length;
    let index = slides.findIndex((s) => s.classList.contains("active"));
    if (index < 0) index = 0;

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

    root.querySelectorAll("[data-carousel-prev]").forEach((btn) => {
      btn.addEventListener("click", () => goTo(index - 1));
    });
    root.querySelectorAll("[data-carousel-next]").forEach((btn) => {
      btn.addEventListener("click", () => goTo(index + 1));
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => goTo(Number(dot.dataset.carouselGoto)));
    });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });
  };

  initDotCarousel(document.querySelector("[data-work-carousel]"), ".work-slide");
  initDotCarousel(document.querySelector("[data-case-carousel]"), ".case-tour-slide");

  const bindLeadForm = (form, { onSuccess } = {}) => {
    if (!form) return;
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
      const prev = btn?.textContent;

      const showStatus = (text, isError) => {
        statusEl.hidden = false;
        statusEl.textContent = text;
        statusEl.classList.toggle("form-status-error", isError);
      };

      const contactEmail = window.VYRENLO_CONTACT_EMAIL || "contact@vyrenlo.com";
      const infoEmail = window.VYRENLO_INFO_EMAIL || "info@vyrenlo.com";

      if (!endpoint) {
        showStatus(
          `Form is not configured yet. Email us at ${contactEmail} or ${infoEmail}.`,
          true
        );
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }
      statusEl.hidden = true;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Request failed");
        showStatus(onSuccess?.message ?? "Thanks — we received your message.", false);
        form.reset();
        onSuccess?.run?.(form);
      } catch {
        showStatus(
          `Something went wrong. Please email ${contactEmail} or ${infoEmail} directly.`,
          true
        );
      } finally {
        if (btn) {
          btn.textContent = prev;
          btn.disabled = false;
        }
      }
    });
  };

  bindLeadForm(document.getElementById("contact-form"), {
    onSuccess: {
      message: "Thanks — we received your message and will reply within one business day.",
    },
  });

  bindLeadForm(document.getElementById("case-study-download-form"), {
    onSuccess: {
      message: "Your download is starting. Check your inbox for a copy from our team.",
      run: (form) => {
        const url = form.dataset.downloadUrl;
        if (!url) return;
        const a = document.createElement("a");
        a.href = url;
        const leaf = url.split("/").pop();
        a.download = leaf && leaf.includes(".") ? leaf : "vyrenlo-case-study.pdf";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      },
    },
  });

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
