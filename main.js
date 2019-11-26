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

window.onload = function () {
  const url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;

  button.addEventListener('click', async function () {
    event.preventDefault()
    let url = `${baseUrl}${cityInput.value}&total_time=${timeInput.value}`;
    //console.log(url)

    //axios.get(URL, { headers: { Authorization: AuthStr } })
    const result = await axios.get(url, { headers: { "X-Triposo-Account": 'QGPSD9G3', "X-Triposo-Token": 'tsrpze8uo75pra7bmbbnrenn18mda8st' } });
    //  console.log(result.data.results[0].way_points[0])
    resultContainer.innerHTML = ""
    //   dotToDot.innerHTML = ""
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

    const dotToDot = document.querySelector(".doting");
    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      const newElement = document.createElement('span')
      newElement.className = "dot"
      let j = i + 1;
      newElement.onclick = function () { currentSlide(j) }
      dotToDot.append(newElement)
    }
    prevButton.classList = "prev"
    prevButton.innerHTML = "&#10094"
    resultContainer.append(prevButton)


    nextButton.classList = "next"
    nextButton.innerHTML = "&#10095"
    resultContainer.append(nextButton)

    for (let i = 0; i < result.data.results[0].way_points.length; i++) {
      const poiName = result.data.results[0].way_points[i].poi.name;
      const poiDescription = result.data.results[0].way_points[i].poi.snippet;
      const walkToNextDistance = result.data.results[0].way_points[i].walk_to_next_distance;
      const walkToNextDuration = result.data.results[0].way_points[i].walk_to_next_duration;
      const wayPointNumber = i + 1;
      const poiImage = result.data.results[0].way_points[i].poi.images[0].sizes.original.url;

      // create title header h5 element type and assigns class "title-header" to it and adds to the moviecontainer 
      const wayPointTitle = document.createElement('h2')
      wayPointTitle.className = "text";
      wayPointTitle.innerHTML = `Stop ${wayPointNumber}: ${poiName}`

      const wayPointDetails = document.createElement('p')
      wayPointDetails.className = "text";
      wayPointDetails.innerHTML = `Description: ${poiDescription}, Walk to Next Distance: ${walkToNextDistance}m, Walk to Next Duration: ${walkToNextDuration} mins`
      const wayPointImage = document.createElement('img')
      wayPointImage.src = `${poiImage}`;

      const wayPointOrder = document.createElement('div')
      wayPointOrder.className = "numbertext"
      wayPointOrder.innerHTML = `${wayPointNumber} / ${result.data.results[0].way_points.length}`

      const wayPoint = document.createElement('div')
      wayPoint.classList.add("mySlides")
      wayPoint.classList.add("fade")
      wayPoint.append(wayPointTitle);
      wayPoint.append(wayPointImage);
      wayPoint.append(wayPointDetails)
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
    console.log(slides)
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

}