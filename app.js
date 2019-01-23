'use strict';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES
var leftImgEl = document.getElementById('left');
var centerImgEl = document.getElementById('center');
var rightImgEl = document.getElementById('right');
var allImgEls = [leftImgEl, centerImgEl, rightImgEl];
var resultsList = document.getElementById('results');
var clicksLeft = document.getElementById('remaining');
var canvasEl = document.getElementById("results-chart").getContext('2d');


// OBJECT CONSTRUCTOR VARIABLES
Image.fileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
Image.allImages = [];
Image.randomArray = [];
Image.totalClicks = 0;
Image.clickLimit = 25;
Image.titles = []; // for chart.js
Image.clicks = []; // for chart.js

// OBJECT CONSTRUCTOR
function Image(fileName) {
  this.fileName = fileName;
  this.filepath = `img/${fileName}`;
  this.name = this.fileName.split('.').shift(); // removes 'fileName' file extension 
  this.alt = this.name;
  this.title = this.name;
  this.writtenName = this.name.split('.').shift().replace('-', ' '); // removes '-' and replaces with ' '
  this.views = 0;
  this.clicks = 0;
  Image.allImages.push(this);
}
// OBJECT CONSTRUCTOR PROTOTYPES
Image.prototype.renderList = function () { // Renders voting results in an unordered list
  var liEl = document.createElement('li');
  liEl.textContent = `${this.clicks} votes for the ${this.writtenName}.`;
  resultsList.appendChild(liEl);
};

// OBJECT INSTANCES
for (var i = 0; i < Image.fileNames.length; i++) {
  new Image(Image.fileNames[i]);
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// CLICK EVENT HANDLER
function handleClick(event) {
  Image.totalClicks++;
  console.log('total clicks:', Image.totalClicks);
  // console.log(event.target);
  for (var i = 0; i < Image.allImages.length; i++) {
    if (event.target.alt === Image.allImages[i].alt) {
      Image.allImages[i].clicks++;
      renderImages();
      break;
    }
  }
  if (Image.totalClicks >= Image.clickLimit) {
    console.table(Image.allImages);
    removeListeners();
    renderCompleted();
    drawChart();
  }
}

// RENDERS IMAGES
function renderImages() {
  getRandom(); // adds 3 random numbers to beginning of Image.randomArray
  for (var i = 0; i < allImgEls.length; i++) { // loops through DOM img elements. assigns src, alt, and title
    allImgEls[i].src = Image.allImages[Image.randomArray[i]].filepath;
    allImgEls[i].alt = Image.allImages[Image.randomArray[i]].alt;
    allImgEls[i].title = Image.allImages[Image.randomArray[i]].title;
    Image.allImages[Image.randomArray[i]].views++;
  }
  clicksLeft.innerHTML = `<span>${Image.clickLimit - Image.totalClicks}</span> votes remaining`; // updates 'remaining votes' on page
}

// RENDERS 'VOTING COMPLETED' CONTENT
function renderCompleted() {
  console.log('ran renderCompleted()');
  document.getElementById("gallery").innerHTML = "COMPLETED"; // replaces img elements with message
  clicksLeft.innerHTML = `<span>results<span>`; // replaces remaing clicks counter
  clicksLeft.style.marginTop = "30px";
  clicksLeft.style.fontSize = "3vw";
}

// GENERATES 3 UNIQUE RANDOM NUMBERS, EXCLUDING PREVIOUS 3
function getRandom() {
  Image.randomArray.splice(3, 3);
  for (var i = 0; i < 3;) {
    var random = Math.floor(Math.random() * Image.allImages.length);
    if (!Image.randomArray.includes(random)) {
      Image.randomArray.unshift(random);
      i++;
    }
  }
}

// UPDATES CHART DATA
function updateChartArrays() {
  Chart.defaults.global.defaultFontColor = '#ffffff';
  Chart.defaults.global.defaultFontFamily = '"Roboto", sans-serif';
  Chart.defaults.global.defaultFontSize = 14;
  for (var i = 0; i < Image.allImages.length; i++) {
    Image.titles[i] = Image.allImages[i].writtenName;
    Image.clicks[i] = Image.allImages[i].clicks;
  }
}

// BUILDS CHART
function drawChart() {
  console.log('ran drawChart()');
  updateChartArrays();
  var resultsChart = new Chart(canvasEl, {
    type: 'bar',
    data: {
      labels: Image.titles,
      datasets: [{
        label: '# of Votes',
        data: Image.clicks,
        backgroundColor: [ // Chart.js gradient colors created with help from a Code Fellows 201 project: http://respekt.us/index.html
          '#e5615e',
          '#db5d5b',
          '#d15a58',
          '#c75755',
          '#be5452',
          '#b4514f',
          '#aa4e4c',
          '#a04a49',
          '#974746',
          '#8d4443',
          '#834140',
          '#793e3d',
          '#703b3a',
          '#663837',
          '#5c3434',
          '#523131',
          '#492e2e',
          '#3f2b2b',
          '#352828',
          '#222222',
        ],
        borderColor: '#7A7A7A',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Votes'
          },
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true,
            color: "#7A7A7A"
          }
        }]
      }
    }
  });
}

// REMOVES EVENT LISTENERS
function removeListeners() {
  console.log('ran removeListeners()');
  leftImgEl.removeEventListener('click', handleClick);
  centerImgEl.removeEventListener('click', handleClick);
  rightImgEl.removeEventListener('click', handleClick);
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ON PAGE LOAD
renderImages();

// CLICK EVENT LISTENERS
leftImgEl.addEventListener('click', handleClick);
centerImgEl.addEventListener('click', handleClick);
rightImgEl.addEventListener('click', handleClick);
