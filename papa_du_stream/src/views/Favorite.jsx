import { useSelector } from "react-redux";
import ListingMovie from "../containers/ListingMovie";

const Favorite = () => {
    const favoriteMovies = useSelector((state) => state.favorite.favorites); 

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mes Favoris</h1>
            {favoriteMovies.length > 0 ? (
                <ListingMovie movieList={favoriteMovies} />
            ) : (
                <p className="text-center text-gray-500 text-lg">Aucun film en favori.</p>
            )}
        </div>
    );
};

export default Favorite;
