import Movies from "./Movies";

const ListPage = ({ movies, shownMovies, search, checked, error }) => {
  const checkGenre = (movie) => {
    // if (movie.genreList && checked.length !== 0) {
    //   let foundG = false;
    //   movie.genreList.forEach((el) => {
    //     let gName = el.value.toLowerCase();
    //     if (checked.includes(gName)) {
    //       foundG = true;
    //     }
    //   });
    if (movie.genreList && checked.length !== 0) {
      let foundG = true;
      let newGList = [];
      movie.genreList.forEach((element) => {
        newGList.push(element.value.toLowerCase());
      });
      checked.forEach((el) => {
        let gName = el.toLowerCase();
        if (!newGList.includes(gName)) {
          foundG = false;
        }
      });
      return foundG;
    } else {
      return true;
    }
  };

  return (
    <div className="list-page">
      <h3 className="shown-movies">{error && <span>{error}</span>}</h3>
      {movies && (
        <div>
          <h3 className="shown-movies">
            {movies.length !== 0 && <span>{shownMovies}</span>}
            {movies.length === 0 && <span>Loading...</span>}
          </h3>
          <Movies
            movies={movies.filter(
              (movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase()) &&
                checkGenre(movie)
            )}
          ></Movies>
        </div>
      )}
    </div>
  );
};

export default ListPage;
