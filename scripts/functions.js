export function random(arr) {
  let out;
  typeof arr == "number"
    ? (out = Math.floor(Math.random() * arr))
    : (out = arr[Math.floor(Math.random() * arr.length)]);
  return out;
}
const utteranceCache = new Map();

export function speak(text) {
  // Cancel any ongoing speech immediately to prevent overlap
  window.speechSynthesis.cancel();

  // Get cached utterance or create a new one
  let utterance = utteranceCache.get(text);
  if (!utterance) {
    utterance = new SpeechSynthesisUtterance(text);
    utteranceCache.set(text, utterance);
  } else {
    // Reassign text for safety if text somehow changed
    utterance.text = text;
  }

  // Apply chaotic random pitch, rate, and volume
  utterance.pitch = Math.random() * 2; // 0.0 to 2.0 (chaotic)
  utterance.rate = 0.5 + Math.random() * 2.5; // 0.5 to 3.0 (chaotic speed)
  utterance.volume = 0.5 + Math.random() * 0.5; // 0.5 to 1.0 volume

  // Random glitch delay between 0-500ms before speaking
  const delay = Math.floor(Math.random() * 500);

  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, delay);
}
