import './css/load.css';
import './css/style.css';

import SlimSelect from 'slim-select';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './js/cat-api';
import getRefs from './js/get-refs';
import createOption from './js/create-options'

const refs = getRefs();
refs.select.addEventListener('change', onSelectView);

createOption();
// Отримання об'єкта з вибраною породою та створення розмітки
function onSelectView() {
  const breedId = selectedBreeds();
  const isContent = document.querySelector('.img-cat');

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

// Getting Breed from Select
function selectedBreeds() {
  const selectedValue = refs.select.options[refs.select.selectedIndex];
  // const selectedText = selectedValue.textContent;
  const selectedId = selectedValue.value;

  return selectedId;
}

function renderCatsCard(arrCats) {
  let imgCatUrl = arrCats.map(link => link.url);
  let catDesc = arrCats.map(link => link.breeds[0].description);
  let catTemp = arrCats.map(link => link.breeds[0].temperament);

  const markUp = `
    <img class="img-cat" src="${imgCatUrl}" width="440" height="400">
    <div class="intro">
      <p class="cat-info"><b>Description: </b>${catDesc}</p>
      <p class="cat-info"><b>Temperament: </b>${catTemp}</p>
    </div>
  `;

  refs.catsContainer.insertAdjacentHTML('beforeend', markUp);
}

function showLoadingMessage() {
  // refs.loading.style.display = 'block';
}

// Hide loading message
function hideLoadingMessage() {
  refs.loading.style.display = 'none';
}

//Show error
function showError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

// Remove all childs from .cat-info
function clearCatContainer() {
  const children = Array.from(refs.catsContainer.children);

  // Check every child element
  children.forEach(child => {
    // if not a close btn
    if (child !== refs.select) {
      refs.catsContainer.removeChild(child);
    }
  });
}

// new SlimSelect({
//   select: '#selectElement',
// });


