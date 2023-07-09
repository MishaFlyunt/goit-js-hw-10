import './css/load.css';
import './css/style.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './js/cat-api';
import getRefs from './js/get-refs';
// import { createOption } from './js/create-options';

const refs = getRefs();
refs.select.addEventListener('change', onSelectView);

// createOption();
// Отримання об'єкта з вибраною породою та створення розмітки
function onSelectView() {
  const breedId = selectedBreeds();
  const isContent = document.querySelector('.imges-cat');

  if (isContent) {
    clearCatContainer();
  }

  // Показати повідомлення про завантаження
  showLoadingMessage();

  API.fetchCatByBreed(breedId)
    .then(renderCatsCard)
    .catch(showError)
    .finally(hideLoadingMessage);
}

function selectedBreeds() {
  const selectedValue = refs.select.options[refs.select.selectedIndex];
  const selectedId = selectedValue.value;

  return selectedId;
}

function renderCatsCard(arrCats) {
  const catInfo = {
    imgCatUrl: arrCats.map(link => link.url),
    catName: arrCats.map(link => link.breeds[0].name),
    catDesc: arrCats.map(link => link.breeds[0].description),
    catTemp: arrCats.map(link => link.breeds[0].temperament),
  };

  const markUp = `
    <img class="imges-cat" src="${catInfo.imgCatUrl}" width="440" height="400">
    <div class="text-content">
      <p class="cat-name">${catInfo.catName}</p>
      <p class="cat-description"><b>Description: </b>${catInfo.catDesc}</p>
      <p class="cat-temperament"><b>Temperament: </b>${catInfo.catTemp}</p>
    </div>
  `;

  refs.catsContainer.insertAdjacentHTML('beforeend', markUp);
}

function showLoadingMessage() {
  refs.loading.style.display = 'block';
}
function hideLoadingMessage() {
  refs.loading.style.display = 'none';
}

function showError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function clearCatContainer() {
  const children = Array.from(refs.catsContainer.children);

  children.forEach(child => {
    if (child !== refs.select) {
      refs.catsContainer.removeChild(child);
    }
  });
}

function createOptions() {
  refs.select.style.display = 'none';
  showLoadingMessage();
  API.fetchBreeds()
    .then(getAllIds)
    .catch(refs.select.style.display = 'block', hideLoadingMessage());
  // refs.select.style.display = 'block';
}
createOptions();

function getAllIds(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i].id;
    let text = arr[i].name;

    const optionsElement = document.createElement('option');
    optionsElement.value = value;
    optionsElement.textContent = text;
    refs.select.appendChild(optionsElement);
  }
}

// refs.select.style.display = 'none';
// showLoadingMessage();
