import API from './cat-api';
import index from '../index';

// отримання API та додавання <options> у select
function createOptions() {
  API.fetchBreeds()
    .then(getAllIds)
    .catch(error => {
      if (error) {
        index.showError();
      }
    });
}

function getAllIds(arr) {
  const breedSelect = document.querySelector('.breed-select');

  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i].id;
    let text = arr[i].name;

    const optionsElement = document.createElement('option');
    optionsElement.value = value;
    optionsElement.textContent = text;
    breedSelect.appendChild(optionsElement);
  }
}

export default createOptions;
