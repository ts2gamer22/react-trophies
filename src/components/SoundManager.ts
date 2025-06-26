import { Howl } from 'howler';

/**
 * Interface for sound options
 */
export interface SoundOptions {
  /** Volume level (0.0 to 1.0) */
  volume?: number;
  /** Whether the sound should loop */
  loop?: boolean;
  /** Whether the sound should preload */
  preload?: boolean;
  /** Callback when sound is loaded */
  onload?: () => void;
  /** Callback when sound ends */
  onend?: () => void;
}

/**
 * SoundManager - Utility class for managing achievement sounds
 * Uses howler.js for cross-browser sound support
 */
class SoundManager {
  /** Collection of sound instances */
  private sounds: Record<string, Howl> = {};
  /** Whether sound is globally enabled */
  private enabled: boolean = true;
  /** Global volume level */
  private globalVolume: number = 0.5;
  /** Default sound URLs */
  private defaultSounds: Record<string, string> = {
    unlock: '/sounds/achievement-unlock.mp3',
    levelUp: '/sounds/level-up.mp3',
    notification: '/sounds/notification.mp3',
  };

  /**
   * Initialize the SoundManager with default sounds
   * @param defaultSounds - Optional custom default sounds to use
   * @param enabled - Whether sound should start enabled
   */
  constructor(defaultSounds?: Record<string, string>, enabled: boolean = true) {
    this.defaultSounds = { ...this.defaultSounds, ...defaultSounds };
    this.enabled = enabled;
    
    // Pre-register default sounds
    Object.entries(this.defaultSounds).forEach(([key, url]) => {
      this.registerSound(key, url);
    });
  }

  /**
   * Register a new sound with the manager
   * @param id - Unique identifier for the sound
   * @param url - URL or array of URLs (for fallbacks) to the sound file
   * @param options - Additional sound options
   * @returns The sound manager instance for chaining
   */
  registerSound(id: string, url: string | string[], options: SoundOptions = {}): SoundManager {
    // Create Howl instance with provided options
    this.sounds[id] = new Howl({
      src: Array.isArray(url) ? url : [url],
      volume: options.volume ?? this.globalVolume,
      loop: options.loop ?? false,
      preload: options.preload ?? true,
      onload: options.onload,
      onend: options.onend
    });
    
    return this;
  }

  /**
   * Play a registered sound
   * @param id - ID of the sound to play
   * @param volume - Optional volume override for this specific play
   * @returns Sound ID if sound was played, undefined otherwise
   */
  play(id: string, volume?: number): number | undefined {
    // Don't play if sounds are disabled or sound doesn't exist
    if (!this.enabled || !this.sounds[id]) {
      return undefined;
    }
    
    // Set volume for this play if provided
    if (volume !== undefined) {
      this.sounds[id].volume(volume);
    }
    
    // Play and return the sound ID
    return this.sounds[id].play();
  }

  /**
   * Stop a specific sound or all sounds
   * @param id - ID of sound to stop, or undefined to stop all sounds
   * @returns The sound manager instance for chaining
   */
  stop(id?: string): SoundManager {
    if (id && this.sounds[id]) {
      this.sounds[id].stop();
    } else if (!id) {
      // Stop all sounds if no ID specified
      Object.values(this.sounds).forEach(sound => sound.stop());
    }
    
    return this;
  }

  /**
   * Set the global volume for all sounds
   * @param volume - Volume level (0.0 to 1.0)
   * @returns The sound manager instance for chaining
   */
  setVolume(volume: number): SoundManager {
    // Ensure volume is within valid range
    this.globalVolume = Math.max(0, Math.min(1, volume));
    
    // Update volume for all registered sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume(this.globalVolume);
    });
    
    return this;
  }

  /**
   * Enable or disable all sounds
   * @param enabled - Whether sounds should be enabled
   * @returns The sound manager instance for chaining
   */
  setEnabled(enabled: boolean): SoundManager {
    this.enabled = enabled;
    return this;
  }

  /**
   * Check if sounds are enabled
   * @returns Whether sounds are currently enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get a list of all registered sound IDs
   * @returns Array of sound IDs
   */
  getSoundIds(): string[] {
    return Object.keys(this.sounds);
  }

  /**
   * Check if a sound with the given ID exists
   * @param id - Sound ID to check
   * @returns Whether the sound exists
   */
  hasSound(id: string): boolean {
    return !!this.sounds[id];
  }

  /**
   * Play the achievement unlock sound
   * @param volume - Optional volume override
   * @returns Sound ID if played, undefined otherwise
   */
  playUnlockSound(volume?: number): number | undefined {
    return this.play('unlock', volume);
  }
}

// Export a singleton instance for easy use throughout the application
export const soundManager = new SoundManager();

export default soundManager;
