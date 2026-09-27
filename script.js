document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const typingText = document.getElementById("typingText");

  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "portfolio-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });

  const words = ["تقنية المعلومات", "تطوير الويب", "البرمجة"];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeEffect() {
    const word = words[wordIndex];
    typingText.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex++;
      setTimeout(typeEffect, 95);
    } else if (!deleting) {
      deleting = true;
      setTimeout(typeEffect, 1100);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 250);
    }
  }
  typeEffect();

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      document.querySelectorAll(".project-card").forEach(card => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });

  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email.includes("@") || message.length < 5) {
      formMessage.textContent = "يرجى التأكد من إدخال البيانات بشكل صحيح.";
      return;
    }

    formMessage.textContent = "تم التحقق من البيانات بنجاح. نموذج التواصل تجريبي حاليًا.";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
