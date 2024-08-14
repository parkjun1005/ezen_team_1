let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // 모든 슬라이드를 숨김
    slides.forEach(slide => slide.classList.remove('active'));
    // 현재 인덱스의 슬라이드를 표시
    slides[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// 첫 번째 슬라이드 표시
showSlide(currentIndex);

// 3초마다 슬라이드 전환
setInterval(nextSlide, 3000);

