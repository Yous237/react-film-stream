import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import movieApi from "../api/movieApi";
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRating } from '../redux/ratingSlice';

const MovieDetail = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
const dispatch = useDispatch();
const ratings = useSelector(state => state.rating.ratings);


useEffect(() => {
  if (movie) {
    const saved = ratings.find(r => r.movieId === movie.id);
    if (saved) setNote(saved.note);
  }
}, [movie, ratings]);


const handleRating = () => {
  if (!note) return;
  dispatch(toggleRating({ 
    movieId: movie.id, 
    movieData: movie, 
    note: parseFloat(note) 
  }));
};

  useEffect(() => {
    movieApi.get(`/movie/${movie_id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error("Erreur lors de la récupération du film :", error));

    movieApi.get(`/movie/${movie_id}/credits`)
      .then(response => setCredits(response.data))
      .catch(error => console.error("Erreur lors de la récupération du casting :", error));

    movieApi.get(`/movie/${movie_id}/similar`)
      .then(response => setSimilarMovies(response.data.results))
      .catch(error => console.error("Erreur lors de la récupération des films similaires :", error));

    movieApi.get(`/movie/${movie_id}/videos`)
      .then(response => {
        const trailer = response.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) setTrailerKey(trailer.key);
      })
      .catch(error => console.error("Erreur lors de la récupération de la bande-annonce :", error));
  }, [movie_id]);

  if (!movie) return <p className="text-center text-gray-300">Chargement...</p>;

  return (
    <div className="container mx-auto p-4 text-gray-300 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3 ml-0 md:ml-8">
          <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-lg">{movie.overview}</p>
          <div className="mt-6">
  <label className="block text-white mb-2">note du film (sur 10) :</label>
  <input 
    type="number" 
    min="0" max="10" 
    value={note} 
    onChange={(e) => setNote(e.target.value)} 
    className="px-2 py-1 rounded text-white"
  />
  <button onClick={handleRating} className="ml-4 px-3 py-1 bg-green-600 text-white rounded">
    Noter
  </button>
</div>
          {trailerKey && (
            <button onClick={() => setShowModal(true)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md">
              Voir la bande-annonce
            </button>
          )}
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Acteurs principaux :</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {credits && credits.cast.slice(0, 6).map(actor => (
              <div key={actor.id} className="text-center">
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-2" />
                <h3 className="font-semibold text-gray-300">{actor.name}</h3>
                <p className="text-sm text-gray-500">{actor.character}</p>
                <Link to={`/people/${actor.id}`} className="text-blue-400 hover:underline">Voir plus</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Films Similaires :</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {similarMovies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white text-xl">×</button>
            <div className="relative aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 md:h-96"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
