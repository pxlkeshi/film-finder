const tmdbKey = "32e3828664595460668d240e5038e567";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

// Get genres
const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

// Get movies by genre
const getMovies = async () => {
  const selectedGenre = getSelectedGenre(); // This function should be defined in helpers.js
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

// Get detailed movie info
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Show a random movie
const showRandomMovie = async () => {
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies); // This function should be in helpers.js
  const info = await getMovieInfo(randomMovie);
  displayMovie(info); // This function should be in helpers.js
};

// Connect button to showRandomMovie()
playBtn.onclick = showRandomMovie;

// Initialize the page
const init = async () => {
  const genres = await getGenres();
  populateGenreDropdown(genres);
};

// Call init when the page loads
window.onload = init;
