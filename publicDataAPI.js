import youTube from './API/youtube.js';

const search = async (term) => {
  try {
    const responce = await youTube.get('/search', {
      params: {
        q: term,
      },
    });

    return responce.data;
  } catch (e) {
    return e;
  }
};




