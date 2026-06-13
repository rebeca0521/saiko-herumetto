// Retro 8-bit audio synthesizer using the Web Audio API
class RetroAudio {
  constructor() {
    this.ctx = null;
    this.melodyInterval = null;
    this.currentSources = [];
    this.globalGain = null;
    this.isPlayingMelody = false;
    this.tempo = 120; // BPM
    this.volume = 0.15; // default volume
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.globalGain = this.ctx.createGain();
    this.globalGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.globalGain.connect(this.ctx.destination);
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.globalGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playEnter() {
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;
      const duration = 0.15;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      osc.connect(gain);
      gain.connect(this.globalGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  playGodVoice() {
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 3.0;

    // Base deep frequency
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const mainGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(80, now); // 80Hz base
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(80.5, now); // slightly detuned for chorus effect

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6, now); // 6Hz modulation
    
    lfoGain.gain.setValueAtTime(10, now); // Pitch modulation range +/- 10Hz

    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.6, now + 0.2);
    mainGain.gain.linearRampToValueAtTime(0.6, now + duration - 0.5);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Wire up LFO to modulate osc1 and osc2 frequency
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);

    osc1.connect(mainGain);
    osc2.connect(mainGain);
    mainGain.connect(this.globalGain);

    lfo.start(now);
    osc1.start(now);
    osc2.start(now);

    lfo.stop(now + duration);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  startMelody() {
    this.resume();
    if (!this.ctx || this.isPlayingMelody) return;
    this.isPlayingMelody = true;

    // Simple 8-bit arpeggiated loop
    // Progression: Am - F - C - G
    const chords = [
      [220.00, 261.63, 329.63, 440.00], // Am: A3, C4, E4, A4
      [174.61, 220.00, 261.63, 349.23], // F:  F3, A3, C4, F4
      [261.63, 329.63, 392.00, 523.25], // C:  C4, E4, G4, C5
      [196.00, 246.94, 293.66, 392.00]  // G:  G3, B3, D4, G4
    ];

    let step = 0;
    const noteLength = 60 / this.tempo / 2; // eighth notes

    const scheduleNextBeats = () => {
      if (!this.isPlayingMelody || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Find current chord index (Am -> F -> C -> G, 8 beats each)
      const chordIdx = Math.floor(step / 8) % chords.length;
      const chord = chords[chordIdx];
      
      // Determine note within the chord based on arpeggio pattern
      const notePattern = [0, 1, 2, 3, 2, 1, 0, 3];
      const noteIdx = notePattern[step % 8];
      const freq = chord[noteIdx];

      // Schedule note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + noteLength - 0.02);

      osc.connect(gain);
      gain.connect(this.globalGain);

      osc.start(now);
      osc.stop(now + noteLength);

      // Add a subtle bass note on beat 0 of each chord change
      if (step % 8 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sawtooth';
        // Base note is two octaves down
        bassOsc.frequency.setValueAtTime(chord[0] / 2, now);
        
        bassGain.gain.setValueAtTime(0, now);
        bassGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + noteLength * 4);

        // Simple low pass filter for the bass
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);

        bassOsc.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.globalGain);

        bassOsc.start(now);
        bassOsc.stop(now + noteLength * 4);
      }

      step = (step + 1) % 32;
    };

    // Schedule immediately then run on interval
    this.ctx.resume();
    scheduleNextBeats();
    this.melodyInterval = setInterval(scheduleNextBeats, noteLength * 1000);
  }

  stopMelody() {
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    this.isPlayingMelody = false;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.globalGain && this.ctx) {
      this.globalGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const retroAudio = new RetroAudio();
