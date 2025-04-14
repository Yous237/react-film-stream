import { useEffect, useState } from 'react';
import movieApi from '../api/movieApi';
import ListingMovie from '../containers/ListingMovie';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = (page) => {
    const endpoint = search.trim() === '' ? '/discover/movie' : '/search/movie';
    const params = {
      page,
      include_adult: false,
      language: 'en-US',
    };
    if (search.trim() !== '') {
      params.query = search;
    }

    movieApi
      .get(endpoint, { params })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 10)); 
      })
      .catch((error) => console.error("Erreur lors de la récupération des films :", error));
  };

  useEffect(() => {
    setCurrentPage(1); 
    fetchMovies(1);
  }, [search]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <>
  <br />
      <SearchBar search={search} setSearch={setSearch} />
      <ListingMovie 
        movieList={movies} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </>
  );
};

export default HomePage;
