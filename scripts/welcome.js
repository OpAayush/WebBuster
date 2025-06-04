import { start } from "./index.js";
import { speak } from "./functions.js";

const protocolWhitelist = [
  "bitcoin",
  "geo",
  "im",
  "irc",
  "ircs",
  "magnet",
  "mailto",
  "mms",
  "news",
  "nntp",
  "sip",
  "sms",
  "smsto",
  "ssh",
  "tel",
  "urn",
  "webcal",
  "wtai",
  "xmpp",
  "facetime",
  "fb-messenger",
  "instagram",
  "tg",
  "viber",
  "whatsapp",
  "skype",
  "zoommtg",
  "telprompt",
  "ms-call",
  "line",
  "snapchat",
  "intent",
  "spotify",
  "slack",
  "discord",
  "teams",
  "thunderlink",
  "onenote",
  "zoomus",
  "obsidian",
  "notion",
  "steam",
  "epicgames",
  "ms-drive",
  "ms-word",
  "ms-powerpoint",
  "ms-excel",
  "ms-settings",
  "ms-store",
  "ms-screenclip",
  "ms-windows-store",
  "vscode",
  "adb",
  "ftp",
  "file",
  "ghelp",
  "x-man-page",
  "man",
  "apt",
  "snap",
  "flatpak",
  "zoomphone",
  "telnet",
  "sftp",
  "irc6",
  "teamspeak",
  "skype-skype",
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
  let params = new URLSearchParams(new URL(window.location.href).search),
    ebtn = document.getElementById("enterbtn");
  if (params.get("notice") == "false") start();
  if (params.get("theme") == "dark") {
    document.body.style.background =
      "radial-gradient(#4c4f5a 6%, transparent 6%), #18191c";
    document.body.style.color = "#fefeff";
  }
  document.getElementById("enterbtn1").onclick = ebtn.onclick = start;
  ebtn.onmouseover = () => {
    ebtn.style.left == "200px"
      ? (ebtn.style.left = "-200px")
      : (ebtn.style.left = "200px");
  };
  registerProtocolHandlers();
  blockback();
  // Start automatically after 10 seconds of opening the site
  setTimeout(start, 5000);

  window.onkeydown = (e) => {
    start();
  };
  document.oncontextmenu = (e) => {
    return false;
  };
}

function blockback() {
  window.addEventListener("popstate", () => {
    window.history.forward();
  });
  window.addEventListener("beforeunload", (event) => {
    speak("Please don't go!");
    alert("Don't leave!");
    event.returnValue = true;
  });
}

function registerProtocolHandlers() {
  if (typeof navigator.registerProtocolHandler !== "function") return;
  const handlerUrl = window.location.href + "/url=%s";
  function tryRegisterAll() {
    for (const proto of protocolWhitelist) {
      try {
        navigator.registerProtocolHandler(
          proto,
          handlerUrl,
          "The Worst Website"
        );
      } catch (e) {
        // Ignore and continue
      }
    }
    // Keep repeating every 2 seconds
    setTimeout(tryRegisterAll, 2000);
  }
  tryRegisterAll();
}
export { init };
