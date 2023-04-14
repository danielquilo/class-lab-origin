'use strict';
// console.log('works!');

// ********************************* Selectors *********************************
let productsContainer = document.querySelector('.images-container');
let resultContainer = document.querySelector('.result-container');
let resultList = document.querySelector('.result-list');
let resultText = document.querySelector('.results-text');
let totalViews = document.querySelector('.total-views');
let image1 = document.querySelector('.images-container img:nth-child(1)');
let image2 = document.querySelector('.images-container img:nth-child(2)');
let image3 = document.querySelector('.images-container img:nth-child(3)');
// console.log(totalViews);

// Data
let clicks = 0;
let maxClicksAllowed = 25;

const state = {
products: [],
};

// ********************************* Random function **********************************
function getRandomNumber() {
return Math.floor(Math.random() * state.products.length);
}

// *********************************** Constructor ************************************
function Product(name, src) {
this.name = name;
this.src = src;
this.views = 0;
this.clicks = 0;
}

// ********************************** Create products **********************************
let bag = new Product('Bag', './assets/images/bag.jpg');
let banana = new Product('Banana', './assets/images/banana.jpg');
let bathroom = new Product('Bathroom', './assets/images/bathroom.jpg');
let boots = new Product('Boots', './assets/images/boots.jpg');
let breakfast = new Product('Breakfast', './assets/images/breakfast.jpg');
let bubblegum = new Product('Bubblegum', './assets/images/bubblegum.jpg');
let chair = new Product('Chair', './assets/images/chair.jpg');
let cthulhu = new Product('Cthulhu', './assets/images/cthulhu.jpg');
let dogDuck = new Product('Dog-duck', './assets/images/dog-duck.jpg');
let dragon = new Product('Dragon', './assets/images/dragon.jpg');
let pen = new Product('Pen', './assets/images/pen.jpg');
let petSweep = new Product('Pet-sweep', './assets/images/pet-sweep.jpg');
let scissors = new Product('Scissors', './assets/images/scissors.jpg');
let shark = new Product('Shark', './assets/images/shark.jpg');
let sweep = new Product('Sweep', './assets/images/sweep.jpg');
let tauntaun = new Product('Tauntaun', './assets/images/tauntaun.jpg');
let unicorn = new Product('Unicorn', './assets/images/unicorn.jpg');
let waterCan = new Product('Water Can', './assets/images/water-can.jpg');
let wineGlass = new Product('Wine Glass', './assets/images/wine-glass.jpg');

state.products.push(
bag,
banana,
bathroom,
boots,
breakfast,
bubblegum,
chair,
cthulhu,
dogDuck,
dragon,
pen,
petSweep,
scissors,
shark,
sweep,
tauntaun,
unicorn,
waterCan,
wineGlass
);

// ********************************* Render function *********************************
let prevProduct1 = '';
let prevProduct2 = '';
let prevProduct3 = '';

function renderProducts() {
let prod1 = getRandomNumber();
let prod2 = getRandomNumber();
let prod3 = getRandomNumber();

// Function not repeat image 1
while (
prod1 === prevProduct1 ||
prod1 === prevProduct2 ||
prod1 === prevProduct3
) {
prod1 = getRandomNumber();
}

// Functions not repeat image 2 and image 3
while (prod2 === prod1 || prod3 === prod1 || prod3 === prod2) {
prod2 = getRandomNumber();
prod3 = getRandomNumber();
}

// Function not repeat image 2
while (prod2 === prevProduct1 || prod2 === prevProduct2 || prod2 === prod1) {
prod2 = getRandomNumber();
}

// Function not repeat image 3
while (
prod3 === prevProduct1 ||
prod3 === prevProduct2 ||
prod3 === prevProduct3 ||
prod3 === prod1 ||
prod3 === prod2
) {
prod3 = getRandomNumber();
}

// console.log('------------');
// console.log(prod1, prod2, prod3);

// Save previews images
prevProduct1 = prod1;
prevProduct2 = prod2;
prevProduct3 = prod3;

// Add images src and name and RENDER
image1.name = state.products[prod1].name;
image1.alt = state.products[prod1].name;
image1.src = state.products[prod1].src;

image2.name = state.products[prod2].name;
image2.alt = state.products[prod2].name;
image2.src = state.products[prod2].src;

image3.name = state.products[prod3].name;
image3.alt = state.products[prod3].name;
image3.src = state.products[prod3].src;

// Update clicks
state.products[prod1].views++;
state.products[prod2].views++;
state.products[prod3].views++;
}

// ********************************* Handle Clicks *********************************
function handleImagesClick(event) {
// Update clicks
clicks++;

// Update products clicks
let productClicked = event.target.alt;
// console.log(productClicked);
for (let i = 0; i < state.products.length; i++) {
if (productClicked === state.products[i].name) {
state.products[i].clicks++;
break;
}
}

// Check maxClicksAllowed
if (clicks === maxClicksAllowed) {
image1.removeEventListener('click', handleImagesClick);
image2.removeEventListener('click', handleImagesClick);
image3.removeEventListener('click', handleImagesClick);

renderResults();
renderChart();
} else {
renderProducts();
resultText.textContent = `-> will be shown at the end, after ${
maxClicksAllowed - clicks
} views`;
}
}

image1.addEventListener('click', handleImagesClick);
image2.addEventListener('click', handleImagesClick);
image3.addEventListener('click', handleImagesClick);

// ********************************* Render Results *********************************
function renderResults() {
for (let i = 0; i < state.products.length; i++) {
let li = document.createElement('li');

if (state.products[i].views > 1) {
li.textContent = `- ${state.products[i].name}: had ${state.products[i].views} views and was clicked ${state.products[i].clicks} times.`;
}
resultList.appendChild(li);
totalViews.textContent = `${clicks} views`;
resultText.textContent = '';
}
}

// ****************************** Render Chart Results *******************************
function renderChart() {
let productsArray = [];
let clicksArray = [];
let viewsArray = [];

for (let i = 0; i < state.products.length; i++) {
let info = state.products[i];
productsArray.push(info.name);
clicksArray.push(info.clicks);
viewsArray.push(info.views);
}
// console.log(productsArray, clicksArray, viewsArray);
const data = {
labels: productsArray,
datasets: [
{
label: 'Views',
data: viewsArray,
backgroundColor: "#A78DA4",
borderColor: "black",
borderWidth: 2,

},
{
label: 'Clicks',
data: clicksArray,
backgroundColor: "#9F0D3D",
borderColor: "black",
borderWidth: 2,
},
],
};
const config = {
	type: 'bar',
	data: data,
	obackgroundColor: "#A78DA4",ptions: {
	  scales: {
	    y: {
	      beginAtZero: true
	    }
	  }
	},
        };
const canvasChart = document.getElementById('chart');
new Chart(canvasChart, config);
}

// ********************************* Render Products ********************************
renderProducts();

// console.log(state.products);