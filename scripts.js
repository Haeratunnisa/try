// scripts.js - countdown, music, sakura, guestbook, copy

// AOS and lucide were initialized in HTML inline scripts

// Countdown
(function () {
  const countdownDate = new Date("September 4, 2025 10:00:00").getTime();
  function update() {
    const now = Date.now();
    const dist = countdownDate - now;
    if (dist <= 0) {
      document.getElementById("countdown").innerHTML = "<div class='text-2xl text-white'>ACARA TELAH DIMULAI</div>";
      clearInterval(interval);
      return;
    }
    const days = Math.floor(dist / (1000*60*60*24));
    const hours = Math.floor((dist % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((dist % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((dist % (1000*60)) / 1000);
    if (document.getElementById("hero-days")) document.getElementById("hero-days").innerText = String(days).padStart(2, '0');
    if (document.getElementById("hero-hours")) document.getElementById("hero-hours").innerText = String(hours).padStart(2, '0');
    if (document.getElementById("hero-minutes")) document.getElementById("hero-minutes").innerText = String(minutes).padStart(2, '0');
    if (document.getElementById("hero-seconds")) document.getElementById("hero-seconds").innerText = String(seconds).padStart(2, '0');
  }
  update();
  const interval = setInterval(update, 1000);
})();

// Music player + overlay
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundMusic');
  const playBtn = document.getElementById('playButton');
  const overlay = document.getElementById('playOverlay');
  const musicControl = document.getElementById('musicControl');
  const musicSvg = document.getElementById('musicSvg');

  function setMusicIconPlaying(playing){
    if(!musicSvg) return;
    musicSvg.innerHTML = playing
      ? '<path d="M9 5v14l11-7z"/>'
      : '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      audio.play().catch(()=>{/* autoplay blocked */});
      overlay.classList.add('hidden');
      setTimeout(()=> overlay.remove(), 600);
    });
  }

  if (musicControl) {
    musicControl.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        setMusicIconPlaying(true);
      } else {
        audio.pause();
        setMusicIconPlaying(false);
      }
    });
  }
});

// Copy to clipboard
function copyToClipboard(elementId, buttonElement) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    const btnText = buttonElement.querySelector('.btn-text');
    const original = btnText ? btnText.innerText : '';
    if (btnText) btnText.innerText = 'Berhasil disalin!';
    setTimeout(()=> { if (btnText) btnText.innerText = original; }, 1800);
  }).catch(()=> alert('Gagal menyalin ke clipboard'));
}

// Sakura animation (lightweight)
(function(){
  const petalImages = [
    'https://raw.githubusercontent.com/Haeratunnisa/wedding-site/main/audio/sakura.png',
    'https://raw.githubusercontent.com/Haeratunnisa/wedding-site/main/audio/peony.png.png',
    'https://raw.githubusercontent.com/Haeratunnisa/wedding-site/main/audio/rb.png'
  ];

  function createPetal(){
    const container = document.getElementById('sakura-container');
    if(!container) return;
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    const img = petalImages[Math.floor(Math.random()*petalImages.length)];
    petal.style.backgroundImage = `url('${img}')`;
    const size = Math.random()*20 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = Math.random()*100 + 'vw';
    petal.style.animationDuration = (Math.random()*6 + 6) + 's';
    petal.style.setProperty('--wind-effect', (Math.random()-0.5)*200 + 'px');
    container.appendChild(petal);
    setTimeout(()=> petal.remove(), (parseFloat(petal.style.animationDuration)*1000)+1000);
  }

  // spawn a few initially, then interval
  for(let i=0;i<10;i++){ setTimeout(createPetal, i*200); }
  setInterval(createPetal, 1200);
})();

// Guestbook localStorage
(function(){
  const form = document.getElementById('guestbookForm');
  const list = document.getElementById('ucapanList');
  let wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');

  function render(){
    if(!list) return;
    list.innerHTML = '';
    wishes.forEach(item => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded-lg shadow';
      div.innerHTML = `<p class="font-semibold">${item.name}</p><p class="text-sm mt-1">${item.wish}</p>`;
      list.appendChild(div);
    });
  }
  render();

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = e.target.nama.value.trim();
      const wish = e.target.ucapan.value.trim();
      if(!name || !wish) return;
      wishes.unshift({name, wish});
      localStorage.setItem('weddingWishes', JSON.stringify(wishes));
      render();
      form.reset();
    });
  }
})();
