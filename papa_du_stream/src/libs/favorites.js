const key = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();
  localStorage.setItem(key, JSON.stringify([...favorites, movie]));
};

export const removeFavorite = (movieId) => {
  const favorites = getFavorites().filter(movie => movie.id !== movieId);
  localStorage.setItem(key, JSON.stringify(favorites));
};

export const isFavorite = (movieId) => {
  return getFavorites().some(movie => movie.id === movieId);
};
