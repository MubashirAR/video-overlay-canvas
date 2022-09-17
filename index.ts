import { defaultOutputOptions } from "./constants";
import {
  InitializationError,
  Options,
  UserOptions,
  VideoOutputOptions,
  VideoSize,
  VideoSource
} from "./types";
import { calculateSize, getCanvasSize, getVideoSize } from "./utils";

export default class VideoOverlayCanvas {
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D | null;
  private sources: VideoSource[];
  private outputOptions: VideoOutputOptions;
  private stopped: boolean;

  constructor({ sources, output }: UserOptions) {
    this.sources = sources;
    this.outputOptions = output || defaultOutputOptions;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.stopped = false;
  }

  private renderFrame = () => {
    if (this.stopped) {
      this.stopped = false;
      return;
    }

    if (!this.context || !this.canvas) {
      throw new InitializationError();
    }

    const { canvas, context } = this;
    this.setCanvasSize(canvas);

    requestAnimationFrame(this.renderFrame);

    this.sources?.forEach((source: VideoSource) => {
      const { videoElement } = source;
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        // scale and horizontally center the camera image
        const { x, y } = source.position;
        let canvasSize = getCanvasSize(this.outputOptions);
        let renderSize = source.size.autoScale
          ? calculateSize(getVideoSize(source), canvasSize)
          : getVideoSize(source);

        context.drawImage(
          videoElement,
          x,
          y,
          renderSize.width,
          renderSize.height
        );
      }
    });
  };

  getCanvas = (): HTMLCanvasElement | undefined => {
    return this.canvas;
  };

  setCanvasSize = (canvas: HTMLCanvasElement) => {
    const { height, width } = getCanvasSize(this.outputOptions);

    canvas.height = height;
    canvas.width = width;
  };

  start = () => {
    this.renderFrame();
  };

  stop() {
    delete this.context;
    delete this.canvas;
  }
}
