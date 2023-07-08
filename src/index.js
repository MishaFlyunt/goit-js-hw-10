import './css/load.css';
import './css/style.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './js/cat-api';
import getRefs from './js/get-refs';
import createOption from './js/create-options';

const refs = getRefs();
refs.select.addEventListener('change', onSelectView);

createOption();
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
  let imgCatUrl = arrCats.map(link => link.url);
  let catDesc = arrCats.map(link => link.breeds[0].description);
  let catTemp = arrCats.map(link => link.breeds[0].temperament);

  const markUp = `
    <img class="imges-cat" src="${imgCatUrl}" width="440" height="400">
    <div class="text-content">
      <p class="cat-description"><b>Description: </b>${catDesc}</p>
      <p class="cat-temperament"><b>Temperament: </b>${catTemp}</p>
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
