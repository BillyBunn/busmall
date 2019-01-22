'use strict';

// GLOBAL VARIABLES
var allImgs = [];
var totalClicks = 0;
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
  getRandom();
  // console.log(randomOne, randomTwo, randomThree);
  imgOne.src = allImgs[randomOne].filepath;
  imgTwo.src = allImgs[randomTwo].filepath;
  imgThree.src = allImgs[randomThree].filepath;
  allImgs[randomOne].views++;
  allImgs[randomTwo].views++;
  allImgs[randomThree].views++;
}

// GIVES YOU A RANDOM INDEX NUMBER FOR allImgs ARRAY
var randomOne;
var randomTwo;
var randomThree;

function getRandom() {
  randomOne = Math.floor(Math.random() * allImgs.length);
  randomTwo = Math.floor(Math.random() * allImgs.length);
  randomThree = Math.floor(Math.random() * allImgs.length);

  if (randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree) {
    getRandom();
  }
}

// CLICK EVENT LISTENERS
imgOne.addEventListener('click', handleClickOne);
imgTwo.addEventListener('click', handleClickTwo);
imgThree.addEventListener('click', handleClickThree);

// REMOVES LISTENERS AFTER 25TH CLICK
function removeLiseners() {
if (totalClicks >= 25) {
    imgOne.removeEventListener('click', handleClickOne);
    imgTwo.removeEventListener('click', handleClickTwo);
    imgThree.removeEventListener('click', handleClickThree);
    console.log('removed click event listeners');
  }
}

// CLICK EVENT HANDLERS - ONE FOR EACH IMG POSITION
function handleClickOne(event) {
  console.log(event.target);
  allImgs[randomOne].clicks++;
  totalClicks++;
  // console.log(allImgs[randomOne].clicks);
  // logClicks();
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

function handleClickTwo(event) {
  console.log(event.target);
  allImgs[randomTwo].clicks++;
  totalClicks++;
  // console.log(allImgs[randomThree].clicks);
  // logClicks();
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

function handleClickThree(event) {
  console.log(event.target);
  allImgs[randomThree].clicks++;
  totalClicks++;
  // console.log(allImgs[randomThree].clicks);
  // logClicks();
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

render();






