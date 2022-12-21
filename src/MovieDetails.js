import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (movies) {
      let selMovie = movies.filter((word) => word.id === id);
      setMovie(selMovie[0]);
      setLoading(false);
      setError(false);
    } else {
      setError(true);
    }
    // console.log(movie);
  }, [movies, id]);

  return (
    <div>
      {!error && !loading && (
        <div id="container">
          <div className="back-row">
            <Link to="/">Back</Link>
          </div>
          <div className="product-details">
            <h1>{movie.title}</h1>
            {movie.year && <p className="information">{movie.year}</p>}
          </div>

          <div className="product-image">
            <img src={movie.image} alt={"Img for:" + movie.image} />
            <div className="info">
              <h2> Description</h2>
              <ul>
                <li>
                  <strong>Rating: </strong>
                  {movie.imDbRating}/10
                </li>
                <li>
                  <strong>Link to ImDb page: </strong>
                  <a
                    href={`https://www.imdb.com/title/${id}/?ref_=nv_sr_srsg_0`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here!
                  </a>
                </li>
              </ul>

              {movie.plot && (
                <ul>
                  <li>
                    <strong>Description: </strong>
                    {movie.description}
                  </li>
                  <li>
                    <strong>Plot: </strong>
                    {movie.plot}
                  </li>

                  <li>
                    <strong>Genres: </strong>
                    {movie.genres}
                  </li>

                  <li>
                    <strong>Runtime: </strong>
                    {movie.runtimeStr}
                  </li>
                  <li>
                    <strong>Stars: </strong>
                    {movie.stars}
                  </li>
                </ul>
              )}

              {/* Movies by filter */}
              {movie.rank && (
                <ul>
                  <li>
                    <strong>Rank: </strong>#{movie.rank}
                  </li>
                  <li>
                    <strong>ImDb Rating Count : </strong>
                    {movie.imDbRatingCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </li>
                  <li>
                    <strong>Full Title: </strong>
                    {movie.fullTitle}
                  </li>
                  <li>
                    <strong>Crew: </strong>
                    {movie.crew}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      {error && !loading && <div>There was a problem...</div>}
      {loading && <div>Loading data...</div>}
    </div>
  );
};

export default MovieDetails;
