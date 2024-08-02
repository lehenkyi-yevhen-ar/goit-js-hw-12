import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderGallery } from "./js/render-functions";

import { searchByQuery } from "./js/pixabay-api";

import ButtonService from "./js/render-functions";

const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const loadMore = new ButtonService(loadMoreBtn, "is-hidden");

// function showLoadMoreBtn() {
//     loadMoreBtn.classList.remove('hidden');
// }

// function hideLoadMoreBtn() {
//     loadMoreBtn.classList.add('hidden');
// }

// function enableLoadMoreBtn() {
//     loadMoreBtn.disabled = false
// }


const form = document.querySelector('.search-form')

const loadingIndicator = document.querySelector('.loader');

const galleryContainer = document.querySelector('#gallery-container');

const params = {
    page: 1,
    per_page: 15,
    q: "",
    maxPage: 0,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true
}

form.addEventListener('submit', handleSearch)

function showLoadingIndicator() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoadingIndicator() {
    loadingIndicator.classList.add('hidden');
}

loadMore.hide()

async function handleSearch(event) {
    event.preventDefault()

    const form = event.currentTarget
    if (form) {
    galleryContainer.innerHTML = ''
    }

    const queryValue = event.currentTarget.elements.query.value.trim().toLowerCase()
    if (queryValue === '') {
        iziToast.info({
            message: 'Type something to find!'
        })
        return
    } 

    showLoadingIndicator();

    

    params.page = 1
    params.q = queryValue

    try {
        const data = await searchByQuery(params)

        params.maxPage = Math.ceil(data.totalHits / params.per_page)


        hideLoadingIndicator();
        renderGallery(data)

        if (params.maxPage > 1) {
            loadMore.show()
            loadMore.enable();
            loadMoreBtn.addEventListener('click', handleLoadMore);
        } else {
            loadMore.hide()
        }
    } catch (error) {
        iziToast.error({
            message: `Помилка під час запиту: ${error.message} `
        })
    } finally {
        if (form) {
            form.reset();
        }}
    }


    async function handleLoadMore() {
        params.page += 1;

        loadMore.hide()
        showLoadingIndicator();
        
        try {
            const data = await searchByQuery(params);
            hideLoadingIndicator();
            renderGallery(data, true); 
            loadMore.enable()
            loadMore.show()
            let card = document.querySelector('.image-wrapper')
            let rect = card.getBoundingClientRect(); 
            window.scrollBy({
                top: (2 *rect.height),
                behavior: 'smooth'
            })
        } catch (error) {
            iziToast.error({
                message: `Error during the request: ${error.message}`
            });
        } finally {
            if (params.page === params.maxPage) {
                loadMore.hide();
                loadMoreBtn.removeEventListener('click', handleLoadMore);
                iziToast.info({message:"We're sorry, but you've reached the end of search results."})
        }
    }}