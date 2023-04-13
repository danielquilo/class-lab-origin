"use strict";

let goatContainer = document.querySelector("section");
let resultButton = document.querySelector("section + div");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
let maxClicksAllowed = 9;

const state = {
  allGoatsArray: [],
};

function Goat(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.allGoatsArray.length);
}

let usedGoats = [];

function renderGoats() {
  let goat1 = getRandomNumber();
  let goat2 = getRandomNumber();

  while (goat1 === goat2 || usedGoats.includes(goat1) || usedGoats.includes(goat2)) {
    goat1 = getRandomNumber();
    goat2 = getRandomNumber();
  }

  image1.src = state.allGoatsArray[goat1].src;
  image2.src = state.allGoatsArray[goat2].src;
  image1.alt = state.allGoatsArray[goat1].name;
  image2.alt = state.allGoatsArray[goat2].name;
  state.allGoatsArray[goat1].views++;
  state.allGoatsArray[goat2].views++;

  usedGoats = [];
  console.log(usedGoats);
  usedGoats.push(goat1, goat2);
}

function handleGoatClick(event) {
  if (event.target === goatContainer) {
    alert("Please click on an image");
  }
  clicks++;
  let clickGoat = event.target.alt;
  for (let i = 0; i < state.allGoatsArray.length; i++) {
    if (clickGoat === state.allGoatsArray[i].name) {
      state.allGoatsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    goatContainer.removeEventListener("click", handleGoatClick);
    resultButton.addEventListener("click", renderChart);
    // resultButton.className = "clicks-allowed";
    goatContainer.className = "no-voting";
  } else {
    renderGoats();
  }
}

// function renderResults() {
//   let ul = document.querySelector("ul");
//   for (let i = 0; i < state.allGoatsArray.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = `${state.allGoatsArray[i].name} had ${state.allGoatsArray[i].views} views and was clicked ${state.allGoatsArray[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

function renderChart() {
  const labelArray = [];
  const clicksArray = [];
  const viewsArray = [];

  for (let i = 0; i < state.allGoatsArray.length; i++) {
    let thisGoat = state.allGoatsArray[i];
    labelArray.push(thisGoat.name);
    clicksArray.push(thisGoat.clicks);
    viewsArray.push(thisGoat.views);
  }

  const data = {
    labels: labelArray,
    datasets: [
      {
        label: "Views",
        data: viewsArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
      {
        label: "Clicks",
        data: clicksArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    responsive: true,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      // indexAxis: "y",
    },
  };
  const canvasChart = document.getElementById("myChart");
  new Chart(canvasChart, config);
}

let bag = new Goat('bag', '.images/bag.jpg');
let banana = new Goat('banana', '.images/banana.jpg');
let bathroom = new Goat('bathroom', '.assets/images/bathroom.jpg');
let boots = new Goat('boots', '.images/boots.jpg');
let breakfast = new Goat('breakfast', '.images/breakfast.jpg');
let bubblegum = new Goat('bubblegum', '.images/bubblegum.jpg');
let chair = new Goat('chair', './images/chair.jpg');
let cthulhu = new Goat('cthulhu', './images/cthulhu.jpg');
let dogDuck = new Goat('dog-duck', './images/dog-duck.jpg');
let dragon = new Goat('dragon', './images/dragon.jpg');
let pen = new Goat('pen', './images/pen.jpg');
let petSweep = new Goat('pet-sweep', './images/pet-sweep.jpg');
let scissors = new Goat('scissors', './images/scissors.jpg');
let shark = new Goat('shark', './images/shark.jpg');
let sweep = new Goat('sweep', './images/sweep.jpg');
let tauntaun = new Goat('tauntaun', './images/tauntaun.jpg');
let unicorn = new Goat('unicorn', './/images/unicorn.jpg');
let waterCan = new Goat('water-can', './/images/water-can.jpg');
let wineGlass = new Goat('wine-glass', './images/wine-glass.jpg');

state.Goat.push(bag,banana,bathroom,boots,breakfast,bubblegum,chair,cthulhu,dogDuck,dragon,pen,petSweep,scissors,shark,sweep,tauntaun,unicorn,waterCan,wineGlass);

renderGoats();

goatContainer.addEventListener("click", handleGoatClick);