const API_KEY = "29ddca237cfb0afec3db16266ec5fc56";

const categories = [
  {
    "name": "tranding",
    "title": "Recomendados para voce",
    "path": `/trending/all/week?api_key=${API_KEY}&language=pt-BR`, 
    "isLarge": true
  },
  {
    "name": "netflixOriginals",
    "title": "Originais Netflix",
    "path": `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    "isLarge": false
  },
  {
    "name": "topRated",
    "title": "Populares",
    "path": `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
    "isLarge": false
  },
  {
    "name": "action",
    "title": "Ação",
    "path": `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    "isLarge": false
  },
  {
    "name": "comedy",
    "title": "Comedias",
    "path": `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    "isLarge": false
  },
  {
    "name": "horror",
    "title": "Terror",
    "path": `/discover/movie?api_key=${API_KEY}&whit_genres=27`,
    "isLarge": false
  },
  {
    "name": "romances",
    "title": "Romances",
    "path": `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    "isLarge": false
  },
  {
    "name": "documentary",
    "title": "Documentario",
    "path": `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    "isLarge": false
  },
  
  
];

export const getMovies = async (path) => {
  try {
    let url = `https://api.themoviedb.org/3${path}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
    } catch (error) {
      console.log(error);
    
  }
};

export default categories;
