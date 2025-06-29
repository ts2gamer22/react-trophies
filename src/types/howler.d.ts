/**
 * Type declaration for howler.js
 */
declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      html5?: boolean;
      preload?: boolean;
      autoplay?: boolean;
      loop?: boolean;
      volume?: number;
      onload?: () => void;
      onloaderror?: (id: number, error: any) => void;
      onplay?: (id: number) => void;
      onend?: (id: number) => void;
      onpause?: (id: number) => void;
      onstop?: (id: number) => void;
      onmute?: (id: number) => void;
      onvolume?: (id: number) => void;
      onrate?: (id: number) => void;
      onseek?: (id: number) => void;
      onfade?: (id: number) => void;
    });
    
    play(spriteOrId?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    mute(muted?: boolean, id?: number): this | boolean;
    volume(vol?: number, id?: number): this | number;
    fade(from: number, to: number, duration: number, id?: number): this;
    rate(rate?: number, id?: number): this | number;
    seek(seek?: number, id?: number): this | number;
    loop(loop?: boolean, id?: number): this | boolean;
    state(): 'unloaded' | 'loading' | 'loaded';
    playing(id?: number): boolean;
    duration(id?: number): number;
    on(event: string, fn: Function, id?: number): this;
    once(event: string, fn: Function, id?: number): this;
    off(event: string, fn?: Function, id?: number): this;
    load(): this;
    unload(): void;
  }
  
  export class Howler {
    static volume(vol?: number): number | this;
    static mute(muted?: boolean): boolean | this;
    static stop(): this;
    static ctx: AudioContext;
  }
}
