import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const getGallery = async (query, page) => {
  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&key=36957207-c1d21013f0aa2c58ca97c354a&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
