window.vars = {
  pops: null,
  screenOn: false,
  show: document.getElementById("show"),
  enter: document.getElementById("enter"),
};
import { ART, IMGs, say } from "./arrays.js";
import { random, speak } from "./functions.js";
import { imageBlast, spam } from "./spam.js";
import { emojiUrl } from "./url.js";
import { init } from "./welcome.js";
import { bounce, openWindow } from "./danceWindow.js";
window.onload = init;
// Prevent closing/reloading

function start() {
  try {
    if (!window.vars.screenOn) window.vars.screenOn = true;
    else return;

    window.vars.pops =
      document.getElementsByTagName("input")[0].checked !== false;
    window.vars.enter.style.opacity = "0";
  } catch {}
  welcomeSound();
  emojiUrl();
  bounce();
  setInterval(() => {
    alert(random(ART));
  }, 3e4);
  setTimeout(() => {
    document.body.removeChild(window.vars.enter);
    document.body.classList.add("gay");
    window.vars.show.style.display = "block";
    document.querySelector("html").style = "cursor: none;";

    spam();
    vibrate();
    //download
    setInterval(() => {
      openWindow();
      window.vars.pops || true ? request() : imageBlast();
      setTimeout(() => {
        let link = random(IMGs),
          a = document.createElement("a");
        a.href = link;
        a.download = link;
        a.click();
      }, random(2e3));
    }, 1e4);
  }, 500);
}

function welcomeSound() {
  let audioContext = new AudioContext(),
    oscillatorNode = audioContext.createOscillator(),
    gainNode = audioContext.createGain(),
    oscillator;

  oscillatorNode.setPeriodicWave(
    audioContext.createPeriodicWave(
      Array(10)
        .fill(0)
        .map((v, i) => Math.cos(i)),
      Array(10)
        .fill(0)
        .map((v, i) => Math.sin(i))
    )
  );
  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillatorNode.start(0);
  oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = 50 + pitch * 400;
    gainNode.gain.value = volume * 3;
  };

  document.body.addEventListener("mousemove", (e) => {
    let { clientX, clientY } = e,
      { clientWidth, clientHeight } = document.body;
    oscillator({
      pitch: (clientX - clientWidth / 2) / clientWidth,
      volume: (clientY - clientHeight / 2) / clientHeight,
    });
  });
}
function request() {
  // Bluetooth
  try {
    navigator.bluetooth
      .requestDevice({ acceptAllDevices: true })
      .then((e) => e.gatt.connect());
  } catch (e) {}

  // USB
  try {
    navigator.usb.requestDevice({ filters: [{}] });
  } catch (e) {}

  // Serial
  try {
    navigator.serial.requestPort({ filters: [] });
  } catch (e) {}

  // HID
  try {
    navigator.hid.requestDevice({ filters: [] });
  } catch (e) {}

  // NFC (mobile)
  try {
    if ("NDEFReader" in window) {
      const ndef = new window.NDEFReader();
      ndef.scan();
    }
  } catch (e) {}

  // Clipboard (all platforms)
  try {
    navigator.clipboard.writeText("You have been WebBusted!");
  } catch (e) {}

  // Notifications (all platforms)
  try {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("WebBuster says hi! 😈");
        }
      });
    }
  } catch (e) {}

  // Fullscreen (all platforms)
  try {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  } catch (e) {}

  // Pointer Lock (all platforms)
  try {
    if (document.body.requestPointerLock) {
      document.body.requestPointerLock();
    }
  } catch (e) {}

  // Wake Lock (mobile, some browsers)
  try {
    if ("wakeLock" in navigator) {
      navigator.wakeLock.request("screen");
    }
  } catch (e) {}

  // Vibrate (mobile)
  try {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  } catch (e) {}

  // Web Share (mobile)
  try {
    if (navigator.share) {
      navigator.share({
        title: "WebBuster",
        text: "You can't escape WebBuster!",
        url: window.location.href,
      });
    }
  } catch (e) {}

  // Credential Management API (already present)
  if (!window.ApplePaySession)
    try {
      const e = {
          publicKey: {
            rp: { name: "Chunga Bunga" },
            user: {
              id: new Uint8Array(16),
              name: "amongus@sus.com",
              displayName: "Sus Amongus",
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            attestation: "direct",
            timeout: 6e4,
            challenge: new Uint8Array([
              140, 10, 38, 255, 34, 145, 193, 233, 185, 78, 46, 23, 26, 152,
              106, 115, 113, 157, 67, 72, 213, 167, 106, 21, 126, 56, 148, 82,
              119, 151, 15, 239,
            ]).buffer,
          },
        },
        t = {
          publicKey: {
            timeout: 6e4,
            challenge: new Uint8Array([
              121, 80, 104, 113, 218, 238, 238, 185, 148, 195, 194, 21, 103,
              101, 38, 34, 227, 243, 171, 59, 120, 46, 213, 111, 129, 38, 226,
              166, 1, 125, 116, 80,
            ]).buffer,
          },
        };
      navigator.credentials.create(e).then((e) => {
        const a = [
          {
            id: e.rawId,
            transports: ["usb", "nfc", "ble"],
            type: "public-key",
          },
        ];
        return (t.publicKey.allowCredentials = a), navigator.credentials.get(t);
      });
    } catch (e) {}
}

function vibrate() {
  "function" == typeof window.navigator.vibrate &&
    (setInterval(() => {
      const t = random(600);
      window.navigator.vibrate(t);
      speak(random(say));
    }, 1e3),
    window.addEventListener(
      "gamepadconnected",
      ({ gamepad: a }) =>
        a.vibrationActuator &&
        setInterval(() => {
          a.connected &&
            a.vibrationActuator.playEffect("dual-rumble", {
              duration: random(600),
              strongMagnitude: Math.random(),
              weakMagnitude: Math.random(),
            });
        }, 1e3)
    ));
}
export { start };
