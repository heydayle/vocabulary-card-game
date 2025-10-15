import { useCallback } from 'react';

const getVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang.startsWith('en'));
  return englishVoice ?? voices[0];
};

export const useSpeech = () => {
  return useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);
};
