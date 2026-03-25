// 🎵 Main music play/pause (birthday song)
const musicButton = document.getElementById("musicBtn");
const song = document.getElementById("bdaySong");

musicButton.addEventListener("click", () => {
  if (song.paused) {
    song.play().then(() => {
      musicButton.textContent = "Pause Music";
    }).catch(err => {
      console.log("Audio play blocked. User must interact.", err);
      alert("Tap the play button again to start the music!");
    });
  } else {
    song.pause();
    musicButton.textContent = "Play Music";
  }
});

// 🎁 Show surprise (stickers, confetti, typing)
window.showSurprise = function() {
  const surpriseDiv = document.getElementById("surprise");
  surpriseDiv.style.display = "block";

  // Animate stickers
  const stickers = document.querySelectorAll(".sticker");
  stickers.forEach((sticker, index) => {
    setTimeout(() => {
      sticker.classList.add("pop");

      const vHint = sticker.querySelector('.vStickerHint');
      if (vHint) {
        setTimeout(() => {
          vHint.style.opacity = 1;
          vHint.style.transform = "translateY(-50%) translateX(0)";
          setTimeout(() => vHint.classList.add("pulse"), 1000);
        }, 500);
      }
    }, index * 300);
  });

  // Launch confetti
  launchConfetti();

  // Start typing effect
  typeText();
}

// 💖 Hearts animation
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  const startX = Math.random() * window.innerWidth;
  const swayAmplitude = 30 + Math.random() * 20;
  const swaySpeed = 0.005 + Math.random() * 0.005;
  const duration = 3000 + Math.random() * 1000;

  heart.style.left = startX + "px";
  heart.style.bottom = "0px";
  heart.style.position = "fixed";
  heart.style.fontSize = "24px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = 9999;

  document.body.appendChild(heart);

  let startTime = null;
  function animateHeart(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      heart.remove();
      return;
    }

    const swayX = Math.sin(elapsed * swaySpeed * Math.PI * 2) * swayAmplitude;
    const translateY = -progress * window.innerHeight * 1.1;
    heart.style.transform = `translate(${swayX}px, ${translateY}px) scale(${1 + 0.2 * progress})`;
    heart.style.opacity = `${1 - progress}`;

    requestAnimationFrame(animateHeart);
  }

  requestAnimationFrame(animateHeart);
}
setInterval(createHeart, 250);

// 🎆 Confetti animation
function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.top = "0px";
    confetti.style.zIndex = 9999;
    confetti.style.pointerEvents = "none";
    confetti.style.borderRadius = "50%";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// 📝 Typing effect
const text = "LEVEL UP! Congrats on completing level 13 and good luck on 14!";
let index = 0;
function typeText() {
  if (index < text.length) {
    document.getElementById("message").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 50);
  }
}

// 🎵 V Sticker (click to play sound + mini hearts/confetti)
const vSticker = document.querySelector('img[alt="Max Verstappen"]');
const vSound = document.getElementById("vSound");
let vPlaying = false;

vSticker.addEventListener("click", () => {
  if (!vPlaying) {
    vSound.currentTime = 0;
    vSound.play().catch(err => console.log("V Sticker audio blocked:", err));
    vPlaying = true;
  } else {
    vSound.pause();
    vPlaying = false;
  }

  vSticker.classList.add("sticker-pop");
  setTimeout(() => vSticker.classList.remove("sticker-pop"), 600);

  spawnStickerHearts();
  spawnStickerConfetti();
});

// Helper: spawn mini hearts
function spawnStickerHearts() {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    const rect = vSticker.getBoundingClientRect();
    heart.style.left = rect.left + rect.width/2 + "px";
    heart.style.top = rect.top + "px";
    heart.style.position = "fixed";
    heart.style.fontSize = "16px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = 9999;

    const duration = 1000 + Math.random() * 500;
    const swayAmplitude = 20 + Math.random() * 10;
    const swaySpeed = 0.01 + Math.random() * 0.01;
    let startTime = null;

    function animateHeart(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      if (progress >= 1) { heart.remove(); return; }

      const swayX = Math.sin(elapsed * swaySpeed * Math.PI * 2) * swayAmplitude;
      const translateY = -progress * 100;
      heart.style.transform = `translate(${swayX}px, ${translateY}px) scale(${1 + 0.2*progress})`;
      heart.style.opacity = `${1 - progress}`;
      requestAnimationFrame(animateHeart);
    }

    requestAnimationFrame(animateHeart);
  }
}

// Helper: spawn mini confetti
function spawnStickerConfetti() {
  for (let i = 0; i < 5; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    const rect = vSticker.getBoundingClientRect();
    confetti.style.left = rect.left + Math.random() * rect.width + "px";
    confetti.style.top = rect.top + "px";
    confetti.style.width = "6px";
    confetti.style.height = "6px";
    confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 75%)`;
    confetti.style.position = "fixed";
    confetti.style.zIndex = 9999;
    confetti.style.pointerEvents = "none";
    confetti.style.borderRadius = "50%";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
  }
}

// Warn button sound (with staged messages)
const warnBtn = document.getElementById("warnBtn");
const cSound = document.getElementById("cSound");
let stage = 0;
let isPlaying = false;

warnBtn.addEventListener("click", () => {
  if (isPlaying) {
    cSound.pause();
    cSound.currentTime = 0;
    isPlaying = false;
    warnBtn.innerText = "ok chill 😭 (dont click again)";
    return;
  }

  stage++;
  const messages = ["serious, don't", "bro stop", "last warning...", "welp 🤭"];
  if (stage <= messages.length) warnBtn.innerText = messages[stage-1];

  if (stage === 4) {
    setTimeout(() => {
      cSound.currentTime = 0;
      cSound.play().catch(err => console.log("Warn audio blocked:", err));
      isPlaying = true;
    }, 300);
  }
});

// Sticker text popups
function showStickerTextTop(stickerId, text, color="#ff4081", yOffset=-10) {
  const sticker = document.getElementById(stickerId);
  const txt = document.createElement("span");
  txt.classList.add("stickerText");
  txt.textContent = text;
  txt.style.color = color;

  const rect = sticker.getBoundingClientRect();
  txt.style.left = rect.left + rect.width / 2 + "px";
  txt.style.top = rect.top + window.scrollY + yOffset + "px";
  txt.style.transform = "translateX(-50%) translateY(-4px)";
  document.body.appendChild(txt);

  requestAnimationFrame(() => {
    txt.style.opacity = 1;
    txt.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    txt.style.opacity = 0;
    txt.style.transform = "translateX(-50%) translateY(-4px)";
    setTimeout(() => txt.remove(), 700);
  }, 2000);
}

// Example sticker listeners
document.getElementById("mSticker").addEventListener("click", () => {
  showStickerTextTop("mSticker", "THE GOAT", "#d0b011ff", -22);
});

document.getElementById("bSticker").addEventListener("click", () => {
  showStickerTextTop("bSticker", "💙 Visca Barca ❤️", "#00529F", -10);
});