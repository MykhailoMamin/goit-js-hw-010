import axios from "axios";
export { fetchBreeds, fetchCatByBreed };

function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds").then(response => {
        return response.data;
    })
}

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => {
        return response.data;
    })
}