// Getting the data from html

const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const moviesGrid = document.querySelector('#moviesGrid');
const loading = document.querySelector('#loading');
const errorMessage = document.querySelector('#errorMessage');
const noResults = document.querySelector('#noResults');


const API_KEY = 'aa3965de';
console.log(searchInput);
async function searchMovies() {
    const searchItem = searchInput.value;
    
    if(searchInput===''){
        errorMessage.textContent = "Please enter a movie name";
        errorMessage.style.display= 'block';
        return;
    }

    loading.style.display='block';
    errorMessage.style.display = 'none';
    noResults.style.display = 'none';

    try {
        const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchItem}`;
        const response = await fetch(url);
        const data = await response.json();
         loading.style.display = 'none';

        if (data.Response === 'True') {
            displayMovies(data.Search);
        }else{
            noResults.style.display='block';
            moviesGrid.innerHTML='';
        }
    } catch (e) {

        loading.style.display = 'none';
        errorMessage.textContent="Something went wrong. Please try again.";
        errorMessage.style.display='block';
        console.log('Error fetch');
    }

}

const displayMovies = (movies) => {
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement("div");

        movieCard.className = "movie-card";

        movieCard.innerHTML = `
            <img src="${movie.Poster != 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x350/667eea/ffffff?text=No+Poster'}" alt="${movie.Title}" class="movie-poster">
            <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>
            <p class="movie-year">${movie.Year}</p>
            <span class="movie-rating">
                ${movie.Type}
            </span>
            
            </div>

        `;
        moviesGrid.appendChild(movieCard);
    });
}

searchBtn.addEventListener('click',searchMovies);
// Adding enter key functionality
searchInput.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        searchMovies();
    }
})



