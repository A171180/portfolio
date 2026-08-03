import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tiny WebAudio ambience: a soft filtered-noise "paper/rain" bed plus
 * one-shot page-turn and pen-scratch textures. No audio files needed.
 */
export function useAmbience() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const bedRef = useRef<{ src: AudioBufferSourceNode; gain: GainNode } | null>(null);

  const ctx = useCallback(() => {
    if (!ctxRef.current && typeof window !== "undefined") {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  }, []);

  const noiseBuffer = useCallback((c: AudioContext) => {
    const buf = c.createBuffer(1, c.sampleRate * 3, c.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    return buf;
  }, []);

  const startBed = useCallback(
    (rain: boolean) => {
      const c = ctx();
      if (!c) return;
      bedRef.current?.src.stop();
      const src = c.createBufferSource();
      src.buffer = noiseBuffer(c);
      src.loop = true;
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = rain ? 1400 : 620;
      const gain = c.createGain();
      gain.gain.value = 0.0;
      src.connect(filter).connect(gain).connect(c.destination);
      src.start();
      gain.gain.linearRampToValueAtTime(rain ? 0.06 : 0.035, c.currentTime + 2);
      bedRef.current = { src, gain };
    },
    [ctx, noiseBuffer],
  );

  const stopBed = useCallback(() => {
    bedRef.current?.src.stop();
    bedRef.current = null;
  }, []);

  const blip = useCallback(
    (freq: number, dur: number, type: OscillatorType = "sine") => {
      if (muted) return;
      const c = ctx();
      if (!c) return;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0.0001;
      gain.gain.exponentialRampToValueAtTime(0.08, c.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      osc.connect(gain).connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + dur + 0.05);
    },
    [ctx, muted],
  );

  const pageTurn = useCallback(() => {
    if (muted) return;
    const c = ctx();
    if (!c) return;
    const src = c.createBufferSource();
    src.buffer = noiseBuffer(c);
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 900;
    const gain = c.createGain();
    gain.gain.value = 0.12;
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.45);
    src.connect(filter).connect(gain).connect(c.destination);
    src.start();
    src.stop(c.currentTime + 0.5);
  }, [ctx, muted, noiseBuffer]);

  const toggleMute = useCallback(
    (rain = false) => {
      setMuted((m) => {
        const next = !m;
        if (next) stopBed();
        else {
          ctx()?.resume();
          startBed(rain);
        }
        return next;
      });
    },
    [ctx, startBed, stopBed],
  );

  useEffect(() => () => stopBed(), [stopBed]);

  return { muted, toggleMute, pageTurn, blip, restartBed: startBed };
}
