import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const getEnglishVoice = (voices: SpeechSynthesisVoice[]) => {
  const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));
  return englishVoice ?? voices[0] ?? null;
};

const createFallbackUrl = (text: string, language: string) => {
  const params = new URLSearchParams({
    ie: 'UTF-8',
    q: text,
    tl: language,
    client: 'tw-ob'
  });
  return `https://translate.googleapis.com/translate_tts?${params.toString()}`;
};

export const useSpeech = () => {
  const [supportsSpeech, setSupportsSpeech] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const language = useMemo(() => 'en-US', []);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canUseSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    setSupportsSpeech(canUseSpeech);
    if (!canUseSpeech) {
      return;
    }

    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        return;
      }
      voiceRef.current = getEnglishVoice(voices);
    };

    assignVoice();

    if (typeof window.speechSynthesis.addEventListener === 'function') {
      window.speechSynthesis.addEventListener('voiceschanged', assignVoice);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', assignVoice);
      };
    }

    const originalHandler = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = assignVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = originalHandler;
    };
  }, []);

  return useCallback(
    (text: string) => {
      if (!text) {
        return;
      }

      if (supportsSpeech && typeof window !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voiceRef.current;
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = language;
        }
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        return;
      }

      const url = createFallbackUrl(text, language);
      audioRef.current?.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      void audio.play();
    },
    [language, supportsSpeech]
  );
};
