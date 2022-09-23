# Video Overlay Canvas

This library will allow you to overlay videos (MediaStreams) on top of one another using a canvas. This can be useful if you need to provision your user with a video recording feature with a camera + screen recording.

## Advantages
- Easy to setup
- Client side merging, server just needs to store the file
- Uses standard web APIs like [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) and [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) APIs

## Disadvantages
- Not suitable if your audience is primarily video nerds. Painting on canvas and recording it is not an efficient process and can lead to loss in video quality and framerate (specially under high load).
- The `requestAnimationFrame()` function does not get called when your browser tab is not in view. On the flip-side, the `setInterval()` implementation may sometimes lead to choppy videos (particularly during high load) since the frames are not painted at the same time as the screen

## Usage
### Create a canvas

```
const camera = await navigator.mediaDevices.getUserMedia();
const screen = await navigator.mediaDevices.getDeviceMedia();

const cvideoElem = document.createElement('video');
cVideoElem.srcObject = camera;
cVideoElem.autoplay = true;

const svideoElem = document.createElement('video');
sVideoElem.srcObject = screen;
sVideoElem.autoplay = true;

const sources: VideoSource[] = [
  {
    videoElement: sVideoElem,
    size: {
      height: 1600,
      width: 2560,
      autoScale: true // Fit inside the canvas while maintaining aspect ratio
    },
    position: VideoAlignment.CENTER // If aspect ratio doesn't match, align the video in the center of the canvas
  },
  {
    videoElement: cvideoElem,
    size: {
      height: 240,
      width: 350
    },
    position: { // You can also provide pixel position
      x: 1350,
      y: 750
    }
  }
];
const output = {
  size: { // Canvas and output video size, defaults to 1080p
    height: 1080,
    width: 1920
  }
}
new VideoOverlayCanvas({ sources, fps: 30, output });
```
### Get the canvas and record
```
const mediaRecorder = new MediaRecorder(voc.getCanvasStream());
mediaRecorder.start();
```

## Things to keep in mind
1. Aspect ratio to be painted should be the same as the original aspect ratio of the video. Failing to do this would cripple performance.
2. If the browser is minimized or is on a different desktop, the framerate drops significantly. You might want to consider using web workers with [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) instead.
