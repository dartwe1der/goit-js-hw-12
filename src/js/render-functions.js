import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

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
  
  galleryContainer.innerHTML = markup;
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