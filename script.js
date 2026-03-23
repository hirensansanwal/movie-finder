const API_KEY = "8363fd1e"; // 🔥 Replace with your OMDb API key

function searchMovies() {
  const query = document.getElementById("searchInput").value;

  // 🔥 ADD IT HERE
  if (!query) {
    alert("Please enter a movie name!");
    return;
  }

  const moviesContainer = document.getElementById("movies");
  const loading = document.getElementById("loading");

  moviesContainer.innerHTML = "";
  loading.classList.remove("hidden");

  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      loading.classList.add("hidden");

      if (data.Response === "False") {
        moviesContainer.innerHTML = "<p>No movies found 😢</p>";
        return;
      }

      displayMovies(data.Search);
    })
    .catch(error => {
      loading.classList.add("hidden");
      moviesContainer.innerHTML = "<p>Something went wrong 😢</p>";
    });
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");

  movies.map(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    moviesContainer.appendChild(movieDiv);
  });
}