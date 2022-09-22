# Video Overlay Canvas

This library will allow you to overlay videos (MediaStreams) on top of one another. This can be useful if you need to provision your user with a video recording feature with a camera + screen recording.

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
const sources = [
  {
    videoElement: svideoElem,
    size: {
      height: 1600,
      width: 2560,
      autoScale: true
    },
    position: 'center'
  },
  {
    videoElement: cvideoElem,
    size: {
      height: 240,
      width: 350
    },
    position: {
      x: 1350,
      y: 750
    }
  }
];
setVoc(new VideoOverlayCanvas({ sources, fps: 30 }));
```
### Get the canvas and record
```
const canvas = voc.getCanvas();
const mediaRecorder = new MediaRecorder(canvas.captureStream());
```
