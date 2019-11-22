let url = 'https://www.triposo.com/api/20190906/city_walk.json?location_id=Paris&total_time=200';

window.onload = function () {

  const button = document.querySelector('#getCity')
  button.addEventListener('click', async function () {
    event.preventDefault()

    // axios.get(URL, { headers: { Authorization: AuthStr } })
    const result = await axios.get('https://www.triposo.com/api/20190906/city_walk.json?location_id=Paris&total_time=200', { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
    console.log(result.data)

    for (let i = 0; i < result.data.results[0].way_points.length; i++) {

      console.log(result.data.results[0].way_points[i].poi.name)
      console.log(result.data.results[0].way_points[i].poi.snippet)
    }

  })
}

