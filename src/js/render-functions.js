import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('#gallery-container');


let lightbox = new SimpleLightbox('#gallery-container a', {
    captionsData: 'title',
    captions: true,
    captionDelay: 250,
    overlay: true,
    captionPosition: 'bottom',
});

export function renderGallery(data) {
    if (data.hits.length === 0) {
        iziToast.info({
            title: 'No results found',
            message: 'Try a different search term.',
        });
        return;
    }

    const galleryHTML = data.hits.map(hit => `
        <a href="${hit.largeImageURL}" data-lightbox="gallery" title="Tags: ${hit.tags}">
            <div class="image-wrapper">
                <img src="${hit.previewURL}" alt="${hit.tags}" title="
                Tags: ${hit.tags} 
            ">
            <div class="caption">
                <div class="su-caption">
                Likes ${hit.likes} </div>
                <div class="su-caption">
                Views ${hit.views} </div>
                <div class="su-caption">
                Comments ${hit.comments} </div>
                <div class="su-caption">
                Downloads ${hit.downloads} </div>
            </div>
            </div>
        </a>
    `).join('');

    galleryContainer.insertAdjacentHTML('beforeend', galleryHTML)


    lightbox.refresh()
}

export default class ButtonService {
    constructor(buttonEL, hiddenClass) {
      this.buttonEL = buttonEL;
      this.hiddenClass = hiddenClass;
    }
  
    hide() {
      this.buttonEL.classList.add(this.hiddenClass);
    }
  
    show() {
      this.buttonEL.classList.remove(this.hiddenClass);
    }
  
    disable() {
      this.buttonEL.disabled = true;
    }
  
    enable() {
      this.buttonEL.disabled = false;
    }
  }