import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const submitBtn = form.querySelector('button[type="submit"]');

const mainEl = document.querySelector('main');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(query);

    if (!images || images.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      return;
    }

    createGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
});
