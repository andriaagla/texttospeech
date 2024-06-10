let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.querySelector("select");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;

        option.value = i;
        voiceSelect.appendChild(option);
    });

    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    const selectedVoiceIndex = voiceSelect.selectedOptions[0].value;
    speech.voice = voices[selectedVoiceIndex];
    window.speechSynthesis.speak(speech);
});
