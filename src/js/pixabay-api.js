import iziToast from "izitoast"

import axios from 'axios';

const URL = 'https://pixabay.com/api/'

const API_KEY = '45189521-352d969f92f63c5bc874c10a6'

axios.defaults.baseURL = URL


export async function searchByQuery(
    { page = 1, per_page = 15, q = "" } = {}
  ) {
    try {
    const { data } = await axios
      .get('', {
        params: {
          page,
          per_page,
          q,
          key: API_KEY,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true
        },
      })
      return data
  } catch (error) {
    throw new Error(`Error fetching data ${error.message}`)
  } 
}



// return fetch(`${URL}?${params}`).then((res) => {
//     if (!res.ok) {
//         throw new Error(res.status)
//         iziToast.error({
//             message: "Sorry, there are no images matching your search query. Please try again!"
//         })
//     }
//     return res.json()
// })

// }
