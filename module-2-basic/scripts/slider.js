document.addEventListener('DOMContentLoaded', (event) => {
    const sliderInner = document.querySelector('.slider-inner');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const items = document.querySelectorAll('.slider .item');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateSliderPosition() {
        const itemWidth = items[0].offsetWidth;
        sliderInner.style.transform = 'translateX(' + (-itemWidth * currentIndex) + 'px)';
    }

    function showNextItem() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateSliderPosition();
    }

    function showPrevItem() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1;
        }
        updateSliderPosition();
    }


    nextButton.addEventListener('click', showNextItem);
    prevButton.addEventListener('click', showPrevItem);
});