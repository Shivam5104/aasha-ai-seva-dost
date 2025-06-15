// Text-to-speech service using ElevenLabs
class TextToSpeechService {
  private apiKey: string | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async speak(text: string, voiceId: string = 'EXAVITQu4vr4xnSDxMaL') {
    this.stop(); // Stop any previous audio before starting a new one

    if (!this.apiKey) {
      console.log('TTS Demo Mode:', text);
      // Fallback to browser's speech synthesis for demo
      if ('speechSynthesis' in window) {
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.rate = 0.8;
        this.utterance.pitch = 1;
        speechSynthesis.speak(this.utterance);
      }
      return;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.play();
      }
    } catch (error) {
      console.error('TTS Error:', error);
      // Fallback to browser speech
      if ('speechSynthesis' in window) {
        this.utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(this.utterance);
      }
    }
  }

  stop() {
    // Stop ElevenLabs audio playback
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    // Stop browser TTS (SpeechSynthesis)
    if ('speechSynthesis' in window && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    this.utterance = null;
  }
}

export const ttsService = new TextToSpeechService();
