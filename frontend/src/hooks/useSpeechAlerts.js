import { useEffect, useRef } from "react";

const messages = {
  en: (exit) => `Stampede detected. Move to Exit ${exit}.`,
  ta: (exit) => `Stampede கண்டறியப்பட்டது. Exit ${exit} நோக்கி நகரவும்.`,
  hi: (exit) => `भगदड़ का खतरा मिला है। Exit ${exit} की ओर जाएं।`,
};

const voicesByLanguage = {
  en: "en-IN",
  ta: "ta-IN",
  hi: "hi-IN",
};

export function useSpeechAlerts({ language, status, exit, enabled }) {
  const lastAnnouncement = useRef("");

  useEffect(() => {
    if (!enabled || !window.speechSynthesis || status === "SAFE") {
      return;
    }

    const utteranceText = (messages[language] || messages.en)(exit || "A");
    if (lastAnnouncement.current === utteranceText) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = voicesByLanguage[language] || "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    lastAnnouncement.current = utteranceText;
  }, [enabled, language, status, exit]);
}
