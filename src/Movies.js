import { Link } from "react-router-dom";

const Movies = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies &&
        movies.map((movie) => (
          <Link className="article-link" to={`/${movie.id}`} key={movie.id}>
            <article>
              <div className="article-top">
                {movie.rank && <h4>Movie rank: #{movie.rank}</h4>}
                {movie.runtimeStr && <h4>Runtime: {movie.runtimeStr}</h4>}
                {movie.imDbRating && (
                  <h5>
                    Rating:{" "}
                    <span className="rating">{movie.imDbRating}/10</span>
                  </h5>
                )}
              </div>
              <h1 className="title">{movie.title}</h1>
              <img src={movie.image} alt={"Img for:" + movie.title} />

              <h3>
                {movie.year && <span>Release year: </span>}
                {movie.description && <span>Description: </span>}
                <span className="year">
                  {movie.year}
                  {movie.description}
                  {!movie.year && !movie.description && <span>TBA</span>}
                </span>
              </h3>

              {movie.genres && <h5>Genres: {movie.genres}</h5>}
            </article>
          </Link>
        ))}
    </div>
  );
};

export default Movies;
