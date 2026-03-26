import { useEffect, useRef } from "react";

export function useAlertTone(status) {
  const lastStatus = useRef("");

  useEffect(() => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      return;
    }

    if (status === "SAFE" || status === lastStatus.current) {
      lastStatus.current = status;
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = status === "DANGER" ? "sawtooth" : "triangle";
    oscillator.frequency.value = status === "DANGER" ? 880 : 660;
    gainNode.gain.value = 0.04;

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.35);
    oscillator.onended = () => context.close();

    lastStatus.current = status;
  }, [status]);
}
