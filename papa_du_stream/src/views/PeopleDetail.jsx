import { useEffect, useState } from "react";
import { useParams } from "react-router";
import movieApi from "../api/movieApi";
import MovieCard from '../components/MovieCard';

const PeopleDetail = () => {
  const { people_id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieApi
      .get(`/person/${people_id}`)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des informations de la personne :", error));

    movieApi
      .get(`/person/${people_id}/movie_credits`)
      .then((response) => {
        setMovies(response.data.cast);
      })
      .catch((error) => console.error("Erreur lors de la récupération des films de la personne :", error));
  }, [people_id]);

  if (!person) return <p className="text-center text-gray-300">Chargement...</p>;

  return (
    <div className="container mx-auto p-4 text-gray-300 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
          alt={person.name}
          className="w-48 h-48 object-cover rounded-full shadow-lg mb-4 md:mb-0"
        />
        <div className="md:ml-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white">{person.name}</h1>
          <p className="text-gray-400 mt-2">{person.biography || "Aucune biographie disponible."}</p>
          <p className="mt-4 text-gray-500">Né(e) le : {person.birthday}</p>
          {person.deathday && <p className="text-gray-500">Décédé(e) le : {person.deathday}</p>}
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Films notables :</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default PeopleDetail;
