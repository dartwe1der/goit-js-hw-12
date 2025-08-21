import axios from 'axios';

const API_KEY = '51878894-a5638140813a030bb43789a30';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
  } catch (error) {
    throw new Error('Unable to fetch images');
  }
};