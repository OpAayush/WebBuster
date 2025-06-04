import { random } from "./functions.js";

function emojiUrl() {
  if (window.ApplePaySession) return;

  random([
    // 👶 Baby Skin Tone Wiggle
    function () {
      const tones = ["🏻", "🏼", "🏽", "🏾", "🏿"];
      setInterval(() => {
        let hash = "";
        for (let i = 0; i < 10; i++) {
          const toneIndex = Math.floor(
            tones.length * ((Math.sin(Date.now() / 100 + i) + 1) / 2)
          );
          hash += "👶" + tones[toneIndex];
        }
        window.location.hash = hash;
      }, 100);
    },

    // ░▒▓ Bars Shimmer
    function () {
      setInterval(() => {
        let hash = "";
        for (let i = 0; i < 10; i++) {
          const shade = Math.floor(4 * Math.sin(Date.now() / 200 + i / 2)) + 4;
          hash += String.fromCharCode(9601 + shade);
        }
        window.location.hash = hash;
      }, 100);
    },

    // 🌑🌕 Moon Phase Pulse
    function () {
      const phases = ["🌑", "🌘", "🌗", "🌖", "🌕", "🌔", "🌓", "🌒"];
      const index = new Array(10).fill(0);
      let direction = 0;

      setInterval(() => {
        let hash = "";
        let i = 0;
        if (direction) {
          while (i < index.length && index[i] === 0) i++;
          if (i >= index.length) direction = 0;
          else {
            index[i]++;
            if (index[i] >= phases.length) index[i] = 0;
          }
        } else {
          while (i < index.length && index[i] === 4) i++;
          if (i >= index.length) direction = 1;
          else index[i]++;
        }
        hash = index.map((j) => phases[j]).join("");
        window.location.hash = hash;
      }, 100);
    },

    // 🔥 Spinning Fire Trail
    function () {
      const fire = ["🔥", "💥", "🔥", "💢", "⚡", "💨"];
      setInterval(() => {
        let hash = "";
        const t = Date.now();
        for (let i = 0; i < 10; i++) {
          const index = Math.floor(
            ((Math.sin(t / 150 + i) + 1) * fire.length) / 2
          );
          hash += fire[index];
        }
        window.location.hash = hash;
      }, 120);
    },

    // 💀 Skull Wave of Doom
    function () {
      setInterval(() => {
        let hash = "";
        for (let i = 0; i < 8; i++) {
          const flip = Math.sin(Date.now() / 100 + i) > 0.5 ? "💀" : "☠️";
          hash += flip;
        }
        window.location.hash = hash;
      }, 100);
    },

    // 🥶🫠 Melting Ice Face Chaos
    function () {
      const emojis = ["🥶", "😨", "😰", "🥵", "🫠"];
      setInterval(() => {
        let hash = "";
        const time = Date.now();
        for (let i = 0; i < 9; i++) {
          const j = Math.floor(
            Math.abs(Math.sin(time / 300 + i)) * emojis.length
          );
          hash += emojis[j];
        }
        window.location.hash = hash;
      }, 140);
    },

    // 👁️‍🗨️ Illuminati Blink
    function () {
      const eye = ["👁️", "🔺", "🧿", "🌀", "👁️‍🗨️"];
      setInterval(() => {
        let hash = "";
        for (let i = 0; i < 7; i++) {
          const index = (i + Math.floor(Date.now() / 300)) % eye.length;
          hash += eye[index];
        }
        window.location.hash = hash;
      }, 150);
    },
  ])();
}

export { emojiUrl };
