let baseUrl = 'https://www.triposo.com/api/20190906/city_walk.json?location_id='

//input Value of City
// check for first letter is uppercase Cities with more than one word hjave the format New_York_City
const cityInput = document.querySelector('#city')
//input value of time
// check value 0-350 minutes
const timeInput = document.querySelector('#time')
const button = document.querySelector('#getCity')
const resultContainer = document.querySelector('.results-container')

window.onload = function () {
  const url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;

  button.addEventListener('click', async function () {
    event.preventDefault()

    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    //console.log(url)

    //axios.get(URL, { headers: { Authorization: AuthStr } })
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
    console.log(result.data.results[0].way_points[0])
    const destinationName = document.createElement('h1')
    destinationName.innerHTML = `Let's Explore <span> ${cityInput.value} </span> together! `;
    resultContainer.append(destinationName);

    //try to use forEach here
    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      const poiName = result.data.results[0].way_points[i].poi.name;
      const poiDescription = result.data.results[0].way_points[i].poi.snippet;
      const walkToNextDistance = result.data.results[0].way_points[i].walk_to_next_distance;
      const walkToNextDuration = result.data.results[0].way_points[i].walk_to_next_duration;
      const wayPointNumber = i + 1;
      const destinationImage = result.data.results[0].way_points[i].poi.images[0].sizes.original.url;
      console.log(destinationImage)

      // create title header h5 element type and assigns class "title-header" to it and adds to the moviecontainer 
      const destinationStop = document.createElement('div')
      destinationStop.innerHTML = `Stop ${wayPointNumber}: ${poiName}, Description: ${poiDescription}, Walk to Next Distance ${walkToNextDistance}m, Walk to Next Duration ${walkToNextDuration} mins`
      resultContainer.append(destinationStop)

      const destinationImg = document.createElement('img')
      destinationImg.src = `${destinationImage}`;
      resultContainer.append(destinationImg)
      console.log(`Way Point ${i} ${result.data.results[0].way_points[i].poi.name}:: Description: ${result.data.results[0].way_points[i].poi.snippet}`)
    }
  })
}

