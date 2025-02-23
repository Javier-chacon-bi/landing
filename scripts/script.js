const carouselStrip = document.querySelector('.carousel-strip');
const carouselContainer = document.querySelector('.carousel-container');
let scrollPosition = 0;
let startX = 0;
let isDragging = false;

function scrollCarousel(direction) {
    const containerWidth = carouselContainer.offsetWidth;
    if (direction === 'left') {
        scrollPosition = Math.min(scrollPosition + containerWidth, 0);
    } else if (direction === 'right') {
        const maxScroll = -(carouselStrip.scrollWidth - containerWidth);
        scrollPosition = Math.max(scrollPosition - containerWidth, maxScroll);
    }
    carouselStrip.style.transform = `translateX(${scrollPosition}px)`;
}

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX > 50) {
        scrollCarousel('left');
        isDragging = false;
    } else if (deltaX < -50) {
        scrollCarousel('right');
        isDragging = false;
    }
});

carouselContainer.addEventListener('touchend', () => {
    isDragging = false;
});
