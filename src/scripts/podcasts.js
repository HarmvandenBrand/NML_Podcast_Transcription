/*
 * This script creates a dictionary with podcast name in ./podcasts/ as key
 * and separate require statements for audio, description, transcript as values.
 * Writes to ./podcasts/podcasts.js
 */
const { readdirSync, writeFileSync, statSync } = require('fs')
const { join } = require('path')

// Assumes script is called from /src folder
const podcastsDir = './podcasts/'

/*
 * Reads names of podcast series folders in ./podcasts/
 * Returns folder names
 */
const readSeries = () => {
  return Array.from(
    readdirSync(podcastsDir, encoding='utf8', withFileTypes=true)
    .filter(f => statSync(join(podcastsDir, f)).isDirectory()))
}

/* 
 * Returns directory names corresponding to a single episode of series arg 
 */
const readEpisodes = (series) => {
  const seriesDir = join(podcastsDir, series);
  return readdirSync(seriesDir, encoding='utf8', withFileTypes=true)
    .filter(f => statSync(join(seriesDir, f)).isDirectory())
}

/*
 * Reads the data of a single episode
 */
const readPodcastData = (series, episode) => {
  return Array.from(readdirSync(join(podcastsDir, series, episode), encoding='utf8'))
        .map( datum => {
          return `'${datum.replace(/\.[^/.]+$/, "")}': require("./${series}/${episode}/${datum}")`}).join(', ')
}

/*
 * Generate a JSON file that lists the required resources per series and per podcast
 */
const generate = () => {
  let json = readSeries()
    .map( series => { 
      let episodes = readEpisodes(series)
      .map((episode)=> {
        let podcastData = readPodcastData(series, episode)
        return `'${episode}': {
          ${podcastData}
        }`
      }).join(',\n')
      return `
        '${series}': {
          'metadata': require('./${series}/metadata.json'),
          ${episodes} 
        }`
    }).join(',\n')

  const string = `const podcasts = {
  ${json}
  }

export default podcasts
`
  writeFileSync(`${podcastsDir}podcasts.js`, string, 'utf8')
}

generate()
