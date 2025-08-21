import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let totalFetched = 0; // кількість завантажених зображень
const perPage = 15; // кількість зображень за один запит

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Обробник сабміту форми
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();
  // скидаємо сторінку і лічильники при новому пошукові
  currentPage = 1;
  totalFetched = 0;

  hideLoadMoreButton();

  // очищуємо галерею
  clearGallery();

  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    // response містить { hits, totalHits }
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    createGallery(response.hits);
    totalHits = response.totalHits;
    totalFetched = response.hits.length;

    if (totalFetched < totalHits) {
      showLoadMoreButton();
    }

    // прокрутка до верху
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

// Обробник кліку по кнопці "Load more"
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

  // збільшуємо номер сторінки
  currentPage += 1;

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    const images = response.hits;

    // додаємо нові зображення у галерею
    createGallery(images);
    totalFetched += images.length;

    // прокрутка на висоту однієї карточки
    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    // перевіряємо, чи досягли кінця
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
