let slideIndex = 0;
showSlides();

function showSlides() {
  setTimeout(showSlides, 3000); // Change image every 3 seconds
  let slides = document.getElementsByClassName("fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.opacity = "0";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.opacity = "1";
}
