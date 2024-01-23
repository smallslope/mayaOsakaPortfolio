/*
var drink_configuration = {
  drink_logo: './imgs/cola_logo.png',
  drink_size: 500,
  contactless_price: 1.50,
  point_price: 10,
  currency: 'GBP'
}
*/

//Burger Menu 
function myFunction(){
  console.log('x');
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav"){
    x.className += " responsive";
  }else{
    x.className = "topnav";
  }
}

//Modal Window
window.onload = function(){
// Get the modal
var modal = document.getElementById("myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = Array.from(document.getElementsByClassName("modalPic"));
console.log(img)
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.forEach((myImg) => {
  myImg.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
});
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  if(span){
  span.onclick = function() { 
    modal.style.display = "none";
  }
  }
}

//Tabs
function openTab(event,tabName){
  var i;
  var tabcontent;
  var tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i=0; i<tabcontent.length; i++){
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i=0; i<tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace("active","");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}
//Slideshow//
function slideshow(){
    parents = document.getElementsByClassName('slideshow-container');
    for (let j = 0; j < parents.length; j++){
      var slides = parents[j].getElementsByClassName("slideshowImg");
      slides[0].classList.add('active-slide');
    }

    var links = document.querySelectorAll('.slideshow-container a');

    for(let i = 0; i < links.length; i++){
      links[i].onclick = function(){
          let current = this.parentNode;
          var slides = current.getElementsByClassName("slideshowImg");
          currentSlide = current.getElementsByClassName('active-slide')[0];
          currentSlide.classList.remove('active-slide');
          if (currentSlide.nextElementSibling.classList.contains('slideshowImg')){
            currentSlide.nextElementSibling.classList.add('active-slide');
          }else{
            slides[0].classList.add('active-slide');
          }
      
          if (links[i].classList.contains('prev')){
            if(currentSlide.previousElementSibling){
              currentSlide.previousElementSibling.classList.add('active-slide');
            } else{
              slides[slides.length - 1].classList.add('active-slide');
            }
          }
        }
    }
  }
  
  
 


  
  

// //Slideshow
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n){
//   showSlides(slideIndex += n);
// }

// function currentSlides(n){
//   showSlides(slideIndex = n);
// }

// function showSlides(n){
//   let i;
//   let slides = document.getElementsByClassName("slideshowImg");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++){
//     slides[i].style.display = "none";
//   }
//   if (slides.length){
//     slides[slideIndex-1].style.display = "block";
//   }
// }

