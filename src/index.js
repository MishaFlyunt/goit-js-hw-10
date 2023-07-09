import './css/load.css';
import './css/style.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import getRefs from './js/get-refs';
const refs = getRefs();

const API_KEY =
  'live_xWxjHer6UZJgTibODO7LcNwB3HbveIjBzm2iA6eM3Euofuyy1FaMOakwuRKJSIWv';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function populateBreeds(breeds) {
  refs.selectElement.innerHTML = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
}

function showLoader() {
  refs.loaderElement.style.display = 'block';
}

function hideLoader() {
  refs.loaderElement.style.display = 'none';
}

function showError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function showCatInfo(catInfo) {
  refs.catInfoElement.innerHTML = `
    <img class="imges-cat" src="${catInfo.imgCatUrl}" width="440" height="400">
    <div class="text-content">
      <p class="cat-name">${catInfo.catName}</p>
      <p class="cat-description"><b>Description: </b>${catInfo.catDesc}</p>
      <p class="cat-temperament"><b>Temperament: </b>${catInfo.catTemp}</p>
    </div>
  `;
  // refs.catInfoElement.style.display = 'block';
  refs.catInfoElement.classList.remove('is-hidden');
}

function hideCatInfo() {
  // refs.catInfoElement.style.display = 'none';
  refs.catInfoElement.classList.add('is-hidden');
}

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;
    populateBreeds(breeds);
    // refs.selectContainer.style.display = 'block';
    refs.selectContainer.classList.remove('is-hidden');
    refs.titleElement.classList.remove('is-hidden');
  } catch (error) {
    console.error(error);
    showError();
  } finally {
    hideLoader();
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catInfo = {
      imgCatUrl: response.data[0].url,
      catName: response.data[0].breeds[0].name,
      catDesc: response.data[0].breeds[0].description,
      catTemp: response.data[0].breeds[0].temperament,
    };
    showCatInfo(catInfo);
  } catch (error) {
    console.error(error);
    showError();
  } finally {
    hideLoader();
  }
}

refs.selectElement.addEventListener('change', function () {
  const selectedBreedId = this.value;
  if (selectedBreedId) {
    showLoader();
    hideCatInfo();
    fetchCatByBreed(selectedBreedId);
  } else {
    hideCatInfo();
  }
});

// refs.selectContainer.style.display = 'none';
refs.selectContainer.classList.add('is-hidden');
refs.titleElement.classList.add('is-hidden');
showLoader();

fetchBreeds();
