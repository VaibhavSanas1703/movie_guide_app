
const APIKEY = "1fb1f733";
const movieBox = document.querySelector('.movie-container');
const mainMovieContainer = document.querySelector('.main-movie-container')
const imageSource = "images/star.svg";

// INPUT OR BUTTON
const text = document.querySelector('#text');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');

const showMovie = async (movieName) => {
    try {
      // FETCHING DATA FROM SERVER
      const URL = `http://www.omdbapi.com/?t=${movieName}&apikey=${APIKEY}`;
      const res = await fetch(URL);
      const data = await res.json();
     console.log(data);

     let imageSourceNot = data.Poster == "N/A" ? "images/Image_not_available.png.webp" : data.Poster;
     let runtime = data.Runtime == "N/A" ? "No found" : data.Runtime;

     if(data.Error === "Movie not found!"){
         alert('This Movie is not found in our database')
        movieBox.innerHTML = ''
     }
     else{
     setTimeout(() => {
          text.innerHTML = 'Fetching movie..'
      }, 100);
      const showdata = `
      <div class="main-movie-container">
           <div class="image">
               <h3> Search results for "${movieName}"</h3>
               <img src=${imageSourceNot}>
           </div>
           <div class="content">
                <div class='top'>
                <h1>${data.Title}</h1>
                <h4>IMDB Rating : ${data.imdbRating} <img src=${imageSource} id='star'></h4>
                </div>
                <div class='bottom'>
                <p>Release Date : <b>${data.Released}</b></p>
                <p>Country : <b>${data.Country}</b></p>
                <p>Language : <b>${data.Language}</b></p>
                <p>Genre : <b>${data.Genre}</b></p>
                <p>Runtime : <b>${runtime}</b></p>
                <p>Actors : <b>${data.Actors}</b></p>
                <p>Storyline : <b>${data.Plot}</b></p>
                </div>
           </div>
      </div>
      `

      setTimeout(() => {
          movieBox.innerHTML = showdata;
      }, 1000);
     }
    } 
    catch (error) {
      text.innerHTML = 'Server is down please try after some time!'
    }
}

document.addEventListener('keydown',(event) => {
     if(event.key == "Enter"){
          searchBtn.click();
     }
})


searchBtn.addEventListener('click',() => {
     if(searchInput.value == ''){
          alert('Please enter movie name?')
     }
     else{
          showMovie(searchInput.value)
          setTimeout(() => {
               searchInput.value = ''
          }, 1000);
     }
})