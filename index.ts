import { defaultOutputOptions } from "./constants";
import {
  InitializationError,
  UserOptions,
  VideoAlignment,
  VideoOutputOptions,
  VideoPosition,
  VideoSource
} from "./types";
import {
  calculateSize,
  getCanvasSize,
  getCenteredPosition,
  getVideoSize
} from "./utils";

export default class VideoOverlayCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private sources: VideoSource[];
  private outputOptions: VideoOutputOptions;
  private stopped: boolean;

  constructor({ sources, output }: UserOptions) {
    this.sources = sources;
    this.outputOptions = output || defaultOutputOptions;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.stopped = true;
  }

  private renderFrame = () => {
    if (this.stopped) {
      return;
    }

    if (!this.context || !this.canvas) {
      throw new InitializationError();
    }

    const { canvas, context } = this;
    this.setCanvasSize(canvas);

    requestAnimationFrame(this.renderFrame);

    this.sources?.forEach((source: VideoSource) => {
      this.attachSource(context, source);
    });
  };

  private attachSource(context: CanvasRenderingContext2D, source: VideoSource) {
    const { videoElement } = source;

    if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
      let canvasSize = getCanvasSize(this.outputOptions);
      let renderSize = source.size.autoScale
        ? calculateSize(getVideoSize(source), canvasSize)
        : getVideoSize(source);

      let position: VideoPosition;
      if (source.position === VideoAlignment.CENTER) {
        position = getCenteredPosition(this.canvas, renderSize);
      } else {
        position = source.position as VideoPosition;
      }
      const { x, y } = position;

      context.drawImage(
        videoElement,
        x,
        y,
        renderSize.width,
        renderSize.height
      );
    }
  }

  getCanvas = (): HTMLCanvasElement | undefined => {
    return this.canvas;
  };

  setCanvasSize = (canvas: HTMLCanvasElement) => {
    const { height, width } = getCanvasSize(this.outputOptions);

    canvas.height = height;
    canvas.width = width;
  };

  start = () => {
    this.stopped = false;
    this.renderFrame();
  };

  stop() {
    this.stopped = true;
  }
}
// TODO: Add support for setInterval
// TODO: Add support for MediaStreams
