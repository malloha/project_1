let url = 'https://www.triposo.com/api/20190906/local_highlights.json?latitude=40.783058&longitude=-73.971252';

window.onload = function () {

  const button = document.querySelector('#getCity')
  button.addEventListener('click', async function () {
    event.preventDefault()

    // axios.get(URL, { headers: { Authorization: AuthStr } })
    const response = await axios.get(`${url}`, { headers: { "Triposo-Account": 'QGPSD9G3', "Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
    console.log(response)
  })
}