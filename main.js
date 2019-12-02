let baseUrl = 'https://www.triposo.com/api/20190906/city_walk.json?location_id='

//input Value of City
// check for first letter is uppercase Cities with more than one word hjave the format New_York_City
const cityInput = document.querySelector('#city')
//input value of time
// check value 0-350 minutes
const timeInput = document.querySelector('#time')
const button = document.querySelector('#getCity')
const resultContainer = document.querySelector('.slideshow-container')
let slideIndex = 1;
const prevButton = document.createElement('a')
const nextButton = document.createElement('a')
const dotToDot = document.querySelector(".allDots");
const trendingDiv = document.querySelector(".trending")
const trendDisplay = document.querySelector(".trendAlign")
const showError = document.querySelector('.inputForm')
let errorElement = document.createElement("div")
let result;



window.onload = function () {

  const url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
  createTrendingCity()

  button.addEventListener('click', async function () {
    event.preventDefault()
    let cityString = cityInput.value;
    cityString = cityString.split(' ')
    for (let i = 0; i < cityString.length; i++) {
      const upperCase = cityString[i].charAt(0).toUpperCase() + cityString[i].substring(1);
      cityString[i] = upperCase;
    }
    cityInput.value = cityString.join("_")
    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    //console.log(url)
    //axios.get(URL, { headers: { Authorization: AuthStr } })
    let errName = "";
    try {
      result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
      //console.log(result.data.results[0].way_points[0])
    }
    catch (error) {
      //console.log(error)
      errName = error.name;
      errorElement.innerHTML = `<p class="errorClass">Invalid Input: Please enter valid values of City(Example: Chicago ) and Time in minutes(60-350 minutes) again</p>`
      showError.append(errorElement)

    }

    if (errName == "") {
      errorElement.innerHTML = ""
      resultContainer.innerHTML = ""
      dotToDot.innerHTML = ""
      renderResults(result);
      showSlides(slideIndex);
    }
  })


  //for trending Cities section
  function createTrendingCity() {

    let newCityName = document.createElement('p')
    newCityName.innerHTML = `London`;

    let newCityElement = document.createElement('div')
    newCityElement.className = "trendingImage"
    newCityName.className = "London"
    newCityElement.innerHTML = `<img src="london.jpg">`

    newCityElement.append(newCityName)
    trendDisplay.append(newCityElement)

    let newCityElement2 = document.createElement('div')
    let newCityName2 = document.createElement('p')
    newCityName2.innerHTML = `Paris`;
    newCityName2.className = "Paris"
    newCityElement2.className = "trendingImage"
    newCityElement2.innerHTML = `<img src="paris.jpg">`
    newCityElement2.append(newCityName2)

    trendDisplay.append(newCityElement2)


    let newCityElement3 = document.createElement('div')
    let newCityName3 = document.createElement('p')
    newCityName3.innerHTML = `Rome`;
    newCityName3.className = "Rome"
    newCityElement3.className = "trendingImage"
    newCityElement3.innerHTML = `<img src="rome.jpg">`
    newCityElement3.append(newCityName3)

    trendDisplay.append(newCityElement3)
    // trendingDiv.append(trendDisplay)

  }

  const romeButton = document.querySelector(".Rome")
  const londonButton = document.querySelector(".London")
  const parisButton = document.querySelector(".Paris")

  romeButton.addEventListener('click', async function () {
    event.preventDefault()

    cityInput.value = "Rome";
    timeInput.value = "100"
    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });

    errorElement.innerHTML = ""
    resultContainer.innerHTML = ""
    dotToDot.innerHTML = ""
    renderResults(result);
    showSlides(slideIndex);
  })

  londonButton.addEventListener('click', async function () {
    event.preventDefault()
    cityInput.value = "London";
    timeInput.value = "100"
    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });

    errorElement.innerHTML = ""
    resultContainer.innerHTML = ""
    dotToDot.innerHTML = ""
    renderResults(result);
    showSlides(slideIndex);
  })
  parisButton.addEventListener('click', async function () {
    event.preventDefault()
    cityInput.value = "Paris";
    timeInput.value = "100"
    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });

    errorElement.innerHTML = ""
    resultContainer.innerHTML = ""
    dotToDot.innerHTML = ""
    renderResults(result);
    showSlides(slideIndex);
  })


  // const destinationName = document.createElement('h1')
  // destinationName.innerHTML = `Let's Explore <span> ${cityInput.value} </span> in ${Math.ceil(timeInput.value / 60)} hours! `;
  // resultContainer.append(destinationName);


  //console.log(`Way Point ${i} ${result.data.results[0].way_points[i].poi.name}:: Description: ${result.data.results[0].way_points[i].poi.snippet}`)



  prevButton.addEventListener('click', function () {
    plusSlides(-1)
  })
  nextButton.addEventListener('click', function () { plusSlides(1) })
  // Next/previous controls


  function renderResults(result) {

    const destinationName = document.createElement('h2')
    destinationName.innerHTML = `Let's Explore <span class="city"> ${cityInput.value} </span> in ${timeInput.value} minutes! `;
    resultContainer.append(destinationName);


    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      const newElement = document.createElement('span')
      newElement.className = "dot"
      let j = i + 1;
      newElement.onclick = function () { currentSlide(j) }
      dotToDot.append(newElement)
      resultContainer.append(dotToDot)
    }
    prevButton.classList = "prev buttons"
    prevButton.innerHTML = "&#10094"
    resultContainer.append(prevButton)


    nextButton.classList = "next buttons"
    nextButton.innerHTML = "&#10095"
    resultContainer.append(nextButton)


    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      const poiName = result.data.results[0].way_points[i].poi.name;
      const poiDescription = result.data.results[0].way_points[i].poi.snippet;
      const walkToNextDistance = result.data.results[0].way_points[i].walk_to_next_distance;
      const walkToNextDuration = result.data.results[0].way_points[i].walk_to_next_duration;
      const poiLinks = result.data.results[0].way_points[i].poi.attribution;
      const visitTime = result.data.results[0].way_points[i].visit_time;
      const wayPointNumber = i + 1;


      const poiImage = result.data.results[0].way_points[i].poi.images[0].sizes.original.url;
      // console.log(poiImage)

      let poiMap = ""
      let poiWiki = ""

      for (let i = 0; i < poiLinks.length; i++) {

        if (poiLinks[i].source_id == "openstreetmap") {
          poiMap = poiLinks[i].url;
        }
        if (poiLinks[i].source_id == "wikipedia") {
          poiWiki = poiLinks[i].url;
        }
      }

      const linkVar = `OpenStreetMap ${poiMap} wki ${poiWiki}`



      const wayPointTitle = document.createElement('h2')
      wayPointTitle.className = "title";
      wayPointTitle.innerHTML = `Stop ${wayPointNumber}: ${poiName}`

      const wayPointDetails = document.createElement('p')
      wayPointDetails.className = "text";
      wayPointDetails.innerHTML = `<span>Description:</span> ${poiDescription} <span>Distance to next Stop:</span> ${walkToNextDistance}m <span> Walking Time to next Stop:</span> ${walkToNextDuration} mins <span> Visit Time</span> ${visitTime} mins`
      const wayPointImage = document.createElement('img')
      wayPointImage.src = `${poiImage}`;

      const wayPointOrder = document.createElement('div')
      wayPointOrder.className = "numbertext"
      wayPointOrder.innerHTML = `${wayPointNumber} / ${result.data.results[0].way_points.length}`


      const wayPointLinks = document.createElement('div');

      const wikiLink = document.createElement('a')
      wikiLink.innerHTML = poiWiki
      wikiLink.href = `${poiWiki}`;

      const mapLink = document.createElement('a')
      mapLink.innerHTML = poiMap
      mapLink.href = poiMap;

      wayPointLinks.append(mapLink)
      wayPointLinks.append(wikiLink)

      const wayPoint = document.createElement('div')
      wayPoint.classList.add("mySlides")
      wayPoint.classList.add("fade")
      wayPoint.append(wayPointTitle);
      wayPoint.append(wayPointImage);
      wayPoint.append(wayPointDetails)
      wayPoint.append(wayPointLinks)
      wayPoint.append(wayPointOrder)
      resultContainer.append(wayPoint)

    }

  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  function showSlides(n) {

    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    // console.log(dots)
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // console.log(slides)
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }


}