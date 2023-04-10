function myFunction(){
  console.log('x');
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav"){
    x.className += " responsive";
  }else{
    x.className = "topnav";
  }
}

window.onload = function(){
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = Array.from(document.getElementsByClassName("illustrationPics"));
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
span.onclick = function() { 
  modal.style.display = "none";
}
}

