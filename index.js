// Define your API key and API endpoints
const API_KEY = "04c35731a5ee918f014970082a0088b1";
const API_URL_POPULAR = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY + "&page=1";
const API_URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=";

// Define the base URL for movie images
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

// Cache DOM elements
const movieBox = document.querySelector("#movie-box");
const searchInput = document.querySelector("#search");

// Function to fetch and display movies
const getMovies = async (api) => {
    try {
        // Fetch movie data from the API
        const response = await fetch(api);
        const data = await response.json();

        // Call the showMovies function to display the fetched data
        showMovies(data.results);
    } catch (error) {
        // Handle errors by logging them to the console
        console.error("Error fetching data:", error);
    }
};

// Function to display movies in the movie box
const showMovies = (data) => {
    // Clear the movie box
    movieBox.innerHTML = "";

    // Loop through the movie data and create HTML elements for each movie
    data.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");

        box.innerHTML = `
            <img src="${IMG_PATH + item.poster_path}" alt="">
            <div class="overlay">
                <h2>${item.original_title}</h2>
                <span>${item.vote_average}</span>
                <h3>Overview:</h3>
                <p>${item.overview}</p>
            </div>
        `;

        // Append the movie box to the movieBox element
        movieBox.appendChild(box);
    });
};

// Event listener for the search input field
searchInput.addEventListener("keyup", (event) => {
    // Get the trimmed value of the search input
    const query = event.target.value.trim();

    // Check if the search input is not empty
    if (query !== "") {
        // If not empty, fetch movies based on the search query
        getMovies(API_URL_SEARCH + query);
    } else {
        // If empty, fetch popular movies
        getMovies(API_URL_POPULAR);
    }
});

// Initially fetch and display popular movies
getMovies(API_URL_POPULAR);
