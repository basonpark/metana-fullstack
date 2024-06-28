function displayFeaturedMovies(movies) {
    const slider = document.getElementById('featured-slider');
    slider.innerHTML = '';
    movies.forEach(movie => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.textContent = movie.title; 
        slider.appendChild(slide);
    });
    initializeSlider();
}

function initializeSlider() {
    let index = 0;
    const slides = document.querySelectorAll('.slide');
    setInterval(() => {
        slides.forEach(slide => slide.style.display = 'none');
        index = (index + 1) % slides.length;
        slides[index].style.display = 'block';
    }, 3000);
}