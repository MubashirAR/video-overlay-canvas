# Video Overlay Canvas

This library will allow you to overlay videos (MediaStreams) on top of one another. This can be useful if you need to provision your user with a video recording feature with a camera + screen recording.

## Advantages
- Easy to setup
- Client side merging, server just needs to store the file
- Uses standard web APIs like [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) and [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) APIs

## Disadvantages
- Not suitable if your audience is primarily video nerds. Painting on canvas and recording it is not an efficient process and can lead to loss in video quality and framerate (specially under high load).
- The `requestAnimationFrame()` function does not get called when you are on a different tab in the same browser window. On the flip-side, the `setInterval()` implementation may sometimes lead to choppy videos (particularly during high load) since the frames are not painted at the same time as the screen
