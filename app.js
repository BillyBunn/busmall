'use strict';

// GLOBAL VARIABLES
var allImgs = [];
var totalClicks = 0;
var clickLimit = 25;
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var imgEls = [imgElOne, imgElTwo, imgElThree];
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

// FUNCTION THAT RENDERS IMGS AT 3 RANDOM INDEXES from allImgs[]
function renderImgs() {
  getRandom();
  for (var i = 0; i < 3; i++) {
    imgEls[i].src = allImgs[randomArray[i]].filepath;
    imgEls[i].alt = allImgs[randomArray[i]].alt;
    imgEls[i].title = allImgs[randomArray[i]].title;
    allImgs[randomArray[i]].views++;
  }
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
    // for (var i = 0; i < allImgs.length; i++) {
    //   allImgs[i].renderList();
    // }
    document.getElementById("gallery").innerHTML = "COMPLETED";
    clicksLeft.innerHTML = `<span>results<span>`;
    clicksLeft.style.marginTop = "30px";
    clicksLeft.style.fontSize = "3vw";

    updateChartArrays();
    drawChart();
  }
}

/* ---------------------------------------------------------------------------------------------------- */
// CHART.JS INTEGRATION
/* ---------------------------------------------------------------------------------------------------- */

var titles = [];
var clicks = [];
Chart.defaults.global.defaultFontColor = '#ffffff';
Chart.defaults.global.defaultFontFamily = '"Roboto", sans-serif';
Chart.defaults.global.defaultFontSize = 14;

function updateChartArrays() {
  for (var i = 0; i < allImgs.length; i++) {
    titles[i] = allImgs[i].fullName;
    clicks[i] = allImgs[i].clicks;
  }
}

function drawChart() {
  var canvasEl = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(canvasEl, {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor: [
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

renderImgs(); 
