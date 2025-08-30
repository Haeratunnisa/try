/* ===========================
   scripts.js — Custom logic
   =========================== */

// ---------------- Countdown ----------------
const countdownDate = new Date("September 4, 2025 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p class='text-lg font-bold'>Acara sedang berlangsung 🎉</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("hero-days").textContent = days;
  document.getElementById("hero-hours").textContent = hours;
  document.getElementById("hero-minutes").textContent = minutes;
  document.getElementById("hero-seconds").textContent = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown(); // jalankan pertama kali

// ---------------- Musik + Overlay ----------------
const playButton = document.getElementById("playButton");
const playOverlay = document.getElementById("playOverlay");
const backgroundMusic = document.getElementById("backgroundMusic");

if (playButton && backgroundMusic && playOverlay) {
  playButton.addEventListener("click", () => {
    backgroundMusic.play().catch(err => console.log("Autoplay blocked:", err));
    playOverlay.classList.add("hidden");
    document.body.style.overflowY = "auto"; // aktifkan scroll setelah undangan dibuka
  });
}

// ---------------- Sakura Animation ----------------
const sakuraContainer = document.createElement("div");
sakuraContainer.id = "sakura-container";
document.body.appendChild(sakuraContainer);

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("sakura-petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 4 + Math.random() * 6 + "s";
  petal.style.opacity = Math.random().toString();
  petal.style.setProperty("--wind-effect", (Math.random() * 100 - 50) + "px");
  petal.style.backgroundImage =
    "url('https://cdn-icons-png.flaticon.com/512/616/616490.png')"; // ganti dengan ikon sakura

  sakuraContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 500);

// ---------------- Guestbook (LocalStorage) ----------------
const guestbookForm = document.getElementById("guestbookForm");
const ucapanList = document.getElementById("ucapanList");

function renderUcapan() {
  if (!ucapanList) return;
  ucapanList.innerHTML = "";
  const ucapanData = JSON.parse(localStorage.getItem("ucapanData")) || [];
  ucapanData.forEach(item => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow-md p-4";
    div.innerHTML = `<p class="font-bold">${item.nama}</p><p>${item.ucapan}</p>`;
    ucapanList.appendChild(div);
  });
}

if (guestbookForm) {
  guestbookForm.addEventListener("submit", e => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapan").value.trim();
    if (nama && ucapan) {
      const ucapanData = JSON.parse(localStorage.getItem("ucapanData")) || [];
      ucapanData.push({ nama, ucapan });
      localStorage.setItem("ucapanData", JSON.stringify(ucapanData));
      guestbookForm.reset();
      renderUcapan();
    }
  });
  renderUcapan();
}

// ---------------- Copy Rekening ----------------
function copyToClipboard(elementId, button) {
  const text = document.getElementById(elementId)?.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (button) {
      const span = button.querySelector(".btn-text");
      const old = span.textContent;
      span.textContent = "Disalin!";
      setTimeout(() => (span.textContent = old), 1500);
    }
  });
}

// ---------------- AOS & Lucide Init ----------------
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ once: true, duration: 900 });
  if (window.lucide) lucide.createIcons();
});
