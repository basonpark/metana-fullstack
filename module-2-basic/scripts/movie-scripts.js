document.addEventListener('DOMContentLoaded', () => {
    const moviesGrid = document.getElementById('movies-grid');
    
    const apiKey="b961afea22de8a698008691074352353";
    const apiEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.results.forEach(movie => {
          const movieElement = createMovieElement(movie);
          moviesGrid.appendChild(movieElement);
        });
      })
      .catch(error => console.error('Error fetching movies:', error));
    

    function createMovieElement(movie) {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('card');
      
      const moviePoster = document.createElement('img');
      moviePoster.src = movie.backdrop_path;

      const baseURL = 'http://image.tmdb.org/t/p/';
        const size = 'w500';
        moviePoster.src = `${baseURL}${size}${movie.poster_path}`;

      moviePoster.alt = `${movie.title} Poster`;
      moviePoster.classList.add('cardImage');
      
      const movieInfo = document.createElement('div');
      movieInfo.classList.add('card-info');
      
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      
      const movieDescription = document.createElement('p');
      movieDescription.textContent = movie.description;

      const movieRating = document.createElement('p');
        movieRating.textContent = movie.vote_average;
        
      
      movieInfo.appendChild(movieTitle);
      movieInfo.appendChild(movieDescription);
      movieInfo.appendChild(movieRating);
      movieDiv.appendChild(moviePoster);
      movieDiv.appendChild(movieInfo);
      
      return movieDiv;
    }
  });