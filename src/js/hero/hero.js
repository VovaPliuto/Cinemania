import axios from "axios";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ";

const refs = {
  heroEl: document.querySelector(".rendered-hero"),
}

function getRandomNumber() {
  return Math.round(Math.random() * 19);
}



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ",
  },
};

async function fetchTrending() { 
    return await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
};

function createDefaultHeroMarkup() { 
  return `<section class="hero">
        <div class="container">
          <h1 class="hero-default-title">Let’s Make Your Own Cinema</h1>
          <p class="hero-default-text">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
          <a class="hero-default-btn" href="#">Get Started</a>
        </div>
      </section>`;
}

function createHeroMarkup({ title, original_title, overview, vote_average, poster_path, backdrop_path }) {
  const heroTitle = title ? title : original_title;
  const heroImage = backdrop_path ? backdrop_path : poster_path;
  return `<section class="hero fetch-rendered" style="background-image: linear-gradient(
    86.77deg,
    #111111 30.38%,
    rgba(17, 17, 17, 0) 65.61%
  ), url('https://image.tmdb.org/t/p/original/${heroImage}')">
        <div class="container">
          <h1 class="hero-title fetch">${heroTitle}</h1>
          <p class="rating">★★★★★</p>
          <p class="hero-text">${overview}</p>
          <button class="hero-btn trailer-btn" type="button">Watch trailer</button>
          <button class="hero-btn details-btn" type="button">More details</button>
        </div>
      </section>`;
}

function populateMerkup(markup) { 
  refs.heroEl.innerHTML = markup;
}

async function renderHero() {
  try {
    const movieData = await fetchTrending();
    
    console.log(movieData);
    console.log(movieData.data.results);
    if (movieData.data.results.length > 0) {
      const movie = movieData.data.results[getRandomNumber()];
      populateMerkup(createHeroMarkup(movie));
    }
    
  } catch (error) {
    populateMerkup(createDefaultHeroMarkup());
  }
}

renderHero();