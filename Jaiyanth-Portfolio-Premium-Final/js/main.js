document.addEventListener("DOMContentLoaded", () => {
  const config = window.portfolioConfig || {};
  document.querySelectorAll("[data-link]").forEach(a => {
    const key = a.dataset.link;
    if (config[key]) a.href = config[key];
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const quotes = [
    ["“Build things that make people stop and look twice.”","JAIYANTH — NOTES"],
    ["“Structure gives an idea a spine. Creativity gives it a pulse.”","BUILDING — NOTES"],
    ["“The best part of an idea is the moment it becomes real.”","JAIYANTH — NOTES"],
    ["“A team becomes powerful when every person has room to shine.”","LEADERSHIP — NOTES"],
    ["“Learn deeply. Build boldly. Stay curious.”","JAIYANTH — NOTES"]
  ];
  const quoteText = document.getElementById("quoteText");
  const quoteTag = document.getElementById("quoteTag");
  let qi = 0;
  if (quoteText && quoteTag) {
    setInterval(() => {
      quoteText.classList.add("quote-changing");
      quoteTag.classList.add("quote-changing");
      setTimeout(() => {
        qi = (qi + 1) % quotes.length;
        quoteText.textContent = quotes[qi][0];
        quoteTag.textContent = quotes[qi][1];
        quoteText.classList.remove("quote-changing");
        quoteTag.classList.remove("quote-changing");
      }, 280);
    }, 4800);
  }

  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();
});
