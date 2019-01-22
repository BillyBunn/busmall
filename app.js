'use strict';

// GLOBAL VARIABLES
var allImgs = [];
var totalClicks = 0;
var clickLimit = 25;
var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');
var resultsList = document.getElementById('results');
var clicksLeft = document.getElementById('remaining');


// IMG CONSTRUCTOR FUNCTION
function Img(name) {
  this.name = name;
  this.filepath = `img/${name}`;
  this.fullName = this.name.split('.').shift().replace('-', ' ');
  this.views = 0;
  this.clicks = 0;
  allImgs.push(this);
}

Img.prototype.renderList = function () {
  var liEl = document.createElement('li');
  liEl.textContent = `${this.clicks} votes for the ${this.fullName}.`;
  resultsList.appendChild(liEl);
};

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
  imgOne.src = allImgs[randomArray[0]].filepath;
  imgTwo.src = allImgs[randomArray[1]].filepath;
  imgThree.src = allImgs[randomArray[2]].filepath;
  allImgs[randomArray[0]].views++;
  allImgs[randomArray[1]].views++;
  allImgs[randomArray[2]].views++;

  clicksLeft.innerHTML = `<span>${clickLimit - totalClicks}</span> votes remaining`;

}

// GIVES YOU A RANDOM INDEX NUMBER FOR allImgs ARRAY
// https://stackoverflow.com/questions/40956717/how-to-addeventlistener-to-multiple-elements-in-a-single-line
var prevRandomArray = [];
var randomArray = [];
function getRandom() {
  randomArray = [];
  while (randomArray.length < 3) {
    var random = Math.floor(Math.random() * allImgs.length);
    if (randomArray.indexOf(random) === -1 && prevRandomArray.indexOf(random) === -1) {
      randomArray.unshift(random);
    }
  }
  prevRandomArray = randomArray;
}

// CLICK EVENT LISTENERS
imgOne.addEventListener('click', handleClickOne);
imgTwo.addEventListener('click', handleClickTwo);
imgThree.addEventListener('click', handleClickThree);

// REMOVES LISTENERS AFTER 25TH CLICK
function removeLiseners() {
  if (totalClicks >= clickLimit) {
    imgOne.removeEventListener('click', handleClickOne);
    imgTwo.removeEventListener('click', handleClickTwo);
    imgThree.removeEventListener('click', handleClickThree);
    console.log('removed click event listeners');
    console.table(allImgs);

    for (var i = 0; i < allImgs.length; i++) {
      allImgs[i].renderList();
    }
  }
}

// CLICK EVENT HANDLERS - ONE FOR EACH IMG POSITION
function handleClickOne(event) {
  console.log(event.target);
  allImgs[randomArray[0]].clicks++;
  totalClicks++;
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

function handleClickTwo(event) {
  console.log(event.target);
  allImgs[randomArray[1]].clicks++;
  totalClicks++;
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

function handleClickThree(event) {
  console.log(event.target);
  allImgs[randomArray[2]].clicks++;
  totalClicks++;
  console.log('total clicks:', totalClicks);
  removeLiseners();
  render();
}

render(); 
