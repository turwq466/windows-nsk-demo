document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const closeMenu = () => { nav?.classList.remove("is-open"); menuToggle?.setAttribute("aria-expanded", "false"); };
  menuToggle?.addEventListener("click", () => { const open = nav?.classList.toggle("is-open"); menuToggle.setAttribute("aria-expanded", String(Boolean(open))); });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const typeData = {
    plastic: { label: "ПВХ", base: 14200, multiplier: 1 },
    balcony: { label: "балконный блок", base: 21900, multiplier: 1.1 },
    door: { label: "дверь", base: 18400, multiplier: .92 },
  };
  const calc = document.querySelector("#calculatorForm");
  const estimateTotal = document.querySelector("#estimateTotal");
  const estimateArea = document.querySelector("#estimateArea");
  const estimateProfile = document.querySelector("#estimateProfile");
  const estimateInstall = document.querySelector("#estimateInstall");
  const formatRub = (value) => `${Math.round(value / 100) * 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  const updateEstimate = () => {
    const type = typeData[document.querySelector("#windowType")?.value || "plastic"];
    const width = Number(document.querySelector("#width")?.value || 1400);
    const height = Number(document.querySelector("#height")?.value || 1400);
    const glazing = Number(document.querySelector("#glazing")?.value || 1);
    const sashes = Number(document.querySelector("input[name='sashes']:checked")?.value || 2);
    const install = document.querySelector("#install")?.checked;
    const area = Math.max(.4, (width * height) / 1000000);
    const sashFactor = 1 + (sashes - 2) * .06;
    const total = type.base * area * type.multiplier * glazing * sashFactor + (install ? 8900 : 0);
    estimateTotal.textContent = `от ${formatRub(total)}`;
    estimateArea.textContent = `${area.toFixed(2).replace(".", ",")} м²`;
    estimateProfile.textContent = type.label;
    estimateInstall.textContent = install ? "включён" : "не включён";
  };
  calc?.querySelectorAll("input, select").forEach((control) => control.addEventListener("input", updateEstimate));
  updateEstimate();

  const contactForm = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = contactForm.elements.name.value.trim();
    feedback.textContent = `${name || "Спасибо"}! Заявка готова к отправке в рабочей версии макета.`;
    contactForm.reset();
    updateEstimate();
  });
});
