let baseUrl = 'https://www.triposo.com/api/20190906/city_walk.json?location_id='

//input Value of City
// check for first letter is uppercase Cities with more than one word hjave the format New_York_City
const cityInput = document.querySelector('#city')
//input value of time
// check value 0-350 minutes
const timeInput = document.querySelector('#time')
const button = document.querySelector('#getCity')

window.onload = function () {
  const url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;

  button.addEventListener('click', async function () {
    event.preventDefault()

    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    //console.log(url)

    //axios.get(URL, { headers: { Authorization: AuthStr } })
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
    //console.log(result.data)


    //try to use forEach here
    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      console.log(`Way Point ${i} ${result.data.results[0].way_points[i].poi.name}:: Description: ${result.data.results[0].way_points[i].poi.snippet}`)
    }

  })
}

