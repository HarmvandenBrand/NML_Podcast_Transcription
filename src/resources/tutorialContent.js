import bottomNavImg from './bottomnav.png';
import focusmodeVideo from './focusmode.mp4';
import audioToTextVideo from './audio-to-text.mp4';
import textToAudioVideo from './text-to-audio.mp4';

// Template:
// const tutorial = {
//   heading: "",
//   body: ``,
//   img: null,
//   vidSrc: null,
// }

const tutorial1 = {
  heading: "Introduction",
  body: `A quick tutorial will follow to show you how to use the app.
        The 'Listen Now' page with the audioplayer and transcript will 
        be the main focus to showcase the different ways that you can
        navigate through the podcast. Click NEXT when you are ready
        to move on. When you have reached the end of the tutorial,
        you can click on FINISH to go to the app.`,
  img: bottomNavImg,
  vidSrc: null,
}

const tutorial2 = {
  heading: "Focus Mode",
  body: `Focus mode is enabled when the floating button at the bottom right,
        just above the audioplayer, is colored orange. When focus mode is active, 
        the transcript will autoscroll in sync with the audio. To disable 
        focus mode, simply scroll or click on the floating button. The button will be 
        grey when disabled. Clicking on the floating button when disabled will enable 
        focus mode again and scroll you to the position at which the transcript 
        is currently highlighted.`,
  img: null,
  vidSrc: focusmodeVideo,
}

const tutorial3 = {
  heading: "Audio Navigation",
  body: `You can navigate through the podcast with the progress bar like any other 
        traditional audioplayer. This will scroll the transcript to the appropriate
        position at which the audio is currently playing.`,
  img: null,
  vidSrc: audioToTextVideo,
}

const tutorial4 = {
  heading: "Transcript Navigation",
  body: `The transcript also allows you to navigate through the podcast. Clicking on
        a sentence in the transcript will bring the audio to that point.`,
  img: null,
  vidSrc: textToAudioVideo,
}

const tutorials = [tutorial1, tutorial2, tutorial3, tutorial4];

export default tutorials;