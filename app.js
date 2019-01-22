'use strict';

// GLOBAL VARIABLES
var allImgs = [];
var totalClicks = 0;
var clickLimit = 25;
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var resultsList = document.getElementById('results');
var clicksLeft = document.getElementById('remaining');

// IMG CONSTRUCTOR FUNCTION
function Img(name) {
  this.name = name;
  this.filepath = `img/${name}`;
  this.alt = this.name.split('.').shift() // removes 'name' file extension 
  this.title = this.alt
  this.fullName = this.name.split('.').shift().replace('-', ' '); // removes '-' and replaces with ' '
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

// PROTOTYPE TO RENDER RESULTS IN LIST
Img.prototype.renderList = function () {
  var liEl = document.createElement('li');
  liEl.textContent = `${this.clicks} votes for the ${this.fullName}.`;
  resultsList.appendChild(liEl);
};

// FUNCTION THAT GENERATES 3 UNIQUE RANDOM NUMBERS, EXCLUDES PRIOR 3 GENERATED
var randomArray = [];
function getRandom() {
  randomArray.splice(3, 3);
  for (var i = 0; i < 3;) {
    var random = Math.floor(Math.random() * allImgs.length);
    if (!randomArray.includes(random)) {
      randomArray.unshift(random);
      i++;
    }
  }
}

// FUNCTION THAT RENDERS IMGS AT 3 RANDOM INDEXES
function renderImgs() {
  getRandom();
  imgElOne.src = allImgs[randomArray[0]].filepath;
  imgElOne.alt = allImgs[randomArray[0]].alt;
  imgElOne.title = allImgs[randomArray[0]].title;

  imgElTwo.src = allImgs[randomArray[1]].filepath;
  imgElTwo.alt = allImgs[randomArray[1]].alt;
  imgElTwo.title = allImgs[randomArray[1]].title;

  imgElThree.src = allImgs[randomArray[2]].filepath;
  imgElThree.alt = allImgs[randomArray[2]].alt;
  imgElThree.title = allImgs[randomArray[2]].title;

  allImgs[randomArray[0]].views++;
  allImgs[randomArray[1]].views++;
  allImgs[randomArray[2]].views++;

  clicksLeft.innerHTML = `<span>${clickLimit - totalClicks}</span> votes remaining`;
}

// CLICK EVENT HANDLER
function handleClick(event) {
  totalClicks++;
  console.log('total clicks:', totalClicks);
  console.log(event.target);
  for (var i = 0; i < allImgs.length; i++) {
    if (event.target.alt === allImgs[i].alt) {
      allImgs[i].clicks++;
      renderImgs();
      break;
    }
  }
  removeListeners();
}

// CLICK EVENT LISTENERS
imgElOne.addEventListener('click', handleClick);
imgElTwo.addEventListener('click', handleClick);
imgElThree.addEventListener('click', handleClick);

// REMOVES EVENT LISTENERS AFTER 25TH CLICK
function removeListeners() {
  if (totalClicks >= clickLimit) {
    imgElOne.removeEventListener('click', handleClick);
    imgElTwo.removeEventListener('click', handleClick);
    imgElThree.removeEventListener('click', handleClick);
    console.log('removed click event listeners');
    console.table(allImgs);
    for (var i = 0; i < allImgs.length; i++) {
      allImgs[i].renderList();
    }
  }
}

renderImgs(); 
