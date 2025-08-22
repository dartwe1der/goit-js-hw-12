import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { lightbox } from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let totalFetched = 0;

const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();

  if (currentQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  totalFetched = 0;

  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(response.hits);
    totalHits = response.totalHits;
    totalFetched = response.hits.length;

    if (totalFetched >= totalHits) {
      return;
    } else {
      showLoadMoreButton();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  if (totalFetched >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }
  showLoader();
  currentPage += 1;

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    const images = response.hits;

    createGallery(images);
    totalFetched += images.length;

    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (totalFetched >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
