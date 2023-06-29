import axios from 'axios';
const API_KEY = '36957207-c1d21013f0aa2c58ca97c354a';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}