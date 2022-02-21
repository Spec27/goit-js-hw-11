import './sass/main.scss';
import GaleryApiSerwice from './api-service';
import imagesTpl from './templates/sample.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galeryContainer: document.querySelector('.gallery'),
  loadMareBtn: document.querySelector('[data-action="load-more"]'),
};

const galeryApiSerwice = new GaleryApiSerwice();

refs.searchForm.addEventListener('submit', onSerch);
refs.loadMareBtn.addEventListener('click', onloadMore);
refs.loadMareBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  scrollZoom: true,
  captionDelay: 250,
  captionsData: 'alt',
  doubleTapZoom: 2,
});

function onSerch(e) {
  e.preventDefault();
  galeryApiSerwice.query = e.currentTarget.elements.searchQuery.value.trim();
  galeryApiSerwice.resetPage();
  if (galeryApiSerwice.query === '') {
    Notiflix.Notify.failure('❌ Ведите коректный запрос');
    return;
  }

  galeryApiSerwice.fetchImg().then(response => {
    clearImagesContainer();
    refs.loadMareBtn.classList.remove('is-hidden');
    appendImagesMarcup(response);
    lightbox.refresh();
    Notiflix.Notify.info(`✨ Hooray! We found ${response.totalHits} images.`);

    if (response.hits.length === 0) {
      Notiflix.Notify.failure(
        '❌Sorry, there are no images matching your search query. Please try again.',
      );
      refs.loadMareBtn.classList.add('is-hidden');
      return;
    }
  });
}

function onloadMore() {
  galeryApiSerwice
    .fetchImg()
    .then(response => {
      appendImagesMarcup(response);
      lightbox.refresh();
      if (response.hits.length < 40) {
        refs.loadMareBtn.classList.add('is-hidden');
        Notiflix.Notify.success('Images are out! BYE BRO! Or pay money! 💰');
      }
    })
    .catch(Error);
}

function appendImagesMarcup(response) {
  refs.galeryContainer.insertAdjacentHTML('beforeend', imagesTpl(response));
}

function clearImagesContainer() {
  refs.galeryContainer.innerHTML = '';
}
