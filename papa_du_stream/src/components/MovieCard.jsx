import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/favoriteSlice";
import { Link } from "react-router"; // Corrigé ici (tu avais "react-router" au lieu de "react-router-dom")
import { Heart } from "lucide-react";

const MovieCard = ({ movie, imageSize = "w500" }) => {
    const dispatch = useDispatch();
    const isFave = useSelector((state) =>
        state.favorite.favorites.some((m) => m.id === movie.id)
    );

    const handleClickFave = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(movie));
    };

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="relative hover:shadow-lg group text-left"
        >
            <img
                src={`https://image.tmdb.org/t/p/${imageSize}${movie.poster_path}`}
                alt={movie.title}
                className="object-cover w-full h-full rounded-lg"
            />

            <div className="absolute bottom-0 left-0 inset-0 bg-gradient-to-br from-black from-5% via-transparent to-black to-95% rounded-lg
                group-hover:bg-black group-hover:opacity-70 group-hover:border-8 border-gray-500 group-hover:blur
                transition-all duration-150 ease-in">
            </div>

            <div className="absolute top-0 left-0 w-full p-4 scale-0 group-hover:scale-100 flex flex-col space-y-3 transition-all duration-100 ease-in">
                <p className="text-sm font-bold text-white">{movie.title}</p>
                <small className="text-xs font-bold text-white">{movie.release_date}</small>
                <p className="text-xs text-gray-300 hidden group-hover:block line-clamp-4">{movie.overview}</p>
            </div>

            <div className="absolute bottom-0 right-0 p-2">
                <button onClick={handleClickFave}>
                    <Heart
                        size={20}
                        className={isFave ? "text-red-500 fill-red-500" : "text-gray-500"}
                    />
                </button>
            </div>

            {/* Note: Ajoute une note ou note TMDB si dispo */}
            <div className="hidden absolute bottom-0 left-0 p-2 group-hover:block">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 text-yellow-500">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm font-bold">
                        {movie.vote_average ? `${Math.round(movie.vote_average * 10)}%` : "N/A"}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
