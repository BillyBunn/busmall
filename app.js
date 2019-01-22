'use strict';

// GLOBAL VARIABLES
var allImgs = [];
var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');


// IMG CONSTRUCTOR FUNCTION
function Img(name) {
  // images/sassy-goat.jpg
  // this.fileExtension = this.src.split('.').pop(); //grabs file extension after '.'
  this.filepath = `img/${name}`;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allImgs.push(this);
}

// IMG INSTANCES
new Img('bag.jpg');
new Img('banana.jpg');
new Img('bathroom.jpg');
new Img('boots.jpg');
new Img('breakfast.jpg');
new Img('bubblegum.jpg');
new Img('chair.jpg');
new Img('cthulhu.jpg');
new Img('dog-duck.jpg');
new Img('dragon.jpg');
new Img('pen.jpg');
new Img('pet-sweep.jpg');
new Img('scissors.jpg');
new Img('shark.jpg');
new Img('sweep.jpg');
new Img('tauntaun.jpg');
new Img('unicorn.jpg');
new Img('usb.gif');
new Img('water-can.jpg');
new Img('wine-glass.jpg');


// RENDER FUNCTION
function render() {
  imgOne.src = allImgs[0].filepath;
  imgTwo.src = allImgs[1].filepath;
  imgThree.src = allImgs[2].filepath;
}

console.table(allImgs);
render();

// GIVES YOU A RANDOM INDEX NUMBER FOR allImgs ARRAY
var randomOne;
var randomTwo;
var randomThree;

function getRandom() {
  randomOne = Math.floor(Math.random() * allImgs.length);
  randomTwo = Math.floor(Math.random() * allImgs.length);
  randomThree = Math.floor(Math.random() * allImgs.length);

  if (randomTwo === randomOne && randomThree === randomTwo) {
    getRandom();
  }
  
  console.log(randomOne, randomTwo, randomThree);
}












