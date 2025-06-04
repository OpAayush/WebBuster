import { random } from "./functions.js";
import { IMGs, AUDs, VIDs } from "./arrays.js";
import { openWindow } from "./danceWindow.js";

const meta = document.querySelector("meta.theme-color");

function spam() {
  page();
  audVid();
  titleHell();
  invertHell();
  cursorChaos();
  emojiRain();
  autoScroll();
  fakeContextMenu();
}

function audVid() {
  for (let i = 1; i < 100; i++) {
    imageBlast();

    const audio = document.createElement("audio");
    const video = document.createElement("video");

    audio.src = random(AUDs);
    audio.autoplay = true;
    audio.loop = true;

    video.src = random(VIDs);
    video.autoplay = true;
    video.loop = true;

    video.style = `
      position: fixed;
      top: ${Math.random() * 90}vh;
      right: ${Math.random() * 90}vw;
      z-index: 999999;
      transform: rotate(${Math.random() * 360}deg);
      width: ${Math.random() * 300 + 100}px;
    `;

    setTimeout(() => openWindow(), random(5000));
    setTimeout(() => document.body.appendChild(video), random(3000));
    setTimeout(() => document.body.appendChild(audio), 800);
  }
}

function imageBlast() {
  const img = document.createElement("img");
  img.src = random(IMGs);
  img.style = `
    position: fixed;
    width: ${Math.random() * 100 + 20}px;
    top: ${Math.random() * 100}vh;
    right: ${Math.random() * 100}vw;
    transform: rotate(${Math.random() * 360}deg);
    z-index: 9999;
  `;
  setTimeout(() => document.body.appendChild(img), random(3000));
}

function page() {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, "", window.location.pathname + "?sus=" + i);
  }

  setInterval(() => {
    const hex = random(0xffffff).toString(16).padStart(6, "0");
    meta.setAttribute("content", "#" + hex);
  }, 100);
}

// 🚨 Bonus Chaos Below

function titleHell() {
  const titles = [
    "😵‍💫 LOL",
    "🚨 CRASHING",
    "💀 SYSTEM ERROR",
    "🤣 Among Sus!",
    "🔥 100% CPU",
  ];
  const favicons = ["/amongus.ico", "/sus.ico", "/virus.ico", "/skull.ico"];

  let toggle = false;
  setInterval(() => {
    document.title = random(titles);
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.href = random(favicons);
    document.head.appendChild(link);
    toggle = !toggle;
  }, 300);
}

function invertHell() {
  setInterval(() => {
    document.body.style.filter = `invert(${Math.round(
      Math.random()
    )}) hue-rotate(${random(360)}deg)`;
  }, 500);
}

function cursorChaos() {
  const cursors = [
    "crosshair",
    "pointer",
    "wait",
    "text",
    "none",
    "alias",
    "grab",
    "zoom-in",
  ];
  setInterval(() => {
    document.body.style.cursor = random(cursors);
  }, 800);
}

function emojiRain() {
  const emojis = ["😂", "💀", "🗿", "🧠", "🐸", "🍆", "🌈", "🚽", "🛸"];
  setInterval(() => {
    const span = document.createElement("span");
    span.textContent = random(emojis);
    span.style = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -50px;
      font-size: ${Math.random() * 50 + 20}px;
      animation: fall 2s linear forwards;
      z-index: 99999;
    `;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 3000);
  }, 100);
}

function autoScroll() {
  setInterval(() => {
    window.scrollBy(0, Math.random() > 0.5 ? 10 : -10);
  }, 50);
}

function fakeContextMenu() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const div = document.createElement("div");
    div.innerText = "💥 Right Click Detected 💥";
    div.style = `
      position: fixed;
      top: ${e.clientY}px;
      left: ${e.clientX}px;
      padding: 5px 10px;
      background: red;
      color: white;
      font-weight: bold;
      font-size: 14px;
      border-radius: 5px;
      z-index: 100000;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
  });
}

export { imageBlast, spam };
