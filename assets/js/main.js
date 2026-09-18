(() => {
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Theme toggle (initial theme is set inline in <head>) ---------- */
  const themeBtn = $(".theme-toggle");
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeBtn?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  };
  themeBtn?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  /* ---------- Header border on scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const nav = $(".nav");
  const menuBtn = $(".menu-toggle");
  const closeMenu = () => {
    nav?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  };
  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$(".nav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  /* ---------- Active nav link ---------- */
  const links = new Map($$(".nav a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        links.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  $$(".reveal").forEach((el) => revealer.observe(el));

  /* ---------- Project filters ---------- */
  const projects = $$(".project");
  const chips = $$(".chip-btn");
  chips.forEach((chip) => {
    const filter = chip.dataset.filter;
    const count = filter === "all" ? projects.length : projects.filter((p) => p.dataset.tags.split(" ").includes(filter)).length;
    const badge = $(".count", chip);
    if (badge) badge.textContent = count;

    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      projects.forEach((p) => {
        p.hidden = filter !== "all" && !p.dataset.tags.split(" ").includes(filter);
        if (!p.hidden) p.classList.add("is-visible");
      });
    });
  });

  /* ---------- Copy email ---------- */
  const copyBtn = $(".copy-btn");
  copyBtn?.addEventListener("click", async () => {
    const label = $("span", copyBtn);
    const original = label.textContent;
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      label.textContent = "Copied";
    } catch {
      label.textContent = "Press Ctrl+C";
    }
    setTimeout(() => (label.textContent = original), 1800);
  });

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
