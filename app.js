const btn = document.getElementById('btn-speak');
const txtin = document.getElementById('text-input');
const voiceList = document.getElementById('voiceList');
const synth = window.speechSynthesis;
let voices = [];

populateVoices();

if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

btn.addEventListener('click',  () => {
  let toSpeak = new SpeechSynthesisUtterance(txtin.value);
  let selectedVoiceName = voiceList.selectedOptions[0].getAttribute(
    'data-name'
  );
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
});

function populateVoices() {
  voices = synth.getVoices();
  voiceList.innerHTML = '';
  voices.forEach((voice) => {
    let listItem = document.createElement('option');
    listItem.textContent = voice.name;
    listItem.setAttribute('data-lang', voice.lang);
    listItem.setAttribute('data-name', voice.name);
    voiceList.appendChild(listItem);
  });
}