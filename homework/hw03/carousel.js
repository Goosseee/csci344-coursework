const data = [
  {
    image_url: "https://picsum.photos/450/300?n=1",
    caption: "Photo 1",
  },
  {
    image_url: "https://picsum.photos/450/300?n=2",
    caption: "Photo 2",
  },
  {
    image_url: "https://picsum.photos/450/300?n=3",
    caption: "Photo 3",
  },
  {
    image_url: "https://picsum.photos/450/300?n=4",
    caption: "Photo 4",
  },
  {
    image_url: "https://picsum.photos/450/300?n=5",
    caption: "Photo 5",
  },
  {
    image_url: "https://picsum.photos/450/300?n=6",
    caption: "Photo 6",
  },
  {
    image_url: "https://picsum.photos/450/300?n=7",
    caption: "Photo 7",
  },
  {
    image_url: "https://picsum.photos/450/300?n=8",
    caption: "Photo 8",
  },
  {
    image_url: "https://picsum.photos/450/300?n=9",
    caption: "Photo 9",
  },
  {
    image_url: "https://picsum.photos/450/300?n=10",
    caption: "Photo 10",
  }
];



//Interprets the array and inserts it into the DOM 
loadSlides();
function loadSlides(){
  for (let i = 0; i < data.length; i++){ 
  let slide = 
`<section class="slide" id="slide_${i}" role="group" aria-hidden="true" aria-label="Slide ${i+1} of 10">
<img src="${data[i].image_url}" onclick="plusSlides(1)" alt="${data[i].caption}">
<p>${data[i].caption}</p>
</section>`
  
document.querySelector(".carousel-inner").insertAdjacentHTML('beforeend', slide); 
  }
}

let slideCurrent = 0;
showSlides(slideCurrent);
function plusSlides(n) {
  showSlides(slideCurrent += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Compares the index status with 
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");

  //returns to the last/first slide if index exceeds the number of objects
  if (n > slides.length) {slideCurrent = 1}    
  if (n < 1) {slideCurrent = slides.length}

  //sets display for all slides to false
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
    slides[i].setAttribute("aria-hidden", "true");
 
  }
  //sets the currently indexed slide to show
  slides[slideCurrent-1].style.display = "block";
  slides[slideCurrent-1].setAttribute("aria-hidden", "false");  
}


