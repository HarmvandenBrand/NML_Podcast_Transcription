/*
 * This script creates a dictionary with podcast name in ./podcasts/ as key
 * and separate require statements for audio, description, transcript as values.
 * Writes to ./podcasts/podcasts.js
 */
const { readdirSync, writeFileSync, statSync } = require('fs')
const { join } = require('path')

const podcastsDir = './podcasts/'

/*
 * Reads names of podcast series folders in ./podcasts/
 * Returns unique folder names
 * TODO set kan weg
 */
const readSeries = () => {
  return Array.from(new Set( 
    readdirSync(podcastsDir, encoding='utf8', withFileTypes=true)
    .filter(f => statSync(join(podcastsDir, f)).isDirectory())))
}

/* 
 * Returns directory names corresponding to a single episode of arg series
 */
const readEpisodes = (series) => {
  const seriesDir = join(podcastsDir, series);
  return Array.from(new Set( 
    readdirSync(seriesDir, encoding='utf8', withFileTypes=true)
    .filter(f => statSync(join(seriesDir, f)).isDirectory())))
}

//TODO function for readData

/*
 * Generate a JSON file that lists the required resources per podcast
 */
const generate = () => {
  let json = readSeries()
    .map( series => { 
      let episodes = readEpisodes(series)
      .map((episode)=> {
        let podcastData = Array.from(readdirSync(join(podcastsDir, series, episode), encoding='utf8'))

        .map( datum => {
          return `${datum.replace(/\.[^/.]+$/, "")}: require("./${series}/${episode}/${datum}")`}).join(',\n')

      return `${episode}: {
        ${podcastData}
      }`
      }).join(',\n')
      return `${series}: {
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
