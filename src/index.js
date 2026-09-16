import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_xLAFfrABBZjqLXpfZvgnaLdzyNR4SVF7nnNsVEdYVGKFjZI2mGsLQd99QdCvwP1B";

const selectBreed = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")

selectBreed.classList.add("is-hidden")
error.classList.add("is-hidden")
fetchBreeds().then(breeds => {
    const markup = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
    selectBreed.classList.remove("is-hidden")
    loader.classList.add("is-hidden")
    selectBreed.insertAdjacentHTML("beforeend", markup);
}).catch(() => {
    loader.classList.add("is-hidden")
    error.classList.remove("is-hidden")
});


selectBreed.addEventListener("change", event => {
    catInfo.innerHTML = "";
    loader.classList.remove("is-hidden")
    catInfo.classList.add("is-hidden")
    error.classList.add("is-hidden")
    fetchCatByBreed(event.currentTarget.value).then(catData => {
        const dataMarkup = catData.map(data => `<img src="${data.url}" class="img"> <div><p>${data.breeds[0].name}</p><p>${data.breeds[0].description}</p><p>${data.breeds[0].temperament}</p></div>`).join("");
        catInfo.classList.remove("is-hidden")
        loader.classList.add("is-hidden")
        catInfo.insertAdjacentHTML("beforeend", dataMarkup);
    }).catch(() => {
        loader.classList.add("is-hidden")
        error.classList.remove("is-hidden");
    });
})