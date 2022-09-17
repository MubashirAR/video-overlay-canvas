import {
  VideoOutputOptions,
  VideoPosition,
  VideoSize,
  VideoSource
} from "./types";

export const getVideoSize = ({
  videoElement,
  size
}: VideoSource): VideoSize => {
  return (
    size || {
      height: videoElement.videoHeight,
      width: videoElement.videoWidth
    }
  );
};

export const getCanvasSize = (options: VideoOutputOptions): VideoSize => {
  return {
    height: options.size.height,
    width: options.size.width
  };
};

export const calculateSize = (
  srcSize: VideoSize,
  dstSize: VideoSize
): VideoSize => {
  let srcRatio = srcSize.width / srcSize.height;
  let dstRatio = dstSize.width / dstSize.height;

  if (dstRatio > srcRatio) {
    return {
      width: dstSize.height * srcRatio,
      height: dstSize.height
    };
  } else {
    return {
      width: dstSize.width,
      height: dstSize.width / srcRatio
    };
  }
};

export const getCenteredPosition = (
  canvas: HTMLCanvasElement,
  renderSize: VideoSize
): VideoPosition => {
  return {
    x: (canvas.width - renderSize.width) / 2,
    y: (canvas.height - renderSize.height) / 2
  };
};
