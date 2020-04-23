/**
 * Contains the class for loading a podcast. 
 * This class requires a podcast folder location, containing an audio.mp3 file, a podcast.json file, and a description.json file.
 * This podcast class provides access to podcast information, such as the transcript, timestamps, and speaker diarization.
 */
    
class Podcast {

  constructor() {
    this.metadata = require("./podcasts/geology/salt_tectonics/description.json")
    this.transcript = require("./podcasts/geology/salt_tectonics/transcript.json");
    this.audio = './podcasts/geology/salt_tectonics/audio.mp3';
  }

}

export { Podcast };