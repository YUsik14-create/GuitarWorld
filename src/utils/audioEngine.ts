/**
 * Web Audio Engine for GuitarWorld
 * Implements Karplus-Strong physical string simulation, Tuner reference tones,
 * Metronome clicks, and interactive pedalboard FX processing.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Karplus-Strong Plucked String Synthesis
  public pluckString(freq: number, duration: number = 2.5, brightness: number = 0.8) {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const sampleRate = ctx.sampleRate;
      const period = Math.round(sampleRate / freq);
      const bufferLength = Math.max(period, 128);

      // Create burst of noise
      const buffer = ctx.createBuffer(1, bufferLength, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        // Initial noise impulse with high-frequency roll-off
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (period * 0.5));
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // Feedback delay loop simulating vibrating string
      const delayNode = ctx.createDelay(1);
      delayNode.delayTime.value = 1 / freq;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = Math.min(sampleRate / 2 - 100, freq * (4 + brightness * 8));
      filter.Q.value = 0.5;

      const feedbackGain = ctx.createGain();
      // Decay factor close to 1
      feedbackGain.gain.value = 0.988;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.4, ctx.currentTime);
      mainGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      // Wire feedback loop: Noise -> Delay -> Filter -> FeedbackGain -> Delay
      noiseNode.connect(delayNode);
      delayNode.connect(filter);
      filter.connect(feedbackGain);
      feedbackGain.connect(delayNode);

      // Wire output
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      noiseNode.start(ctx.currentTime);
      noiseNode.stop(ctx.currentTime + 0.05);

      setTimeout(() => {
        try {
          noiseNode.disconnect();
          delayNode.disconnect();
          filter.disconnect();
          feedbackGain.disconnect();
          mainGain.disconnect();
        } catch {
          // ignore cleanup
        }
      }, duration * 1000 + 200);
    } catch {
      // Audio might be blocked until user interaction
    }
  }

  // Play chord by plucking individual strings with slight humanized delay (strum)
  public strumChord(frequencies: number[], speedMs: number = 35) {
    frequencies.forEach((freq, idx) => {
      if (freq > 20) {
        setTimeout(() => {
          this.pluckString(freq, 3.0, 0.75);
        }, idx * speedMs);
      }
    });
  }

  // Reference tone for guitar tuner
  public playTunerTone(freq: number, duration: number = 2.0) {
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      //
    }
  }

  // Metronome click
  public playMetronomeClick(isAccent: boolean) {
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isAccent ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(isAccent ? 1600 : 900, ctx.currentTime);

      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      //
    }
  }

  // Test guitar sound with applied pedal effects simulation
  public playPedalboardDemo(activeEffects: string[], basePitch: number = 220) {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const duration = 2.0;

      // Source oscillator simulating an electric guitar pickup signal
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(basePitch, now);

      let lastNode: AudioNode = osc;

      // Overdrive / Distortion wave shaper
      if (activeEffects.includes('overdrive') || activeEffects.includes('distortion') || activeEffects.includes('fuzz')) {
        const shaper = ctx.createWaveShaper();
        const curve = new Float32Array(44100);
        const k = activeEffects.includes('fuzz') ? 60 : activeEffects.includes('distortion') ? 35 : 15;
        const deg = Math.PI / 180;
        for (let i = 0; i < 44100; i++) {
          const x = (i * 2) / 44100 - 1;
          curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        shaper.curve = curve;
        shaper.oversample = '4x';
        lastNode.connect(shaper);
        lastNode = shaper;
      }

      // Delay effect
      if (activeEffects.includes('delay')) {
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.28;
        const delayFeedback = ctx.createGain();
        delayFeedback.gain.value = 0.45;

        const delayMix = ctx.createGain();
        delayMix.gain.value = 0.5;

        lastNode.connect(delay);
        delay.connect(delayFeedback);
        delayFeedback.connect(delay);
        delay.connect(delayMix);
        delayMix.connect(ctx.destination);
      }

      // Chorus / Modulation effect
      if (activeEffects.includes('chorus') || activeEffects.includes('flanger')) {
        const chorusFilter = ctx.createBiquadFilter();
        chorusFilter.type = 'allpass';
        chorusFilter.frequency.value = 800;
        lastNode.connect(chorusFilter);
        lastNode = chorusFilter;
      }

      // Reverb / Cabinet simulation filter
      const cabFilter = ctx.createBiquadFilter();
      cabFilter.type = 'lowpass';
      cabFilter.frequency.value = 4200; // roll off fizz like a 12" guitar speaker
      lastNode.connect(cabFilter);
      lastNode = cabFilter;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      lastNode.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      //
    }
  }
}

export const soundEngine = new AudioEngine();
