// 🎵 Music play/pause
const musicButton = document.querySelector("button[onclick='playMusic()']");
window.playMusic = function() {
  const song = document.getElementById("bdaySong");
  if (song.paused) {
    song.play().catch(err => console.log("Audio play error:", err));
    musicButton.textContent = "Pause Music";
  } else {
    song.pause();
    musicButton.textContent = "Play Music";
  }
}

// 🎁 Show surprise (stickers, confetti, typing)
window.showSurprise = function() {
  const surpriseDiv = document.getElementById("surprise");
  surpriseDiv.style.display = "block";

  // Animate stickers
  const stickers = document.querySelectorAll(".sticker");
  stickers.forEach((sticker, index) => {
    setTimeout(() => {
      sticker.classList.add("pop");
    }, index * 300); // stagger pop
// select hint
const vHint = document.querySelector('.vStickerHint');

// small delay for dramatic effect
setTimeout(() => {
  // trigger transition
  vHint.style.opacity = 1;
  vHint.style.transform = "translateY(-50%) translateX(0)";

  // after fade-in, start subtle pulse
  setTimeout(() => {
    vHint.classList.add("pulse");
  }, 1000); // wait until fade/slide finishes
}, 500); // 500ms after reveal surprise clicked

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

// spawn hearts continuously
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

// 🎵 Interactive V sticker with toggle sound + pop + mini hearts/confetti
const vSticker = document.querySelector('img[alt="Max Verstappen"]');
const vSound = document.getElementById("vSound");
let vPlaying = false;

vSticker.addEventListener("click", () => {
  // toggle play/pause
  if (!vPlaying) {
    vSound.currentTime = 0;
    vSound.play().catch(err => console.log("Audio play error:", err));
    vPlaying = true;
  } else {
    vSound.pause();
    vPlaying = false;
  }

  // Add pop + wobble animation
  vSticker.classList.add("sticker-pop");
  setTimeout(() => vSticker.classList.remove("sticker-pop"), 600);

  // Spawn mini hearts from sticker
  spawnStickerHearts();

  // Spawn mini confetti from sticker
  spawnStickerConfetti();


  // Spawn mini hearts + mini confetti (your existing code)
  spawnStickerHearts();
  spawnStickerConfetti();
});

  // spawn mini hearts from sticker
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
    document.body.appendChild(heart);

    let startTime = null;
    const duration = 1000 + Math.random() * 500;
    const swayAmplitude = 20 + Math.random() * 10;
    const swaySpeed = 0.01 + Math.random() * 0.01;

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

  // small confetti from sticker
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
const warnBtn = document.getElementById("warnBtn");
const cSound = document.getElementById("cSound");

let stage = 0;
let isPlaying = false;


warnBtn.addEventListener("click", () => {

  // if sound is playing → STOP everything
  if (isPlaying) {
    cSound.pause();
    cSound.currentTime = 0;
    isPlaying = false;

    warnBtn.innerText = "ok chill 😭 (dont click again)";
    return;
  }

  stage++;

  if (stage === 1) {
    warnBtn.innerText = "serious, don't";
  } 
  else if (stage === 2) {
    warnBtn.innerText = "bro stop";
  } 
  else if (stage === 3) {
    warnBtn.innerText = "last warning...";
  } 
  else {
    warnBtn.innerText = "welp 🤭";

    setTimeout(() => {
      cSound.currentTime = 0;
      cSound.play().catch(err => console.log(err));
      isPlaying = true;
    }, 300);

  }
});
function showStickerTextTop(stickerId, text, color="#ff4081", yOffset=-10) {
  const sticker = document.getElementById(stickerId);

  // create text element
  const txt = document.createElement("span");
  txt.classList.add("stickerText");
  txt.textContent = text;
  txt.style.color = color;

  // get sticker position + scroll offset
  const rect = sticker.getBoundingClientRect();
  txt.style.left = rect.left + rect.width / 2 + "px"; // horizontal center
  txt.style.top = rect.top + window.scrollY + yOffset + "px"; // adjusted offset
  txt.style.transform = "translateX(-50%) translateY(-4px)"; // tiny slide-in

  document.body.appendChild(txt);

  // fade in + slide down slightly
  requestAnimationFrame(() => {
    txt.style.opacity = 1;
    txt.style.transform = "translateX(-50%) translateY(0)";
  });

  // fade out after 2 seconds
  setTimeout(() => {
    txt.style.opacity = 0;
    txt.style.transform = "translateX(-50%) translateY(-4px)";
    setTimeout(() => txt.remove(), 700);
  }, 2000);
}

// Messi — bigger negative offset to lift text higher
document.getElementById("mSticker").addEventListener("click", () => {
  showStickerTextTop("mSticker", "THE GOAT", "#d0b011ff", -22);
});

// Barcelona logo — smaller offset
document.getElementById("bSticker").addEventListener("click", () => {
  showStickerTextTop("bSticker", "💙 Visca Barca ❤️", "#00529F", -10);
});