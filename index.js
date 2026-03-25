const API_KEY = "cdb2fc7a15fb9fd85a30da405caa6909";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("search");
const discoverButton = document.getElementById("discover");
const main = document.querySelector("main");

discoverButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("please enter a search term");
  searchMulti(query);
});

async function searchMulti(query) {
  try {
    const res = await fetch(
      `${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    const movies = data.results.filter(
      (item) => item.media_type === "movie"
    );

    const series = data.results.filter(
      (item) => item.media_type === "tv"
    );

    displayResults(movies, series);
  } catch (err) {
    console.error(err);
    alert("failed to fetch results");
  }
}

function displayResults(movies, series) {
  main.innerHTML = `
    <h1>brew</h1>
    <input id="search" placeholder="what do you want to watch?" />
    <button id="discover">discover</button>

    ${movies.length ? `<h2>movies</h2>` : ""}
    <div class="results" id="movie-results"></div>

    ${series.length ? `<h2>tv series</h2>` : ""}
    <div class="results" id="series-results"></div>
  `;
 
  document.getElementById("discover").onclick = discoverButton.onclick;

  const movieContainer = document.getElementById("movie-results");
  const seriesContainer = document.getElementById("series-results");

  movies.forEach((movie) => {
    movieContainer.appendChild(
      createCard(
        movie.poster_path,
        movie.title,
        `player.html?tmdbid=${movie.id}`
      )
    );
  });

  series.forEach((show) => {
    seriesContainer.appendChild(
      createCard(
        show.poster_path,
        show.name,
        `shows.html?tmdbid=${show.id}`
      )
    );
  });
}

function createCard(poster, title, link) {
  const card = document.createElement("div");
  card.classList.add("movie");

  const img = document.createElement("img");
  img.src = poster
    ? `${IMAGE_BASE_URL}${poster}`
    : "https://placehold.co/200x300?text=no+image";

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const btn = document.createElement("button");
  btn.textContent = "watch now";
  btn.classList.add("watch-btn");
  btn.onclick = () => (window.location.href = link);

  card.append(img, h2, btn);
  return card;
}
