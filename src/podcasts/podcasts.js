const podcasts = {
  
        GeologySociety: {
          'metadata': require('GeologySociety/metadata.json'),
          salt_tectonics: {
          audio: require("./GeologySociety/salt_tectonics/audio.mp3"), metadata: require("./GeologySociety/salt_tectonics/metadata.json"), transcript: require("./GeologySociety/salt_tectonics/transcript.json")
        } 
        },

        IRL: {
          'metadata': require('IRL/metadata.json'),
          internet_carbon_footprint: {
          audio: require("./IRL/internet_carbon_footprint/audio.mp3"), metadata: require("./IRL/internet_carbon_footprint/metadata.json"), transcript: require("./IRL/internet_carbon_footprint/transcript.json")
        },
internet_carbon_footprint_kopie: {
          audio: require("./IRL/internet_carbon_footprint_kopie/audio.mp3"), metadata: require("./IRL/internet_carbon_footprint_kopie/metadata.json"), transcript: require("./IRL/internet_carbon_footprint_kopie/transcript.json")
        } 
        }
  }

export default podcasts
