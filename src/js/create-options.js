import API from './cat-api';
import { showError } from '../index';
import getRefs from '../js/get-refs';

const refs = getRefs();

// отримання API та додавання <options> у select
function createOptions() {
  API.fetchBreeds()
    .then(getAllIds)
    .catch(error => {
      if (error) {
        showError();
      }
    })
}

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

export default createOptions;
