export interface VideoSize {
  height: number;
  width: number;
  autoScale?: boolean;
}

export enum VideoAlignment {
  CENTER = "center"
}

export interface VideoPosition {
  x: number;
  y: number;
}

export interface VideoSource {
  videoElement: HTMLVideoElement;
  size: VideoSize;
  position: VideoPosition | VideoAlignment;
}

export interface VideoOutputOptions {
  size: VideoSize;
}

export interface UserOptions {
  sources: VideoSource[];
  output?: VideoOutputOptions;
}

export interface Options extends UserOptions {
  output: VideoOutputOptions;
}

export class InitializationError extends Error {
  message: string = "Canvas was not initialized correctly";
}
