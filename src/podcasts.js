/*
 * This script creates a dictionary with podcast name in ./podcasts/ as key
 * and separate require statements for audio, description, transcript as values.
 * Writes to ./podcasts/podcasts.js
 */
const { readdirSync, writeFileSync, statSync } = require('fs')
const { join } = require('path')

const podcastsDir = './podcasts/'

/*
 * Reads names of podcast folders in ./podcasts/
 * Returns unique folder names
 */
const podcasts = () => {
  return Array.from(new Set( 
    readdirSync(podcastsDir, encoding='utf8', withFileTypes=true)
    .filter(f => statSync(join(podcastsDir, f)).isDirectory())))
}

/*
 * Generate a JSON file that lists the required resources per podcast
 */
const generate = () => {
  let properties = podcasts()
    .map((name)=> {
      let podcastData = Array.from(readdirSync(podcastsDir+name, encoding='utf8'))
      .map( datum => {
        return `${datum.replace(/\.[^/.]+$/, "")}: require("./${name}/${datum}")`}).join(',\n')
    return `${name}: {
      ${podcastData}
    }`
  }).join(',\n')

const string = `const podcasts = {
  ${properties}
}

export default podcasts
`

writeFileSync(`${podcastsDir}podcasts.js`, string, 'utf8')
}

generate()
