import MovieCard from "../components/MovieCard";

const ListingMovie = ({ movieList, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="p-4">
      {movieList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg">Aucun film trouvé.</p>
      )}
    </div>
  );
};

export default ListingMovie;
