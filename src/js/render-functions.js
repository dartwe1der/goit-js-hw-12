import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = (images) => {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <span>Likes: ${likes}</span>
        <span>Views: ${views}</span>
        <span>Comments: ${comments}</span>
        <span>Downloads: ${downloads}</span>
      </div>
    </li>
  `).join('');
  
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  galleryContainer.innerHTML = '';
};

export const showLoader = () => {
  document.getElementById('loader').classList.add('show');
};

export const hideLoader = () => {
  document.getElementById('loader').classList.remove('show');
};

export const showLoadMoreButton = () => {
  document.querySelector('.load-more').classList.add('visible');
};

export const hideLoadMoreButton = () => {
  document.querySelector('.load-more').classList.remove('visible');
};
